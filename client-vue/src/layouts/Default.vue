<template>
  <v-row>
    <app-drawer :features="drawerFeatures"></app-drawer>
    <v-content>
      <v-col class="ma-0 pl-5 pr-10">
        <app-toolbar></app-toolbar>
        <app-bread-crumb></app-bread-crumb>
          <v-container class="ma-3 px-0">
            <router-view></router-view>
          </v-container>
        <app-snack-bar></app-snack-bar>
        <app-footer></app-footer>
      </v-col>
    </v-content>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    AppSnackBar: () => import('../components/AppSnackBar.vue'),
    AppDrawer: () => import('../components/AppDrawer.vue'),
    AppToolbar: () => import('../components/AppToolbar.vue'),
    AppFooter: () => import('../components/AppFooter.vue'),
    AppBreadCrumb: () => import('../components/AppBreadCrumb.vue')
  },
  data: () => ({
    drawers: [],
  }),
  computed: {
    ...mapGetters([
      'authInfo',
      'currentDrawers'
    ]),
    drawerFeatures() {
      return this.currentDrawers.filter(({ drawer }) => drawer == true)
    }
  },
  created() {
    this.$store.dispatch('getNewDrawerList')
  }
}
</script>

<style>

</style>