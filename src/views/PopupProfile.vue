<template>
  <v-dialog max-width="1200">
    <v-btn flat color="blue" slot="activator">View More</v-btn>
      <v-layout column>
        <v-flex xs12 sm6 md4 lg12>
          <v-card class="text-xs-center ma-3 white--text font-weight-bold black">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="imageUrl" alt="">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <h1 class="title">{{ fullname }}</h1>
              <h4 class="black--text">{{ email }}</h4>
              <p></p>
              <v-btn raised class="green" v-show="notBooked" :disabled="sameUser" @click="book(uid, email, fullname, talent, style, location)">
                Book
              </v-btn>
            </v-card-text>
            <v-divider color="white"></v-divider>
            <v-divider color="white"></v-divider>
            <v-tabs v-model="active" color="black" centered dark slider-color="yellow">
              <v-tab :key="Description" ripple>
                Description
              </v-tab>
              <v-tab :key="Reviews" ripple>
                Reviews
              </v-tab>
              <v-tab-item
                :key="Description"
              >
                <v-card flat color="black" class="text-xs-center ma-3 white--text font-weight-bold black">
                  <div id="des">
                    <textarea id="description" v-model="description" spellcheck="false" readonly></textarea>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="Reviews">
                <v-card flat color="black" class="text-xs-center ma-3 white--text font-weight-bold black" v-for="review in reviewers" :key="review.fullname">
                  <v-list dark two-line>
                    <template>
                      <v-list-tile
                        :key="review.rating"
                        avatar
                      >
                        <v-list-tile-avatar>
                          <img :src="review.imageUrl">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <v-rating v-model="review.rating" background-color="orange lighten-3" color="orange" small readonly>
                            </v-rating>
                          </v-list-tile-title>
                          <v-list-tile-sub-title v-html="review.text"></v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-list>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
  </v-dialog>
</template>

<script>
  import { db, auth } from '../firebase';
  let user = auth.currentUser;

  export default {
    name: 'PopupProfile',
    props: { uid: String, notBooked: Boolean },
    data() {
      return {
        fullname: '',
        email: '',
        imageUrl: '',
        image: null,
        description: '',
        talent: '',
        style: '',
        location: '',
        date: new Date().toISOString().substr(0, 10),
        sameUser: null,
        active: null,
        reviewers: [],
        Description: null,
        Reviews: null
      }
    },
    created() {
      db.collection('users').doc(this.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
        this.fullname = doc.data().fullname;
        this.email = doc.data().email;
        this.uid = doc.data().uid;
        this.description = doc.data().description;
        if(doc.data().uid === user.uid) {
          this.sameUser = true;
        }
        else {
          this.sameUser = false;
        }
      });
      db.collection('performers').doc(this.uid).get().then(doc => {
        this.talent = doc.data().talent;
        this.style = doc.data().style;
        this.location = doc.data().location;
      });
      db.collection('performers').doc(this.uid)
        .collection('reviews').get().then(doc => {
        const changes = doc.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            this.reviewers.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      });
    },
    methods: {
      book(uid,email,fullname,talent,style,location) {
        let ref = db.collection('performers').doc(uid);

        db.collection('users').doc(user.uid)
          .collection('performersBooked').doc(uid).set({
          uid: uid,
          email: email,
          fullname: fullname,
          talent: talent,
          style: style,
          location: location,
          date: this.date
        })
          .then(function () {
            // eslint-disable-next-line no-console
            console.log("Performer booked!")
          });

        return ref.set({
          isBooked: true
        }, {merge: true})
          .then(function () {
            // eslint-disable-next-line no-console
            console.log("isBook set to true!");
            alert('Successfully booked');
          });
      },
      // pullImageUrl(uid) {
      //  db.collection('users').doc(uid).get().then(doc => {
      //    this.reviewers.avatar.push(
      //      doc.data().imageUrl
      //    )
      //  })
      // }
    }
  }

</script>

<style scoped>

  #description{
    width: 500px;
    height: 167px;
    text-align: left;
    outline: none;
  }
  #save{
    visibility: hidden
  }
  #cancel{
    visibility: hidden
  }
  /*#description*/
  /*{*/
  /*readonly: true;*/
  /*}*/

  #edit{

  }
</style>
