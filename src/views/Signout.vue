<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn flat color="grey" v-on="on">Log out</v-btn>
      </template>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Log out</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          Are you sure you want to log out?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="logout"
          >Log out
          </v-btn>
          <v-btn
            color="primary"
            @click="dialog = false"
          >Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  const fb = require('../firebase');
  export default {
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      signout() {
        fb.auth.signOut().then(() => {
          this.$router.replace('/');
        })
      },
      logout() {
        this.signout();
        this.dialog = false;
      }
    }
  }
</script>

<style scoped>

</style>