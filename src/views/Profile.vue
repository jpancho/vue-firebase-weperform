<template>
  <div class="profile">
    <h1 class="subheading grey--text">Profile Page</h1>
    <v-container class="my-5">
      <v-card flat class="pa-3" v-for="info in profile" :key="info.uid">
        <v-layout row wrap>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Email</div>
            <div>{{ info.email }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">User ID</div>
            <div>{{ info.uid }}</div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-btn flat @click="bePerformer">
        Become a Performer
      </v-btn>
    </v-container>
  </div>
</template>

<script>
  const fb = require('../firebase');
  import { db } from '../firebase';

  export default {
    data() {
      return {
        profile: []
      }
    },
    created() {
      let user = fb.auth.currentUser;
      db.collection('users')
        .where('uid', '==', user.uid)
        .get()
        .then(doc => {
          const changes = doc.docChanges();
          changes.forEach(change => {
            if(change.type === 'added') {
              this.profile.push({
                ...change.doc.data(),
                id: change.doc.id
              })
            }
          })
        })
    },
    methods:{
      bePerformer() {
        let user = fb.auth.currentUser;
        db.collection('performers').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          isBooked: false
        })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log("Performer created!")
          })
      }
    }
  }
</script>

<style scoped>

</style>
