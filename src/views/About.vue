<template>
  <div class="about">

    <v-toolbar-title class="text-uppercase blue--text" style="text-align: center">
      <h1>
        <span class="font-weight-light display-1" >Solution</span>
        <span class="display-1"> Team</span>
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
              <p></p>
              <p class="font-italic font-weight-light">{{ person.description }}</p>
            </v-card-text>
            <v-divider color="grey"></v-divider>
            <v-divider color="grey"></v-divider>
            <v-card-actions>
              <v-layout align-center justify-space-around>
                <v-btn flat icon>
                  <a :href="person.url">
                    <v-avatar size="36">
                      <img :src="person.linkedin">
                    </v-avatar>
                  </a>
                </v-btn>
                <v-btn flat icon>
                  <a :href="person.url1">
                    <v-avatar size="36">
                      <img :src="person.github">
                    </v-avatar>
                  </a>
                </v-btn>
              </v-layout>
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
          { name: 'Jason Zhou', role: 'Test analyst | Debugger', avatar: '/assets/img/faces/Jason.jpg', description: '"Specifies the required Test Data and evaluating the outcome of the testing conducted in each test cycle; skilled with database."', linkedin: '/assets/img/logos/linkedin.png', github: '/assets/img/logos/github.png', url: 'https://www.linkedin.com/in/jasonzhou97', url1: 'https://github.com/JasonZhouE'},
          { name: 'Justin Pancho', role: 'Web developer', avatar: '/assets/img/faces/Justin.jpg', description: '"Responsible for designing, coding and modifying websites, from layout to function and according to a client\'s specifications."', linkedin: '/assets/img/logos/linkedin.png', github: '/assets/img/logos/github.png', url: 'https://www.linkedin.com/in/jpancho', url1: 'https://github.com/jpancho'},
          { name: 'Matthew Lau', role: 'Web developer', avatar: '/assets/img/faces/Matthew.jpg', description: '"Have a strong understanding of UI, cross-browser compatibility, general web functions and standards; skilled with security principles."', linkedin: '/assets/img/logos/linkedin.png', github: '/assets/img/logos/github.png', url: 'https://www.linkedin.com/in/matthew-lau-55b48b183', url1: 'https://github.com/mlau95'},
          { name: 'Parm Dhaliwal', role: 'Graphic designer', avatar: '/assets/img/faces/Parm.jpg', description: '"Illustrates concept by designing rough layout of art and copy regarding arrangement, and related aesthetic concepts."', linkedin: '/assets/img/logos/linkedin.png', github: '/assets/img/logos/github.png', url: 'https://www.linkedin.com/in/parm-s-dhaliwal', url1: 'https://github.com/ParmDhaliwal'},
        ]
      }
    }
  }
</script>