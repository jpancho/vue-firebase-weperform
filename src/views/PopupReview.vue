<template>
  <v-dialog v-model = "dialog" max-width="1000">
    <v-btn flat color="green" slot="activator">Post a Review</v-btn>
    <v-container grid-list-xl>
      <v-layout column justify-center>
        <v-card>
          <v-toolbar dark color="blue-grey">
            <v-toolbar-title>Leave a review!</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-rating v-model="rating" background-color="orange lighten-3" color="orange" small></v-rating>
              <v-textarea outline auto-grow
                          label="Comment"
                          v-model="subtext"
              ></v-textarea>
              <v-layout row justify-center>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                          :loading="loading4"
                          :disabled="loading4"
                          color="info"
                          @click="loader = 'loading4'"
                          class="success"
                          v-on:click="postReview"
                  >
                    Post
                    <span class="custom-loader"></span>
                  </v-btn>
                </v-card-actions>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
  import { db, auth } from '../firebase';
  let user = auth.currentUser;
  export default {
    name: 'PopupReview',
    props: { uid: String },
    data() {
      return {
        fullname: '',
        subtext: '',
        fulltext: '',
        imageUrl: '',
        rating: 1,
        totalrating: null,
        numberofreviews: 1,
        loader: null,
        loading4: false,
        dialog: false
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
        this.fullname = doc.data().fullname;
      });
      db.collection('performers').doc(this.uid).get().then(doc => {
        this.totalrating = doc.data().totalrating;
        this.numberofreviews=doc.data().numberofreviews;
        this.ratings=doc.data().ratings;
      });
    },
    watch: {
      loader () {
        const l = this.loader;
        this[l] = !this[l];
        setTimeout(() => (this[l] = false), 2000);
        this.loader = null;
        setTimeout(() => this.dialog = false, 2000);
      }
    },
    methods: {
      postReview() {
        this.fulltext = '<span class=\'text--secondary\'>' + this.fullname + '</span> &mdash; ' + this.subtext;
        db.collection('performers').doc(this.uid)
                .collection('reviews').add({
          imageUrl: this.imageUrl,
          text: this.fulltext,
          uid: user.uid,
          rating: this.rating
        })
                .then(function() {
                  // eslint-disable-next-line no-console
                  console.log("Review posted!");
                });
          this.numberofreviews += 1;
          this.totalrating += this.rating;
          this.ratings = this.totalrating/this.numberofreviews;
          this.ratings = (Math.round(this.ratings * 2) / 2).toFixed(1);
        db.collection('performers').doc(this.uid).update({
          totalrating: this.totalrating,
          ratings: this.ratings,
          numberofreviews: this.numberofreviews
        })
                .then(function() {
                  // eslint-disable-next-line no-console
                  console.log("Aggregrate ratings updated!");
                })
      },
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