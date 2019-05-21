<template>
  <v-container grid-list-xl>
    <v-layout row justify-center>
      <v-dialog max-width="300">
        <v-btn flat color="green" slot="activator">Post a Review</v-btn>
        <v-card>
          <v-toolbar dark color="blue-grey">
            <v-toolbar-title>Leave a review!</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-rating v-model="rating" background-color="orange lighten-3" color="orange" small></v-rating>
              <v-text-field
                label="Review"
                v-model="subtext"
              ></v-text-field>
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
      </v-dialog>
    </v-layout>
  </v-container>
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
        rating: 3,
        loader: null,
        loading4: false,
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
        this.fullname = doc.data().fullname;
      });
    },
    watch: {
      loader () {
        const l = this.loader;
        this[l] = !this[l];

        setTimeout(() => (this[l] = false), 2000);

        this.loader = null
      }
    },
    methods: {
      postReview() {
        this.fulltext = '<span class=\'text--secondary\'>' + this.fullname + '</span> &mdash; ' + this.subtext;
        db.collection('performers').doc(this.uid)
          .collection('reviews').doc(user.uid).set({
          imageUrl: this.imageUrl,
          text: this.fulltext,
          uid: user.uid,
          rating: this.rating
        })
          .then(function() {
            // eslint-disable-next-line no-console
              console.log("Review posted!");
          })
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
