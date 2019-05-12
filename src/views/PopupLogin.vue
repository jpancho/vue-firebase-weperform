<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn flat color="grey" v-on="on">Login</v-btn>
      </template>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              v-model="email"
              name="email"
              label="Email"
              type="text">
            </v-text-field>
            <v-text-field
              v-model="password"
              id="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password">
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="submitLogin"
          >Login
          </v-btn>
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
        email: '',
        password: '',
        dialog: false,
        isLoggedIn: false
      }
    },
    methods: {
      login() {
        // eslint-disable-next-line no-unused-vars
        fb.auth.signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
          this.$router.replace('/performers')
        }).catch((err) => {
          alert(err.message)
        })
      },
      submitLogin() {
        this.login();
        this.dialog = false;
      }
    }
  }
</script>

<style scoped>

</style>