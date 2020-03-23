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
      this.$router.push('/signin')
    },
    fetchUsers() {
      axios.get("http://localhost:2000/user")
      .then(({data}) => {
        this.users = data.data
      })
      .catch(console.error)
    }
  },
  created() {
    this.fetchUsers();
  }
}
</script>
