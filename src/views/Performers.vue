<template>
  <div class="performer">
    <h1 class="subheading grey--text">Performers List</h1>
      <v-container class="my-5">
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="talents"
            label="Select talent"
            v-model="selected_talent"
            solo
          ></v-select>
          <v-btn class="sucess" @click="display">Search</v-btn>
        </v-flex>
        <v-card flat class="pa-3" v-for="performer in performers" :key="performer.fullname">
          <v-layout row wrap>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Full Name</div>
              <div>{{ performer.fullname }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
  </div>
</template>

<script>
  import { db } from '../firebase';

  export default {
    data() {
      return {
        talents: [
          { text: 'Dancer', value: "dancer" },
          { text: 'Singer', value: "singer" },
          { text: 'Musician', value: "musician" },
        ],
        selected_talent: '',
        performers: [],
      }
    },
    methods: {
      display() {
        this.performers = [];
        db.collection('performers')
        .where('talent', '==', this.selected_talent)
        .get()
        .then(doc => {
          const changes = doc.docChanges();
          changes.forEach(change => {
            if(change.type == 'added') {
              this.performers.push({
                ...change.doc.data(),
                id: change.doc.id
              })
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
