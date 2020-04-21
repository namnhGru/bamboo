<template>
  <div>
    <v-sheet class="pa-5">
      <v-switch v-for="(drawer, i) in currentDrawers" :disabled="drawer.unchangable" v-model="drawer.drawer" inset :label="drawer.name1" :key="i" @change="changeSingleDrawer(i)"></v-switch>
    </v-sheet> 
  </div> 
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentDrawers'
    ])
  },
  methods: {
    ...mapActions([
      'changeSingleDrawer'
    ]),
  }
}
</script>

<style>

</style>