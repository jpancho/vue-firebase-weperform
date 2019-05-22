<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn flat color="grey" v-on="on">Register
          <v-icon right small>create</v-icon>
        </v-btn>
      </template>
      <v-card class="elevation-12">
        <v-toolbar dark color="blue-grey">
          <v-toolbar-title>Register</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form  v-model="valid" lazy-validation>
            <v-text-field
                    prepend-icon="person"
                    v-model="fullname"
                    name="fullname"
                    label="Full Name"
                    type="text"
                    :rules="nameRules" required>
            </v-text-field>
            <v-text-field
                    prepend-icon="email"
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                    :rules="emailRules" required>
            </v-text-field>
            <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                    :rules="passwordRules">
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading4"
            :disabled="!valid"
            color="success"
            @click="loader = 'loading4'"
            v-on:click="register"
          >
            Sign up
            <span class="custom-loader"></span>
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
        valid: false,
        dialog: false,
        loader: null,
        loading4: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
          v => !!v || 'Name is required'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v =>
                  v.length >= 6 ||
                  'Password must be greater than 6 characters'
        ]
      }
    },
    watch: {
      loader () {
        const l = this.loader;
        this[l] = !this[l];

        setTimeout(() => (this[l] = false), 1000);

        this.loader = null;

        setTimeout(() => this.dialog = false, 1000);
      }
    },
    methods: {
      register() {
        const user = {
          email: this.email,
          password: this.password,
          fullname: this.fullname,
        };

        this.$store.dispatch('signUpAction', user);
      }
    }
  }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
