<template>
  <v-form>
    <v-text-field
      label="Full name"
      v-model="fullname"
    ></v-text-field>
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
    <v-btn class="sucess" @click="submit">Sign-up</v-btn>
  </v-form>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        fullname: '',
        email: '',
        password:''
      }
    },
    methods: {
      submit() {
        console.log(this.fullname, this.email, this.password)
      }
    }
  }
</script>

<style scoped>

</style>