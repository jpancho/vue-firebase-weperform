<template>
  <v-layout row justify-center>
    <v-dialog max-width="400">
      <v-btn flat color="grey" slot="activator">Register</v-btn>
      <v-card>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="register">Sign-up</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

  export default {
    name: "Register",
    data() {
      return {
        fullname: '',
        email: '',
        password: ''
      }
    },
    methods: {
      register() {
        const user = {
          email: this.email,
          password: this.password,
          fullname: this.fullname
        };
        this.$store.dispatch('signUpAction', user);
        this.$router.replace('/home');
      }
    }
  }
</script>


<style scoped>

</style>
