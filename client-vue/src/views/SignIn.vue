<template>
  <v-container>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Welcome</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form @submit="signin">
                <v-text-field
                  v-model="email"
                  label="Login"
                  name="login"
                  prepend-icon="person"
                  type="text"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions> 
              <v-spacer />
              <v-btn color="primary" @click="signin">Sign in</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async signin() {
      const {data: {token, tokenExpiry}} = await axios.post('http://localhost:2000/signin', {
        email: this.email,
        password: this.password
      }, { withCredentials: true})
      this.$store.commit('changeInMemoryToken', token)
      this.$store.commit('changeInMemoryTokenExpiry', tokenExpiry)
      this.$store.commit('changeUser', {
        email: this.email,
        password: this.password
      })
      axios.defaults.headers.common.authorization = `Bearer ${this.$store.getters.currentToken}`
      this.$router.push('/dashboard')
    },
    // async syncSignin(event) {
    //   if (event.key == 'login') {
    //     await axios.post('http://localhost:2000/delete_refresh')
    //   }
    // }
  },
  // created() {
  //   window.addEventListener('storage', this.syncSignin)
  // }
}
</script>