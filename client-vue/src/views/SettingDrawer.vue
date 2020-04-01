<template>
  <div>
    <app-setting :drawers="currentDrawers"></app-setting>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    AppSetting: () => import('../components/AppSetting.vue')
  },
  computed: {
    ...mapGetters([
      'currentDrawers'
    ]),
  }
}
</script>

<style>

</style>