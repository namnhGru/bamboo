<template>
  <v-row>
    <app-drawer :features="features"></app-drawer>
    <v-content>
      <v-col class="ma-0 pl-5 pr-10">
        <app-toolbar></app-toolbar>
        <app-bread-crumb :features="breadcrumbFeature"></app-bread-crumb>
          <v-container class="ma-3 px-0">
            <slot :features="features"></slot>
          </v-container>
        <app-footer></app-footer>
      </v-col>
    </v-content>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios"
export default {
  components: {
    AppDrawer: () => import('../components/AppDrawer.vue'),
    AppToolbar: () => import('../components/AppToolbar.vue'),
    AppFooter: () => import('../components/AppFooter.vue'),
    AppBreadCrumb: () => import('../components/AppBreadCrumb.vue')
  },
  data: () => ({
    features: [], 
  }),
  computed: {
    ...mapGetters([
      'currentUser',
      'currentToken'
    ]),
    breadcrumbFeature() {
      return this.features.filter( ({link}) => this.$route.path == link )
    }
  },
  watch: {
    currentUser(newState) {
      if (Object.keys(newState).length) {
        this.getFeatures()
      }
    }
  },
  methods: {
    async getFeatures() {
      if (this.currentToken) {
        axios.defaults.headers.common.authorization = `Bearer ${this.currentToken}`
        const {data} = await axios.get(`${process.env.VUE_APP_EXPRESS_API}/menu`)  
        this.features = data.data
      }
    }
  },
  created() {
    this.getFeatures()
  }
}
</script>

<style>

</style>