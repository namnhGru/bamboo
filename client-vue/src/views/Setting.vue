<template>
  <div>
    <v-row dense wrap>
        <v-card
          color="#385F73"
          dark
          class="mr-2 mb-2"
          width="525"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
              >General</v-card-title>

              <v-card-subtitle>Easy change most used settings.</v-card-subtitle>
            </div>

            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-icon x-large>mdi-earth</v-icon>
            </v-avatar>
          </div>
        </v-card>

        <v-card
          color="primary"
          dark
          v-for="(feature, i) in settingFeatures"
          :key="i"
          class="mr-2 mb-2"
          width="525"
          @click="goToSpecialSetting(feature.link)"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="feature.name1"
              ></v-card-title>

              <v-card-subtitle v-text="feature.setting"></v-card-subtitle>
            </div>

            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-icon x-large>{{ feature.icon }}</v-icon>
            </v-avatar>
          </div>
        </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    features: {
      type: Array
    }
  },
  computed: {
    settingFeatures() {
      return this.features.map(({name1, icon, setting, link }) => ({
        name1,
        icon,
        setting,
        link: `/setting${link}`
      }))
    }
  },
  methods: {
    goToSpecialSetting(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style>

</style>