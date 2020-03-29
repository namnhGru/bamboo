<template>
  <v-app>
    <component :is='layout'>
      <template v-slot:default="slotProp">
        <router-view :features="slotProp.features"></router-view>
      </template>
    </component>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`
    }
  }
};
</script>