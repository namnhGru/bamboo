<template>
  <div>
    <v-row dense wrap>
      <v-col>
        <v-card
          color="#385F73"
          dark
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
              <v-img src=""></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col
        v-for="(feature, i) in features"
        :key="i"
      >
        <v-card
          color="primary"
          dark
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
      </v-col>
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
      return this.features.map(({name1, icon, setting }) => ({
        name1,
        icon,
        setting
      }))
    }
  },
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  }),
}
</script>

<style>

</style>