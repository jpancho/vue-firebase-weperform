<template>
  <div class="profile">
    <v-toolbar-title class="text-uppercase grey--text">
      <h1>
        <span class="font-weight-light blue--text display-1" >Profile</span>
      </h1>
    </v-toolbar-title>
    <v-container class="my-5">
      <v-layout column>
        <v-flex xs12 sm6 md4 lg12 v-for="info in profile" :key="info.uid">
          <v-card class="text-xs-center ma-3 white--text font-weight-bold black">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="imageUrl" alt="">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <h1 class="title">{{ info.fullname }}</h1>
              <h4 class="grey--text">{{ info.email }}</h4>
              <p></p>
              <div>ID</div>
              <div class="grey--text">{{ info.id }}</div>
            </v-card-text>
            <input type="file" ref="fileInput" accept="image/*" @change="onFilePicked">
<!--            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>-->
            <v-divider color="grey"></v-divider>
            <v-divider color="grey"></v-divider>
            <p></p>
            <p class="font-italic font-weight-light">DESCRIPTION</p>
            <p>...</p>
          </v-card>
        </v-flex>
      </v-layout>
      <v-card flat class="pa-3" v-for="info in profile" :key="info.uid">
        <v-layout row wrap>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Email</div>
            <div>{{ info.email }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">User ID</div>
            <div>{{ info.uid }}</div>
          </v-flex>
        </v-layout>
      </v-card>
      <PopupPerformer/>
    </v-container>
  </div>
</template>

<script>
  const fb = require('../firebase');
  import { db } from '../firebase';
  import PopupPerformer from '../views/PopupPerformer';
  let user = fb.auth.currentUser;

  export default {
    components: { PopupPerformer },
    data() {
      return {
        profile: [],
        fullname: '',
        imageUrl: '',
        image: null
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
          this.imageUrl = doc.data().imageUrl;
          this.fullname = doc.data().fullname;
      });
      db.collection('users')
        .where('uid', '==', user.uid)
        .get()
        .then(doc => {
          const changes = doc.docChanges();
          changes.forEach(change => {
            if(change.type === 'added') {
              this.profile.push({
                ...change.doc.data(),
                id: change.doc.id
              })
            }
          })
        })
    },
    methods: {
      // onPickFile() {
      //   this.$refs.fileInput.click()
      // },
      onFilePicked(event) {
        const files = event.target.files;
        let filename = files[0].name;
        if(filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result;
          db.collection('users').doc(user.uid).update({
            imageUrl: fileReader.result
          })
            .then(function() {
              // eslint-disable-next-line no-console
              console.log("New image url set!")
            })
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0]
      }
    }
  }
</script>

<style scoped>

</style>
