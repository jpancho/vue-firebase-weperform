<template>
  <v-layout row justify-center>
    <v-dialog max-width="400">
      <v-btn round class="grey" color="white" slot="activator">Become a Performer!</v-btn>
      <v-card>
        <v-text-field
          label="Full name"
          v-model="fullname"
        ></v-text-field>
        <v-select
          :items="talents"
          label="Select talent"
          v-model="selected_talent"
          solo
        ></v-select>
        <v-select
          :items="filteredStyles"
          label="Select styles"
          v-model="selected_style"
          solo
        ></v-select>
        <v-select
                :items="location"
                label="Select location"
                v-model="selected_location"
                solo
        ></v-select>
        <v-text-field
          label="Experience"
          v-model="experience"
        ></v-text-field>
        <v-text-field
          label="Price"
          v-model="price"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="bePerformer">Become a Performer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import { db, auth } from '../firebase';

  export default {
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
        fullname: '',
        experience: '',
        price: '',
        selected_talent: '',
        selected_style: '',
        selected_location: '',
      }
    },
    computed: {
      //matches style dependency with the corresponding talent
      filteredStyles() {
        let styles = this.styles;
        return styles.filter(o => o.dependency === this.selected_talent)
      }
    },
    methods:{
      //Be Performer
      bePerformer() {
        let user = auth.currentUser;
        db.collection('performers').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          fullname: this.fullname,
          talent: this.selected_talent,
          style: this.selected_style,
          location: this.selected_location,
          experience: this.experience,
          price: this.price,
          isBooked: false
        })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log("Performer created!")
          });
        db.collection('users').doc(user.uid).set({
          isPerformer: true
        })
          .then(function() {
            // eslint-disable-next-line no-console
            console.log("isPerformer set to true")
          })
      }
    }
  }
</script>

<style scoped>

</style>
