<template>
  <div>
    <app-table></app-table>
  </div>
</template>

<script>
export default {
  components: {
    AppTable: () => import('../components/AppTable.vue')
  }
}
</script>

<style>

</style>