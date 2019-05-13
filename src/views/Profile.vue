<template>
  <div class="profile">
    <v-toolbar-title class="text-uppercase grey--text">
      <h1>
        <span class="font-weight-light blue--text display-1" >Profile</span>
      </h1>
    </v-toolbar-title>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg12 v-for="info in profile" :key="info.uid">
          <v-card flat class="text-xs-center ma-3 white--text" color="black lighten-2">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="green lighten-2">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading font-weight-regular">Name</div>
              <div class="grey--text">{{ info.email }}</div>
              <p></p>
              <div>ID</div>
              <div class="grey--text">{{ info.uid }}</div>
            </v-card-text>
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

  import { db, auth } from '../firebase';
  import PopupPerformer from '../views/PopupPerformer'

  export default {
    components: { PopupPerformer },
    data() {
      return {
        profile: []
      }
    },
    created() {
      let user = auth.currentUser;
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
    }
  }
</script>

<style scoped>

</style>
