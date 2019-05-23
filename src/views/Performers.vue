<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="performer">
    <v-toolbar-title class="text-uppercase">
      <h1 class="blue--text">
        <span class="font-weight-light display-1">Book your</span>
        <span class="display-1"> Performer</span>
      </h1>
    </v-toolbar-title>
    <p class="grey--text headline font-weight-regular" style="text-align: center">Select Category</p>
    <v-layout align-center justify-space-around>
      <!--talent images-->
      <!--Dancer-->
      <v-flex xs4 sm12 sm8>
        <v-hover>
          <v-card slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`">
            <v-img
              src="/assets/img/talents/dancer.jpg"
              v-model="selected_talent"
              style="cursor: pointer"
              class="white--text"
              @click="dancer"
              height="200px"
              id = "d"
            >
              <v-expand-transition>
                <div
                  class="d-flex transition-fast-in-fast-out lighten-2 v-card--reveal display-3 white--text font-weight-bold"
                  style="height: 100%;"
                >
                  DANCER
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-flex>
      <!--Musician-->
      <v-flex xs6 sm12 offset-sm1>
        <v-hover>
          <v-card slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`">
            <v-img
              src="/assets/img/talents/musician.jpg"
              v-model="selected_talent"
              style="cursor: pointer"
              class="white--text"
              @click="musician"
              height="200px"
              id = "m"
            >
              <v-expand-transition>
                <div
                  class="d-flex transition-fast-in-fast-out lighten-2 v-card--reveal display-3 white--text font-weight-bold"
                  style="height: 100%;"
                >
                  MUSICIAN
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-flex>
      <!--Singer-->
      <v-flex xs8 sm12 offset-sm1>
        <v-hover>
          <v-card slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`">
            <v-img
              src="/assets/img/talents/singer.jpg"
              v-model="selected_talent"
              style="cursor: pointer"
              class="white--text"
              @click="singer"
              height="200px"
              id = "s"
            >
              <v-expand-transition>
                <div
                  class="d-flex transition-fast-in-fast-out lighten-2 v-card--reveal display-3 white--text font-weight-bold"
                  style="height: 100%;"
                >
                  SINGER
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <!--Dropdown-->
    <v-container>
      <v-card-actions class="justify-center">
        <v-flex sm4>
          <v-select
            :items="filteredStyles"
            label="Select style"
            v-model="selected_style"
            solo
            v-show="categorySelected"
          ></v-select>
        </v-flex>
      </v-card-actions>
      <v-card-actions class="justify-center">
        <v-flex sm4>
          <v-select
            :items="location"
            label="Select location"
            v-model="selected_location"
            solo
            v-show="categorySelected"
          ></v-select>
        </v-flex>
      </v-card-actions>
      <!--date-->
      <v-layout class="justify-center">
        <v-flex xs12 sm6 md4>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="120"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Select date"
                prepend-icon="event"
                readonly
                v-on="on"
                v-show="categorySelected"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false" landscape="landscape"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-card-actions class="justify-center">
        <v-flex sm4 d-flex>
          <v-btn round class="success" @click="display(convertDate(date))">Search</v-btn>
        </v-flex>
      </v-card-actions>
      <v-card-actions class="justify-center">
        <v-flex sm2 d-flex>
          <v-btn round class="error" @click="clear">Clear</v-btn>
        </v-flex>
      </v-card-actions>
      <!--Performer list-->
      <v-card flat class="pa-3" v-for="performer in performers" :key="performer.fullname">
        <v-layout row wrap>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Full Name</div>
            <div>{{ performer.fullname }}</div>
            <v-rating v-model="performer.ratings" background-color="orange lighten-3" color="orange" small half-increments readonly></v-rating>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Style</div>
            <div v-for="style in performer.style" :key="style">{{style }}</div>
            <div>{{style}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Experience</div>
            <div>{{ performer.experience }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div> ${{ performer.price}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Location</div>
            <div>{{ performer.location}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <PopupProfile :uid = performer.uid :notBooked = true></PopupProfile>
            <v-btn flat color="green" :disabled="performer.sameUser" @click="bookAndCount(performer.uid, performer.email, performer.fullname, performer.talent, performer.style, performer.location)">
              Book
            </v-btn>
          </v-flex>
        </v-layout>
        <br>
        <v-divider color="black"></v-divider>
        <v-divider color="black"></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import { db, auth } from '../firebase';
  import PopupProfile from '../views/PopupProfile';

  let user = auth.currentUser;
  export default {
    components: { PopupProfile },
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
          { text: 'Select style', value: '', dependency: "Dancer"},
          { text: 'Ballet', value: " Ballet", dependency: "Dancer" },
          { text: 'Bhangra', value: " Bhangra", dependency: "Dancer" },
          { text: 'Bollywood', value: " Bollywood", dependency: "Dancer" },
          { text: 'Break', value: " Break", dependency: "Dancer" },
          { text: 'Hip-Hop', value: " Hiphop", dependency: "Dancer" },
          { text: 'Pop', value: " Pop", dependency: "Dancer" },

          { text: 'Select style', value: '', dependency: "Singer"},
          { text: 'Acoustic Blues', value: " Blues", dependency: "Singer" },
          { text: 'Americana', value: " Americana", dependency: "Singer" },
          { text: 'Classical', value: " Classical", dependency: "Singer" },
          { text: 'Comedy', value: " Comedy", dependency: "Singer" },
          { text: 'Country', value: " Country", dependency: "Singer" },
          { text: 'Dubstep', value: " Dubstep", dependency: "Singer" },
          { text: 'Glitch House', value: " Glitch", dependency: "Singer" },
          { text: 'Hip-Hop', value: " Hiphop", dependency: "Singer" },
          { text: 'Jazz', value: " Jazz", dependency: "Singer" },
          { text: 'Novelty', value: " Novelty", dependency: "Singer" },
          { text: 'Parody Music', value: " Parody", dependency: "Singer" },
          { text: 'Rock', value: " Rock", dependency: "Singer"},

          { text: 'Select style', value: '', dependency: "Musician"},
          { text: 'Blues', value: " Blues", dependency: "Musician" },
          { text: 'Classical', value: " Classical", dependency: "Musician" },
          { text: 'Hip-Hop', value: " Hiphop", dependency: "Musician" },
          { text: 'Jazz', value: " Jazz", dependency: "Musician" },
          { text: 'Opera', value: " Opera", dependency: "Musician" },
          { text: 'Pop', value: " Pop", dependency: "Musician" },
          { text: 'Rock', value: " Rock", dependency: "Musician" },
        ],
        location: [
          { text: 'Select location', value: ''},
          { text: 'Abbotsford', value: "Abbotsford" },
          { text: 'Burnaby', value: "Burnaby" },
          { text: 'Chilliwack', value: "Chilliwack" },
          { text: 'Delta', value: "Delta" },
          { text: 'Langley', value: "Langley" },
          { text: 'Maple Ridge', value: "Maple Ridge" },
          { text: 'New Westminster', value: "New Westminster" },
          { text: 'North Vancouver', value: "North Vancouver" },
          { text: 'Port Coquitlam', value: "Port Coquitlam" },
          { text: 'Richmond', value: "Richmond" },
          { text: 'Surrey', value: "Surrey" },
          { text: 'Vancouver', value: "Vancouver" },
        ],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        landscape: false,
        selected_talent: '',
        selected_style: '',
        selected_location: '',
        performers: [],
        uid: '',
        categorySelected: false,
        count: ''
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
      dancer(){
        this.selected_talent="Dancer";
        document.getElementById("d").style.outline = "7px solid orange";
        document.getElementById("m").style.outline = "none";
        document.getElementById("s").style.outline = "none";
        this.categorySelected = true;
      },
      musician(){
        this.selected_talent="Musician";
        document.getElementById("m").style.outline = "7px solid orange";
        document.getElementById("d").style.outline = "none";
        document.getElementById("s").style.outline = "none";
        this.categorySelected = true;
      },
      singer(){
        this.selected_talent="Singer";
        document.getElementById("s").style.outline = "7px solid orange";
        document.getElementById("m").style.outline = "none";
        document.getElementById("d").style.outline = "none";
        this.categorySelected = true;
      },
      display(availability) {
        //if no style and location is selected, display list of matching talent
        if (this.selected_style === '' && this.selected_location === '') {
          this.performers = [];
          db.collection('performers')
            .where('talent', '==', this.selected_talent)
            .where('availability', 'array-contains', availability)
            .get()
            .then(doc => {
              const changes = doc.docChanges();
              changes.forEach(change => {
                if (change.type === 'added') {
                  if(change.doc.data().uid === user.uid) {
                    this.performers.push({
                      ...change.doc.data(),
                      id: change.doc.id,
                      sameUser: true
                    })
                  }
                  else {
                    this.performers.push({
                      ...change.doc.data(),
                      id: change.doc.id,
                      sameUser: false
                    })
                  }
                }
              })
            })
        }
        //if no talent and style is selected, display list of matching location
        else if(this.selected_talent === '' && this.selected_style === '') {
          this.performers = [];
          db.collection('performers')
            .where('location', '==', this.selected_location)
            .where('availability', 'array-contains', availability)
            .get()
            .then(doc => {
              const changes = doc.docChanges();
              changes.forEach(change => {
                if (change.type === 'added') {
                  if(change.doc.data().uid === user.uid) {
                    this.performers.push({
                      ...change.doc.data(),
                      id: change.doc.id,
                      sameUser: true
                    })
                  }
                  else {
                    this.performers.push({
                      ...change.doc.data(),
                      id: change.doc.id,
                      sameUser: false
                    })
                  }
                }
              })
            })
        }
        //if no style is selected, display list of matching talent and location
        else if(this.selected_style === '') {
          this.performers = [];
          db.collection('performers')
            .where('location', '==', this.selected_location)
            .where('talent', '==', this.selected_talent)
            .where('availability', 'array-contains', availability)
            .get()
            .then(doc => {
              const changes = doc.docChanges();
              changes.forEach(change => {
                if (change.type === 'added') {
                  if(change.doc.data().uid === user.uid) {
                    this.performers.push({
                      ...change.doc.data(),
                      id: change.doc.id,
                      sameUser: true
                    })
                  }
                  else {
                    this.performers.push({
                      ...change.doc.data(),
                      id: change.doc.id,
                      sameUser: false
                    })
                  }
                }
              })
            })
        }
        else if(this.selected_location === '') {
          this.performers = [];
          db.collection('performers')
            .where('talent', '==', this.selected_talent)
            .where('style', 'array-contains', this.selected_style)
            .get()
            .then(doc => {
              const changes = doc.docChanges();
              changes.forEach(change => {
                if (change.type === 'added') {
                  let arrayLength = change.doc.data().availability.length;
                  for (let i = 0; i < arrayLength; i++) {
                    if (change.doc.data().availability[i] === availability) {
                      if (change.doc.data().uid === user.uid) {
                        this.performers.push({
                          ...change.doc.data(),
                          id: change.doc.id,
                          sameUser: true
                        })
                      }
                      else {
                        this.performers.push({
                          ...change.doc.data(),
                          id: change.doc.id,
                          sameUser: false
                        })
                      }
                    }
                  }
                }
              })
            })
        }
        //if style and location is selected, display list of matching talent, style and location
        else {
          this.performers = [];
          let query = db.collection('performers');
          query = query.where('talent', '==', this.selected_talent);
          query = query.where('style', 'array-contains', this.selected_style);
          query = query.where('location', '==', this.selected_location);
          query.get()
            .then(doc => {
              const changes = doc.docChanges();
              changes.forEach(change => {
                if (change.type === 'added') {
                  let arrayLength = change.doc.data().availability.length;
                  for (let i = 0; i < arrayLength; i++) {
                    if (change.doc.data().availability[i] === availability) {
                      if (change.doc.data().uid === user.uid) {
                        this.performers.push({
                          ...change.doc.data(),
                          id: change.doc.id,
                          sameUser: true
                        })
                      } else {
                        this.performers.push({
                          ...change.doc.data(),
                          id: change.doc.id,
                          sameUser: false
                        })
                      }
                    }
                  }
                }
              })
            })
        }
      },
      // mouseOver: function(){
      //   this.active = !this.active;
      // },

      //resets talent, style and location dropdown
      clear() {
        this.$nextTick(() => {
          this.selected_talent = '';
          this.selected_style = '';
          this.selected_location = '';
          this.date = new Date().toISOString().substr(0, 10);
          document.getElementById("d").style.outline = "none";
          document.getElementById("m").style.outline = "none";
          document.getElementById("s").style.outline = "none";
        });
      },
      book(uid, email,fullname,talent,style,location) {
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
          });
      },
      countBookings() {
        db.collection('users').doc(user.uid)
          .collection('performersBooked')
          .get().then(snapshot => {
            this.$store.dispatch('countAction', snapshot.size);
        });
      },
      bookAndCount(uid, email,fullname,talent,style,location) {
        this.book(uid, email,fullname,talent,style,location);
        this.countBookings(uid);
      },
      convertDate(date) {
        let dt = new Date(date);
        dt = dt.getDay();
        switch(dt) {
          case 0:
            dt = " Monday";
            break;
          case 1:
            dt = " Tuesday";
            break;
          case 2:
            dt = " Wednesday";
            break;
          case 3:
            dt = " Thursday";
            break;
          case 4:
            dt = " Friday";
            break;
          case 5:
            dt = " Saturday";
            break;
          case 6:
            dt = " Sunday";
        }
        return dt;
      }
    }
  }
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.90;
    position: absolute;
    width: 100%;
  }
</style>
