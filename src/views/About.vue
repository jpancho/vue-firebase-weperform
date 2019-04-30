<template>
  <div class="about">
    <v-toolbar-title class="text-uppercase grey--text">
      <h1>
        <span class="font-weight-light blue--text display-1" >Solution</span>
        <span class="blue--text display-1"> Team</span>
      </h1>
    </v-toolbar-title>

    <v-container class="my-5">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-xs-center ma-3 white--text" color="blue-grey darken-2">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading font-weight-regular">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
              <p class="text-xs-center">{{  }}</p>
              <p class="font-italic font-weight-light">{{ person.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="light-green">
                <v-icon small left>message</v-icon>
                <span>message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        team: [
          { name: 'Jason Zhou', role: 'Test analyst | Debugger', avatar: '/Jason.jpg', description: '"Specifies the required Test Data and evaluating the outcome of the testing conducted in each test cycle."'},
          { name: 'Justin Pancho', role: 'Web developer', avatar: '/Justin.jpg', description: '"Responsible for designing, coding and modifying websites, from layout to function and according to a client\'s specifications."'},
          { name: 'Matthew Lau', role: 'Web developer', avatar: '/Matthew.jpg', description: '"Have a strong understanding of UI, cross-browser compatibility, general web functions and standards; skilled with security principles."'},
          { name: 'Parm Dhaliwal', role: 'Graphic designer', avatar: '/Parm.jpg', description: '"Illustrates concept by designing rough layout of art and copy regarding arrangement, and related aesthetic concepts."'},
        ]
      }
    }
  }
</script>