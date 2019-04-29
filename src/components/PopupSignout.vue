<template>
  <v-layout row justify-center>
      <v-btn flat color="grey" slot="activator" @click="home">
        Sign Out
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
  </v-layout>
</template>

<script>
  export default {
    methods: {
      home() {
        this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>

</style>