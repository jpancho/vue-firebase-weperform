<template>
  <v-layout row justify-center>
    <v-dialog max-width="400">
      <v-btn flat color="grey" slot="activator">Login</v-btn>
      <v-card>
        <v-text-field
          label="Email"
          v-model="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :type="'password'"
          name="input-10-1"
          label="Password"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  const fb = require('../firebase');

  export default {
    name: "Login",
    data() {
      return {
        dialog: false,
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        // eslint-disable-next-line no-unused-vars
        fb.auth.signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.replace('/admin')
        }).catch((err) => {
          alert(err.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>