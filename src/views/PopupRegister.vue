<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400">
      <v-btn flat color="grey" slot="activator">Register</v-btn>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="person"
              label="Full name"
              v-model="fullname"
            ></v-text-field>
            <v-text-field
              prepend-icon="email"
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password"
              :type="'password'"
              name="input-10-1"
              label="Password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="register">Register
          </v-btn>
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
        password: '',
        description: '',
      }
    },
    methods: {
      register() {
        const user = {
          email: this.email,
          password: this.password,
          fullname: this.fullname,
          description: this.description,
        };

        this.$store.dispatch('signUpAction', user);
        this.$router.replace('/home');
      }
    }
  }
</script>


<style scoped>

</style>
