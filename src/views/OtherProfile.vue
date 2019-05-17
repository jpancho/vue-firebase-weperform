<template>
  <div class="profile">
    <v-toolbar-title class="text-uppercase grey--text">
      <h1>
        <span class="font-weight-light blue--text display-1" >Profile</span>
      </h1>
    </v-toolbar-title>
    <v-container class="my-5">
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
              <h4 class="grey--text">{{ email }}</h4>
              <p></p>
              <div>ID</div>
              <div class="grey--text">{{ uid }}</div>
            </v-card-text>
            <v-divider color="grey"></v-divider>
            <v-divider color="grey"></v-divider>
            <p></p>
            <p class="font-italic font-weight-light">DESCRIPTION</p>
            <div id="des">
              <textarea id="description" v-model="description" spellcheck="false" readonly></textarea>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { db } from '../firebase';

  export default {
    props: ['profileId'],
    data() {
      return {
        profile: [],
        fullname: '',
        email: '',
        uid: '',
        imageUrl: '',
        image: null,
        description: ''
      }
    },
    created() {
      db.collection('users').doc(this.profileId).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
        this.fullname = doc.data().fullname;
        this.email = doc.data().email;
        this.uid = doc.data().uid;
        this.description = doc.data().description;
      });
    },
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

