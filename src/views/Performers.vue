<template>
  <div class="performer">
    <h1 class="subheading grey--text">Performers List</h1>
<!--        <v-card row-->
<!--                justify-space-between>-->
<!--          <v-layout>-->
<!--            <v-flex-->
<!--              v-for="card in cards"-->
<!--              :key="card.title"-->
<!--              v-bind="{ [`xs${card.flex}`]: true }"-->
<!--              v-divider-->
<!--            >-->
<!--                <v-img-->
<!--                  :src="card.src"-->
<!--                  height="200px"-->
<!--                >-->
<!--                  <v-container-->
<!--                    fill-height-->
<!--                    fluid-->
<!--                    pa-2-->
<!--                  >-->
<!--                    <v-layout fill-height>-->
<!--                      <v-flex xs12 align-end flexbox>-->
<!--                        <span class="headline white&#45;&#45;text" v-text="card.title"></span>-->
<!--                      </v-flex>-->
<!--                    </v-layout>-->
<!--                  </v-container>-->
<!--                </v-img>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-card>-->
    <v-layout>
      <v-flex xs4 sm12 sm8>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="/talents/dancer.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Dancer</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
<!--        <v-toolbar class="light-grey">-->
<!--          <v-btn class="justify-center">Dancer</v-btn>-->
<!--        </v-toolbar>-->
      </v-flex>
      <v-flex xs6 sm12 offset-sm1>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="/talents/musician.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Musician</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex xs8 sm12 offset-sm1>
        <v-card>
<!--          onclick={{console.log}}-->
          <v-img
            class="white--text"
            height="200px"
            src="/talents/singer.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Singer</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
      <v-container>
        <v-card-actions class="justify-center">
          <v-flex xs12 sm8>
            <v-select
              :items="talents"
              label="Select talent"
              v-model="selected_talent"
              solo
            ></v-select>
          </v-flex>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-flex xs12 sm8>
            <v-select
              :items="filteredStyles"
              label="Select styles"
              v-model="selected_style"
              solo
            ></v-select>
          </v-flex>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-flex xs12 sm8 d-flex>
            <v-btn round class="success" @click="display">Search</v-btn>
          </v-flex>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-flex xs10 sm6 d-flex>
            <v-btn round class="error" @click="clear">Clear</v-btn>
          </v-flex>
        </v-card-actions>
        <v-card flat class="pa-3" v-for="performer in performers" :key="performer.fullname">
          <v-layout row wrap>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Full Name</div>
              <div>{{ performer.fullname }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Style</div>
              <div>{{ performer.style }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Experience</div>
              <div>{{ performer.experience }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Price</div>
              <div>{{ performer.price}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Booked</div>
              <div>{{ performer.isBooked}}</div>
            </v-flex>
            <v-btn flat color="green" @click="book(performer.uid, performer.email, performer.fullname, performer.talent, performer.style)">
              Book
            </v-btn>
          </v-layout>
        </v-card>
      </v-container>
  </div>
</template>

<script>
  import { db } from '../firebase';
  const fb = require('../firebase');

  export default {
    data() {
      return {
        cards: [
          { title: 'Dancer', src: '/talents/dancer.jpg', flex: 20 },
          { title: 'Musician', src: '/talents/musician.jpg', flex: 20 },
          { title: 'Singer', src: '/talents/singer.jpg', flex: 20 }
        ],
        //text and values for first dropdown menu
        talents: [
          { text: 'Dancer', value: "Dancer" },
          { text: 'Singer', value: "Singer" },
          { text: 'Musician', value: "Musician" },
        ],
        //text and values for second dropdown menu
        //each section is dependant on option selected in first dropdown menu
        styles: [
          { text: 'Ballet', value: "Ballet", dependency: "Dancer" },
          { text: 'Bhangra', value: "Bhangra", dependency: "Dancer" },
          { text: 'Bollywood', value: "Bollywood", dependency: "Dancer" },
          { text: 'Break', value: "Break", dependency: "Dancer" },
          { text: 'Hip-Hop', value: "Hiphop", dependency: "Dancer" },
          { text: 'Pop', value: "Pop", dependency: "Dancer" },

          { text: 'Acoustic Blues', value: "Blues", dependency: "Singer" },
          { text: 'Americana', value: "Americana", dependency: "Singer" },
          { text: 'Classical', value: "Classical", dependency: "Singer" },
          { text: 'Comedy', value: "Comedy", dependency: "Singer" },
          { text: 'Country', value: "Country", dependency: "Singer" },
          { text: 'Dubstep', value: "Dubstep", dependency: "Singer" },
          { text: 'Glitch House', value: "Glitch", dependency: "Singer" },
          { text: 'Hip-Hop', value: "Hiphop", dependency: "Singer" },
          { text: 'Jazz', value: "Jazz", dependency: "Singer" },
          { text: 'Novelty', value: "Novelty", dependency: "Singer" },
          { text: 'Parody Music', value: "Parody", dependency: "Singer" },
          { text: 'Rock', value: "Rock", dependency: "Singer"},

          { text: 'Blues', value: "Blues", dependency: "Musician" },
          { text: 'Classical', value: "Classical", dependency: "Musician" },
          { text: 'Hip-Hop', value: "Hiphop", dependency: "Musician" },
          { text: 'Jazz', value: "Jazz", dependency: "Musician" },
          { text: 'Opera', value: "Opera", dependency: "Musician" },
          { text: 'Pop', value: "Pop", dependency: "Musician" },
          { text: 'Rock', value: "Rock", dependency: "Musician" },
        ],
        selected_talent: '',
        selected_style: '',
        performers: [],
        uid: '',
      }
    },
    computed: {
      //matches style dependency with the corresponding talent
      filteredStyles() {
        let styles = this.styles;
        return styles.filter(o => o.dependency === this.selected_talent)
      }
    },
    methods: {
      display() {
        //if no style is selected, display list of matching talent
        if (this.selected_style === '') {
          this.performers = [];
          db.collection('performers')
            .where('talent', '==', this.selected_talent)
            .get()
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
        }
        //if style is selected, display list of matching talent and style
        else {
          this.performers = [];
          let query = db.collection('performers');
          query = query.where('talent', '==', this.selected_talent);
          query = query.where('style', '==', this.selected_style);
          query.get()
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
        }
      },
      //resets talent and style dropdown
      clear() {
        this.$nextTick(() => {
          this.selected_talent = '';
          this.selected_style = '';
        })
      },
      book(uid, email,fullname,talent,style){
        let ref = db.collection('performers').doc(uid);

        let user = fb.auth.currentUser;
        db.collection('users').doc(user.uid)
          .collection('performersBooked').doc(uid).set({
          uid: uid,
          email: email,
          fullname: fullname,
          talent: talent,
          style: style
        })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log("Performer booked!")
          })

        return ref.set({
          isBooked: true
        }, { merge: true })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log("isBook set to true!")
          })
      }
    }
  }
</script>

<style scoped>

</style>
