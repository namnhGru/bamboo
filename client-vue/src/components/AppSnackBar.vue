<template>
  <div class="text-center">
    <v-snackbar
      :value="currentShowState"
      @input="close"
      :timeout="currentSetting.timeout"
      :color="currentColor"
    >
      {{ currentText }}
      <v-btn
        color="white"
        text
        @click="close"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentShowState',
      'currentText',
      'currentSetting',
      'currentColor'
    ])
  },
  methods: {
    close() {
      this.$store.commit('changeShowState', false)
    }
  }
}
</script>

<style>

</style>