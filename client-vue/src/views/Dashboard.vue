<template>
  <div>
    <v-btn color="primary" @click="signout">Sign Out</v-btn>
  </div>
</template>

<script>
import { AxiosInstance } from '../services/api.js'
export default {
  data: () => ({
    users: ""
  }),
  methods: {
    async signout() {
      window.localStorage.setItem('logout', Date.now())
      await this.$store.dispatch('signout')
    },

    async syncSignOut(event) {
      if (event.key == 'logout') {
        await this.$store.dispatch('signout')
        this.$store.dispatch('removeInterceptor')
      }
    },

    // async signOutFlow() {
    //   this.$store.commit('changeAuthInfo', {})
    //   await axios.post(`${process.env.VUE_APP_EXPRESS_API}/delete_refresh`)
    //   if (this.$route.path !== '/signin') this.$router.push('/signin').catch(console.error)
    // },

    async fetchUsers() {
      try {
        const { data } = await AxiosInstance.get(`/user`)
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
