<template>
  <div>
    <v-breadcrumbs class="px-4" large :items="settingFeatures"></v-breadcrumbs>
  </div>  
</template>

<script>
export default {
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  computed: {
    settingFeatures() {
      return this.features.map(({name1, link}) => ({
        text: name1, 
        href: `/#${link}`,
        disabled: false
      }))
    }
  },
}
</script>

<style>

</style>