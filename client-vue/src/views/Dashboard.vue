<template>
  <v-container>
    <v-btn color="primary" @click="signout">Sign Out</v-btn>
    <!-- <div v-for="(user, i) in users" :key="i">
      <p>{{user.email}}</p>
    </div> -->
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    users: ""
  }),
  methods: {
    signout() {
      window.localStorage.setItem('logout', Date.now())
      this.signOutFlow()
    },

    syncSignOut(event) {
      if (event.key == 'logout') {
        this.signOutFlow()
      }
    },

    async signOutFlow() {
      this.$store.commit('changeInMemoryToken', '')
      this.$store.commit('changeInMemoryTokenExpiry', '')
      await axios.post(`${process.env.VUE_APP_EXPRESS_API}/delete_refresh`)
      if (this.$route.path !== '/signin') this.$router.push('/signin').catch(console.error)
    },

    async fetchUsers() {
      try {
        const { data } = await axios.get(`${process.env.VUE_APP_EXPRESS_API}/user`)
        this.users = data.data
      } catch (e) {
        console.error(e)
      }
    },
  },
  mounted() {
    this.fetchUsers()
    window.addEventListener('storage', this.syncSignOut)
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.syncSignOut)
  }
}
</script>
