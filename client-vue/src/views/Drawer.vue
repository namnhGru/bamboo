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
      <chart-bar :dataGraph="dataGraph" :selectedCity="selectedCity"></chart-bar>
    </v-row>
  </div> 
</template>

<script>
import { dataGraph } from './data'
export default {
  data() {
    return {
      dataGraph: dataGraph,
      selectedCity: 'New York'
    }
  },
  components: {
    ChartBar: () => import('../components/ChartBar.vue')
  },
  computed: {
    selectCities() {
      return Object.keys(this.dataGraph[0]).filter(d => d != 'date')
    },
  }
}
</script>

<style>

</style>