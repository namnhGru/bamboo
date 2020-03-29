<template>
  <v-container>
    <v-row>
      <app-drawer></app-drawer>
      <v-col>
        <app-toolbar></app-toolbar>
        <v-content>
          <slot></slot>
        </v-content>
        <app-footer></app-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    AppDrawer: () => import('../components/AppDrawer.vue'),
    AppToolbar: () => import('../components/AppToolbar.vue'),
    AppFooter: () => import('../components/AppFooter.vue')
  }
}
</script>

<style>

</style>