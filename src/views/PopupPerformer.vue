<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container grid-list-xl>
  <v-layout row justify-center>
    <v-dialog v-model = "dialog" max-width="500">
      <v-btn round class="grey" color="white" slot="activator">
        Become a Performer
      </v-btn>
      <v-card>
        <v-toolbar dark color="blue-grey">
          <v-toolbar-title>Let's make you a performer...</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form  v-model="valid" lazy-validation>
              <v-text-field
                label="Preferred name"
                v-model="fullname"
                placeholder="your preferred name"
                :rules="nameRules" required
              ></v-text-field>
              <v-overflow-btn
                :items="talents"
                label="Select category"
                v-model="selected_talent"
                :rules="talentRules" required
              ></v-overflow-btn>
              <v-layout>
                <v-flex>
                  <v-menu
                    class="grow"
                    v-model="menu2"
                    :close-on-content-click="false"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="selected_style"
                        label="Select styles"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-card class="rg-popover">
                      <v-card-text>
                        <span v-bind:key="style.text" v-for='style in filteredStyles'>
                          <v-checkbox v-model="selected_style" :label="style.text" :value="style.value" hide-details></v-checkbox>
                        </span>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex>
                  <v-menu
                    class="grow"
                    v-model="menu1"
                    :close-on-content-click="false"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="availability"
                        label="Availability"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-card class="rg-popover">
                      <v-card-text>
                        <span v-bind:key="day.text" v-for='day in dayOfTheWeek'>
                          <v-checkbox v-model="availability" :label="day.text" :value="day.value" hide-details></v-checkbox>
                        </span>
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-overflow-btn
                :items="location"
                label="Select location"
                v-model="selected_location"
                :rules="locationRules"
              ></v-overflow-btn>
              <v-overflow-btn
                :items="experience"
                label="Select experience"
                v-model="selected_experience"
                placeholder="Intermediate"
                :rules="experienceRules"
              ></v-overflow-btn>
              <v-text-field
                label="Price"
                v-model="price"
                prefix="$"
                suffix="/hr"
                :rules="priceRules"
              ></v-text-field>
            <v-layout row justify-center>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading4"
                  :disabled="!valid"
                  color="info"
                  @click="loader = 'loading4'"
                  class="success"
                  v-on:click="bePerformer"
                >
                  Become a Performer
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
    name: 'PopupPerformer',
    props: { imageUrl: String },
    data() {
      return {
        //text and values for first dropdown menu
        talents: [
          { text: 'Dancer', value: "Dancer" },
          { text: 'Singer', value: "Singer" },
          { text: 'Musician', value: "Musician" },
        ],
        //text and values for second dropdown menu
        //each section is dependant on option selected in first dropdown menu
        styles: [
          { text: 'Ballet', value: " Ballet", dependency: "Dancer" },
          { text: 'Bhangra', value: " Bhangra", dependency: "Dancer" },
          { text: 'Bollywood', value: " Bollywood", dependency: "Dancer" },
          { text: 'Break', value: " Break", dependency: "Dancer" },
          { text: 'Hip-Hop', value: " Hiphop", dependency: "Dancer" },
          { text: 'Pop', value: " Pop", dependency: "Dancer" },

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

          { text: 'Blues', value: " Blues", dependency: "Musician" },
          { text: 'Classical', value: " Classical", dependency: "Musician" },
          { text: 'Hip-Hop', value: " Hiphop", dependency: "Musician" },
          { text: 'Jazz', value: " Jazz", dependency: "Musician" },
          { text: 'Opera', value: " Opera", dependency: "Musician" },
          { text: 'Pop', value: " Pop", dependency: "Musician" },
          { text: 'Rock', value: " Rock", dependency: "Musician" },
        ],
        location: [
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
        experience: [
          { text: 'Beginner', value: "Beginner" },
          { text: 'Intermediate', value: "Intermediate" },
          { text: 'Advanced', value: "Advanced" },
        ],
        dayOfTheWeek: [
          { text: 'Monday', value: " Monday" },
          { text: 'Tuesday', value: " Tuesday" },
          { text: 'Wednesday', value: " Wednesday" },
          { text: 'Thursday', value: " Thursday" },
          { text: 'Friday', value: " Friday" },
          { text: 'Saturday', value: " Saturday" },
          { text: 'Sunday', value: " Sunday" },
        ],
        fullname: '',
        selected_talent: '',
        selected_style: [],
        selected_location: '',
        selected_experience: '',
        availability: [],
        price: '',
        dialog: false,
        loader: null,
        loading4: false,
        valid: false,
        nameRules: [
            v => !!v || 'Name is required'
        ],
        talentRules: [
            v => !!v || 'Talent is required'
        ],
        styleRules: [
            v => !!v || 'Talent is required'
        ],
        locationRules: [
            v => !!v || 'Location is required'
        ],
        experienceRules: [
            v => !!v || 'Experience is required'
        ],
        priceRules: [
            v => !!v || 'Price is required',
            v =>
                v >= 0 ||
                'Price must be a positive number'
        ]
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
      });
      this.show()
    },
    watch: {
      loader () {
        const l = this.loader;
        this[l] = !this[l];

        setTimeout(() => (this[l] = false), 3000);

        this.loader = null;

        setTimeout(() => this.dialog = false, 3000);
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
      //Be Performer
      bePerformer() {
        if(this.fullname==='' || this.selected_talent==='' || this.selected_style=== '' ||
          this.selected_location=== '' || this.selected_experience=== ''|| this.availability=== '' || this.price=== ''){
          alert('Please fill all the fields')
        }

        else {
          db.collection('performers').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            imageUrl:this.imageUrl,
            fullname: this.fullname,
            talent: this.selected_talent,
            style: this.selected_style,
            location: this.selected_location,
            experience: this.selected_experience,
            availability: this.availability,
            price: this.price,
            isBooked: false,
            ratings: "0",
            numberofreviews:0,
            totalrating:0
          })
            .then(function () {
              // eslint-disable-next-line no-console
              console.log("Performer created!")
            });
          db.collection('users').doc(user.uid).update({
            isPerformer: true
          })
            .then(function () {
              // eslint-disable-next-line no-console
              console.log("isPerformer set to true")
            })
        }
      }
    },
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
