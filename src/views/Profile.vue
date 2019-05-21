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
          <v-card class="text-xs-center ma-3 white--text font-weight-bold grey">
            <v-responsive class="pt-4">
              <v-avatar size="150" style="cursor: pointer" @click="onPickFile" class="grey lighten-2">
                <img :src="imageUrl" alt="Circle Image" class="img-raised rounded-circle img-fluid">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <v-divider color="white"></v-divider>
              <v-divider color="white"></v-divider>
              <p></p>
              <h1 class="title">{{ fullname }}</h1>
              <h4 class="black--text">{{ email }}</h4>
            <input type="file" ref="fileInput" hidden accept="image/*" @change="onFilePicked">
            <p></p>
            <p class="font-weight-regular">DESCRIPTION
              <v-btn id = "edit" @click="edit" icon>
                <v-icon color="white">edit</v-icon>
              </v-btn>
            </p>
            <div id="des">
              <textarea id="description" v-model="description" spellcheck="false" readonly></textarea>
            <v-divider color="black"></v-divider>
            <v-btn @click="save" id="save" small>Save</v-btn><v-btn @click="cancel" id="cancel" small>Cancel</v-btn>
            </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
        email: '',
        uid: '',
        imageUrl: '',
        image: null,
        description: ''
      }
    },
    created() {
      db.collection('users').doc(user.uid).get().then(doc => {
        this.imageUrl = doc.data().imageUrl;
        this.fullname = doc.data().fullname;
        this.email = doc.data().email;
        this.uid = user.uid;
        this.description = doc.data().description;
      });
    },
    methods: {
      cancel() {
        document.getElementById("description").style.border = "none";
        document.getElementById("edit").style.visibility = "visible";
        document.getElementById("save").style.visibility = "hidden";
        document.getElementById("cancel").style.visibility = "hidden";
        document.getElementById("description").readOnly = true;
        db.collection('users').doc(user.uid).get().then(doc => {
          this.description = doc.data().description;
        });
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
        document.getElementById("description").style.border = "1px solid #4D90FE"
        document.getElementById("description").readOnly = false;
        document.getElementById("des").style.visibility = "visible";
        document.getElementById("edit").style.visibility = "hidden";
        document.getElementById("save").style.visibility = "visible";
        document.getElementById("cancel").style.visibility = "visible";
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
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
                  .then(function () {
                    // eslint-disable-next-line no-console
                    console.log("New image url set!")
                  })
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0]
      }
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
