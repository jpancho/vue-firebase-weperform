<template>
  <div class="Booking">
    <v-toolbar-title class="text-uppercase blue--text" style="text-align: center">
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
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Email</div>
            <div>{{ performer.email }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Location</div>
            <div>{{ performer.location }}</div>
          </v-flex>
          <v-btn flat color="red" @click="cancel(performer.uid)">
            cancel
          </v-btn>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import { db, auth } from '../firebase';

  export default {
    name: "Booking",
    data() {
      return {
        performers: [],
        uid: '',
      }
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
    },
    created: function () {
      this.show()
    }
  }
</script>

<style scoped>

</style>