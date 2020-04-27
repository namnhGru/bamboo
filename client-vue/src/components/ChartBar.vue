<template>
  <div>
    <svg :width="svgWidth" :height="svgHeight" ref="graph">
      <g class="xAxis"></g>
      <g class="yAxis"></g>
    </svg>
  </div> 
</template>

<script>
import * as d3 from 'd3'
export default {
  props: {
    dataGraph: {
      type: Array,
      required: true
    },
    selectedCity: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      svgWidth: 1100,
      svgHeight: 500,
      dataMargin: {
        left: 40,
        bottom: 20,
      },
    }
  },
  computed: {
    dataWidth() {
      return this.svgWidth / this.dataGraph.length
    },
    yRangeMax() {
      return this.svgHeight - this.dataMargin.bottom
    },
    svg() {
      return d3.select(this.$refs.graph)
    },
    yScale() {
      return d3.scaleLinear()
        .domain([0, this.cityMax])
        .range([this.yRangeMax, 0])
    },
    xScale() {
      return d3.scaleTime()
        .domain(d3.extent(this.dataGraph, d => new Date(`${d.date.slice(0,4)}-${d.date.slice(4,6)}-${d.date.slice(6,8)}`)))
        .range([0, this.svgWidth])
    },
    colorScale() {
      return d3.scaleSequential(d3.interpolateSpectral)
        .domain(d3.extent(this.dataGraph, d => d["New York"]).reverse())
    },
    cityMax() {
      return d3.max(this.dataGraph, d => d[this.selectedCity])
    },
    xAxis() {
      return d3.axisBottom().scale(this.xScale)
        .tickFormat(d => d3.timeFormat('%b %Y')(d))
    },
    yAxis() {
      return d3.axisLeft().scale(this.yScale)
        .tickFormat(d => `${d} °F`)
    },
    bars() {
      return this.svg.selectAll('rect')
      .data(this.dataGraph, d => d)
    } 
  },
  methods: {
    drawChartAxis() {
      this.svg.selectAll('g.yAxis')
      .attr('transform', `translate(${this.dataMargin.left}, 0)`)
      .call(this.yAxis)
      this.svg.selectAll('g.xAxis')
      .attr('transform', `translate(40, ${this.yRangeMax})`)
      .call(this.xAxis)
    },
    drawChartData() {
      this.svg.selectAll('rect')
      .data(this.dataGraph, d => d).enter().append('rect')
      .attr('width', this.dataWidth)
      .attr('x', (d, i) => i * this.dataWidth + this.dataMargin.left)
    },
    updateChartData() {
      this.svg.selectAll('rect')
      .data(this.dataGraph)
      .transition()
      .attr('y', d => this.yScale(d[this.selectedCity]))
      .attr('fill', d => this.colorScale(d[this.selectedCity]))
      .attr('height', d => this.yRangeMax - this.yScale(d[this.selectedCity]))
    }
  },      
  watch: {
    selectedCity() {
      this.drawChartAxis()
      this.updateChartData()
    }
  },
  mounted() {
    this.drawChartAxis()
    this.drawChartData()
    this.updateChartData()
  }
  
}
</script>

<style>

</style>