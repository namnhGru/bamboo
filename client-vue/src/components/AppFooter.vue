<template>
  <v-footer
    color="white"
    app
    inset
  >
    <v-row
      class="d-flex flex-row-reverse"
      no-gutters
    >
      <v-btn
        class="py-0 text-center primary--text"
        cols="12"
        text
        rounded
      >
        {{ new Date().getFullYear() }} — <strong>Bamboo</strong>
      </v-btn>
      <v-btn
        v-for="link in links"
        :key="link"
        text
        rounded
        class="my-0 primary--text"
      >
        {{ link }}
      </v-btn>
    </v-row>
  </v-footer> 
</template>

<script>
export default {
  data: () => ({
    links: [
      'Services',
      'Contact Us',
    ],
  }),
}
</script>

<style>

</style>