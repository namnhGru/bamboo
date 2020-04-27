<template>
  <v-row justify="center">
    <slot name="activate-dialog"></slot>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
    <slot name="content-dialog"></slot>
    </v-dialog>
  </v-row> 
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style>

</style>