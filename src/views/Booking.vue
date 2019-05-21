<template>
  <div class="booking">
    <v-toolbar-title class="text-uppercase blue--text">
      <h1>
        <span class="font-weight-light display-1">Booked</span>
        <span class="display-1"> Performers</span>
      </h1>
    </v-toolbar-title>
    <v-container class="my-5">
      <v-card flat class="pa-3" v-for="performer in performers" :key="performer.fullname">
        <v-layout row wrap>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Full Name</div>
            <div>{{ performer.fullname }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Talent</div>
            <div>{{ performer.talent }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Style</div>
            <div>{{ performer.style }}</div>
          </v-flex>
          <!--<v-flex xs6 sm4 md2>-->
            <!--<div class="caption grey&#45;&#45;text">Email</div>-->
            <!--<div>{{ performer.email }}</div>-->
          <!--</v-flex>-->
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Location</div>
            <div>{{ performer.location }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Date</div>
            <div>{{ performer.date }}</div>
          </v-flex>
          <router-link flat color="blue" tag="button" :to="'/profile/' + performer.uid">
            <v-btn flat color="blue">View More</v-btn>
          </router-link>
          <v-btn flat color="green" @click="review(performer.uid)">
            review
          </v-btn>
          <v-btn flat color="red" @click="cancel(performer.uid)">
            cancel
          </v-btn>
        </v-layout>
        <v-divider color="black"></v-divider>
        <v-divider color="black"></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import { db, auth } from '../firebase';
  let user = auth.currentUser;

  export default {
    name: "Booking",
    data() {
      return {
        performers: [],
        uid: '',
        imageUrl: ''
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
      });
      this.show()
    },
    methods: {
      show() {
        // let ref = db.collection('performers').doc(uid);
        let user = auth.currentUser;
        this.performers = [];
        db.collection('users').doc(user.uid)
          .collection('performersBooked').get()
          .then(doc => {
            const changes = doc.docChanges();
            changes.forEach(change => {
              if (change.type === 'added') {
                this.performers.push({
                  ...change.doc.data(),
                  id: change.doc.id
                })
              }
            })
          })
      },
      review(uid) {
        db.collection('performers').doc(uid)
          .collection('reviews').doc(user.uid).update({
            imageUrl: this.imageUrl
        })
          .then(function () {
            // eslint-disable-next-line no-console
            console.log("ImageUrl set!")
        })
      },
      cancel(uid) {
        let ref = db.collection('performers').doc(uid);
        let user = auth.currentUser;
        db.collection('users').doc(user.uid)
          .collection('performersBooked').doc(uid).delete();

        return ref.set({
          isBooked: false
        }, {merge: true})
          .then(function () {
            // eslint-disable-next-line no-console
            console.log("Booking is canceled!");
            window.location.reload()
          })
      }
    }
  }
</script>

<style scoped>

</style>
