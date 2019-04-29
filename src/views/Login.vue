<template>
    <v-form>
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
        <v-btn class="sucess" @click="login">Login</v-btn>
    </v-form>
</template>

<script>
    const fb = require('../firebase');
    export default {
        name: "Login",
        data() {
            return {
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