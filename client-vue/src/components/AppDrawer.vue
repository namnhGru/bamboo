<template>
    <v-navigation-drawer
      v-model="drawer"
      dark
      color="primary"
      app
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="feature in features"
          :key="feature.name1"
          link
          @click="goToMenu(feature.link)"
        >
          <v-list-item-icon>
            <v-icon>{{feature.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ feature.name1}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
</template>

<script>
export default {
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      drawer: true,
    }
  },
  methods: {
    goToMenu(url) {
      if (this.$route.path != url) this.$router.push(url)
    }
  }
}
</script>

<style>

</style>