<template>
  <v-app>
    <component :is='layout'>
    </component>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`
    },
  }
};
</script>