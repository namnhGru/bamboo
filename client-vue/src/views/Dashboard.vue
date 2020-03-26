<template>
  <v-container>
    <v-btn color="primary" @click="signout">Sign Out</v-btn>
    <div v-for="(user, i) in users" :key="i">
      <p>{{user.email}}</p>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data: () => ({
    users: ""
  }),
  methods: {
    signout() {
      this.$store.commit('changeInMemoryToken', '')
      this.$store.commit('changeInMemoryTokenExpiry', '')
      this.$router.push('/signin')
      window.localStorage.setItem('logout', Date.now())
    },
    fetchUsers() {
      axios.get("http://localhost:2000/user")
      .then(({data}) => {
        this.users = data.data
      })
      .catch(console.error)
    },
    syncSignOut(event) {
      if (event.key == 'logout') {
        this.$store.commit('changeInMemoryToken', '')
        this.$store.commit('changeInMemoryTokenExpiry', '')
        console.log('before delete')
        axios.post("http://localhost:2000/delete_refresh")
        console.log('after delete')
        if (this.$route.path !== '/signin') this.$router.push('/signin').catch(console.error)
      }
    },
  },
  created() {
    window.addEventListener('storage', this.syncSignOut)
    this.fetchUsers();
  }
}
</script>
