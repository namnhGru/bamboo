<template>
  <div>
    <v-breadcrumbs class="px-4" large :items="settingFeatures">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
  </div>  
</template>

<script>
export default {
  computed: {
    settingFeatures() {
      return this.$route.path.split('/').splice(1).reduce((acc, path, idx, src) => {
        acc.push({
          text: `${path.charAt(0).toUpperCase()}${path.slice(1)}`,
          href:  `/#/${idx == 0 ? path : `${acc[idx-1].href.slice(3)}/${path}`}`,
          disabled: idx == src.length - 1 ? true : false
        })
        return acc
      }, [])
    }
  },
}
</script>

<style>

</style>