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
        <v-layout row wrap >
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Full Name</div>
            <div>{{ performer.fullname }}</div>
              <v-avatar size ="100" class ="grey lighten-2">
                <!--<img :src="pullImage(performer.uid)" alt="">-->
              </v-avatar>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Talent</div>
            <div>{{ performer.talent }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Style</div>
            <div v-for="style in performer.style" :key="style">{{ style}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Location</div>
            <div>{{ performer.location }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Date</div>
            <div>{{ performer.date }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <PopupProfile :uid = performer.uid :notBooked = false></PopupProfile>
            <v-btn flat color="red" @click="cancel(performer.uid)">
              Cancel
            </v-btn>
            <PopupReview :uid = performer.uid></PopupReview>
          </v-flex>
        </v-layout>
        <v-divider color="black"></v-divider>
        <v-divider color="black"></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import { db, auth } from '../firebase';
  import PopupReview from '../views/PopupReview';
  import PopupProfile from '../views/PopupProfile';
  let user = auth.currentUser;

  export default {
    components: {PopupReview, PopupProfile},
    name: "Booking",
    data() {
      return {
        performers: [],
        uid: '',
        imageUrl: '',
      }
    },
    created() {
      // db.collection('users').doc(user.uid).get().then(doc => {
      //   this.imageUrl = doc.data().imageUrl;
      // });
      this.show()
    },
    methods: {
      show() {
        // let ref = db.collection('performers').doc(uid);
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
        this.countBookings();
        return ref.set({
          isBooked: false
        }, {merge: true})
                .then(function () {
                  // eslint-disable-next-line no-console
                  console.log("Booking is canceled!");
                  window.location.reload()
                  // window.location.replace('/bookings');
                })
      },
      countBookings() {
        db.collection('users').doc(user.uid)
                .collection('performersBooked')
                .get().then(snapshot => {
          this.$store.dispatch('countAction', snapshot.size);
        });
      },
      pullImage(uid){
        db.collection('users').doc(uid).get().then(doc=> {
         this.imageUrl = doc.data().imageUrl;
        });
        return this.imageUrl
      }

    }
  }
</script>

<style scoped>

</style>