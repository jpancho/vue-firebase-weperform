<template>
    <v-layout row justify-center>
      <v-dialog max-width="400">
        <v-btn flat slot="activator">Register</v-btn>
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
            <v-btn class="success" @click="signup">Sign-up</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>

<script>
  const fb = require('../firebase');

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
      signup() {
        // eslint-disable-next-line no-unused-vars
        fb.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.replace('/home');
        }).catch((err) => {
          alert(err.message)
        });
      }
    }
  }
</script>

<style scoped>

</style>
<!--<template>-->
<!--  <v-form>-->
<!--    <v-text-field-->
<!--      label="Full name"-->
<!--      v-model="fullname"-->
<!--    ></v-text-field>-->
<!--    <v-text-field-->
<!--      label="Email"-->
<!--      v-model="email"-->
<!--    ></v-text-field>-->
<!--    <v-text-field-->
<!--      v-model="password"-->
<!--      :type="'password'"-->
<!--      name="input-10-1"-->
<!--      label="Password"-->
<!--    ></v-text-field>-->
<!--    <v-btn class="success" @click="signup">Sign-up</v-btn>-->
<!--  </v-form>-->
<!--</template>-->

<!--<script>-->
<!--  const fb = require('../firebase');-->

<!--  export default {-->
<!--    name: "Register",-->
<!--    data() {-->
<!--      return {-->
<!--        fullname: '',-->
<!--        email: '',-->
<!--        password: ''-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      signup() {-->
<!--        // eslint-disable-next-line no-unused-vars-->
<!--        fb.auth.createUserWithEmailAndPassword(this.email, this.password).then((user) => {-->
<!--          this.$router.replace('/home')-->
<!--        }).catch((err) => {-->
<!--          alert(err.message)-->
<!--        });-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
