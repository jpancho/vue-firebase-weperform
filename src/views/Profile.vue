<template>
  <div class="profile">
    <v-toolbar-title class="text-uppercase grey--text">
      <h1>
        <span class="font-weight-light blue--text display-1" >Profile</span>
      </h1>
      <v-divider color="grey"></v-divider>
      <v-divider color="grey"></v-divider>
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
            <p class="font-italic font-weight-light">DESCRIPTION</p><v-btn id = "edit" @click="edit" color="primary" fab small dark> <v-icon>edit</v-icon></v-btn>
            <div id="des">
              <textarea id="description" v-model="description" readonly></textarea>
            <p></p>
            <v-btn @click="save" id="save" small>Save</v-btn><v-btn @click="cancel" id="cancel" small>Cancel</v-btn>
            </div>
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
    components: {PopupPerformer},
    data() {
      return {
        profile: [],
        fullname: '',
        imageUrl: '',
        image: null,
        description:''
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
        this.fullname = doc.data().fullname;
        this.description = doc.data().description;
      });
      db.collection('users')
              .where('uid', '==', user.uid)
              .get()
              .then(doc => {
                const changes = doc.docChanges();
                changes.forEach(change => {
                  if (change.type === 'added') {
                    this.profile.push({
                      ...change.doc.data(),
                      id: change.doc.id
                    })
                  }
                })
              })
    },
    methods: {
      cancel() {
        document.getElementById("description").style.border = "none";
        document.getElementById("description").value = "";
        document.getElementById("edit").style.visibility = "visible";
        document.getElementById("save").style.visibility = "hidden";
        document.getElementById("cancel").style.visibility = "hidden";
        document.getElementById("description").readOnly = true;
      },
      save() {
        db.collection('users').doc(user.uid).update({
          description: this.description
        })
        document.getElementById("description").style.border = "none"
        document.getElementById("save").style.visibility = "hidden";
        document.getElementById("cancel").style.visibility = "hidden";
        document.getElementById("edit").style.visibility = "visible";
        document.getElementById("description").readOnly = true;
      },
      edit() {
        document.getElementById("description").style.border = "1px solid white"
        document.getElementById("description").readOnly = false;
        document.getElementById("des").style.visibility = "visible";
        document.getElementById("edit").style.visibility = "hidden";
        document.getElementById("save").style.visibility = "visible";
        document.getElementById("cancel").style.visibility = "visible";
        // onPickFile() {
        //   this.$refs.fileInput.click()
        // },
      },
        onFilePicked(event)
        {
          const files = event.target.files;
          let filename = files[0].name;
          if (filename.lastIndexOf('.') <= 0) {
            return alert('Please add a valid file!')
          }
          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result;
            db.collection('users').doc(user.uid).update({
              imageUrl: fileReader.result
            })
                    .then(function () {
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

#description{
  width: 500px;
  height: 167px;
  text-align: left;
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
    display:inline-block;
  }
</style>
