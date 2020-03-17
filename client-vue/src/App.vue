<template>
  <v-app>
      <SignIn/>
  </v-app>
</template>

<script>
import SignIn from './views/SignIn';

export default {
  name: 'App',

  components: {
    SignIn,
  },

  data: () => ({
    //
  }),
};
</script>
