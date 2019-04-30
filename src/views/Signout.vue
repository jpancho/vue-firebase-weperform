<template>
  <v-layout row justify-center>
      <v-btn flat color="grey" @click="signout">
        Sign Out
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
  </v-layout>
</template>

<script>
  const fb = require('../firebase');
  export default {
    methods: {
      signout() {
        fb.auth.signOut().then(() => {
          this.$router.replace('/');
        })
      }
    }
  }
</script>

<style scoped>

</style>