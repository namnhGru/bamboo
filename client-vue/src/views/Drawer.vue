<template>
  <div>
    <v-row>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="selectCities"
          label="Select City"
          v-model="selectedCity"
        >
        </v-select>
      </v-col>
      <svg :width="svgWidth" :height="svgHeight" ref="graph">
        <g class="xAxis"></g>
        <g class="yAxis"></g>
      </svg>
    </v-row>
  </div> 
</template>

<script>
import * as d3 from 'd3'
import { dataGraph } from './data'
export default {
  data() {
    return {
      svgWidth: 1100,
      svgHeight: 500,
      dataGraph: dataGraph,
      dataMargin: {
        left: 40,
        bottom: 20,
      },
      selectedCity: 'New York'
    }
  },
  computed: {
    selectCities() {
      return Object.keys(this.dataGraph[0]).filter(d => d != 'date')
    },
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
    }
  },
  methods: {
    addRect() {
      var yAxis = this.svg.selectAll('g.yAxis')
      var xAxis = this.svg.selectAll('g.xAxis')

      // exit
      yAxis.exit().remove()
      xAxis.exit().remove()
     
      // enter
      var yEnter = yAxis.enter()
      var xEnter = xAxis.enter()

      yAxis = yEnter.merge(yAxis)
      .attr('transform', `translate(${this.dataMargin.left}, 0)`)
      .call(this.yAxis)

      xAxis = xEnter.merge(xAxis)
      .attr('transform', `translate(40, ${this.yRangeMax})`)
      .call(this.xAxis)

      var bars = this.svg.selectAll('rect')
      .data(this.dataGraph, d => d)

      bars.exit().remove()

      var barsEnter = bars.enter().append('rect')
      .attr('width', this.dataWidth)

      bars = barsEnter.merge(bars)
      .attr('x', (d, i) => i * this.dataWidth + this.dataMargin.left)
      .transition()
      .attr('y', d => this.yScale(d[this.selectedCity]))
      .attr('fill', d => this.colorScale(d[this.selectedCity]))
      .attr('height', d => this.yRangeMax - this.yScale(d[this.selectedCity]))
    }
  },      
  updated() {
    // const newYorkMax = d3.max(this.dataGraph, d => d['New York'])
    // const yScale = d3.scaleLinear()
    //   .domain([0, newYorkMax])
    //   .range([this.yRangeMax, 0])
    // const colorScale = d3.scaleSequential(d3.interpolateSpectral)
    //   .domain(d3.extent(this.dataGraph, d => d["New York"]).reverse())
    // d3.select(this.$refs.graph).selectAll('rect').data(this.dataGraph)
    //   .attr('x', (d, i) => i * this.dataWidth + this.dataMargin.left)
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .attr('y', d => yScale(d[this.selectedCity]))
    //   .attr('fill', d => colorScale(d[this.selectedCity]))
    //   .attr('height', d => this.yRangeMax - yScale(d[this.selectedCity]))
    this.addRect()
  },
  mounted() {
    this.addRect();
  }
}
</script>

<style>

</style>