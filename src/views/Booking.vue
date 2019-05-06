<template>
    <div class="Booking">
        <h1>Booked Performers</h1>
        <v-container class="my-5">
            <v-card flat class="pa-3" v-for="performer in performers" :key="performer.fullname">
                <v-layout row wrap>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Full Name</div>
                        <div>{{ performer.fullname }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Talent</div>
                        <div>{{ performer.talent }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Style</div>
                        <div>{{ performer.style }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Email</div>
                        <div>{{ performer.email }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Uid</div>
                        <div>{{ performer.uid }}</div>
                    </v-flex>
                    <v-btn flat color="red" @click="cancel(performer.uid)">
                       cancel
                    </v-btn>
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import { db } from '../firebase';
    const fb = require('../firebase');
    export default {
        name: "Booking",
        data() {
            return {
                // //text and values for first dropdown menu
                // talents: [
                //     { text: 'Dancer', value: "Dancer" },
                //     { text: 'Singer', value: "Singer" },
                //     { text: 'Musician', value: "Musician" },
                // ],
                // //text and values for second dropdown menu
                // //each section is dependant on option selected in first dropdown menu
                // styles: [
                //     { text: 'Ballet', value: "Ballet", dependency: "Dancer" },
                //     { text: 'Bhangra', value: "Bhangra", dependency: "Dancer" },
                //     { text: 'Bollywood', value: "Bollywood", dependency: "Dancer" },
                //     { text: 'Break', value: "Break", dependency: "Dancer" },
                //     { text: 'Hip-Hop', value: "Hiphop", dependency: "Dancer" },
                //     { text: 'Pop', value: "Pop", dependency: "Dancer" },
                //
                //     { text: 'Acoustic Blues', value: "Blues", dependency: "Singer" },
                //     { text: 'Americana', value: "Americana", dependency: "Singer" },
                //     { text: 'Classical', value: "Classical", dependency: "Singer" },
                //     { text: 'Comedy', value: "Comedy", dependency: "Singer" },
                //     { text: 'Country', value: "Country", dependency: "Singer" },
                //     { text: 'Dubstep', value: "Dubstep", dependency: "Singer" },
                //     { text: 'Glitch House', value: "Glitch", dependency: "Singer" },
                //     { text: 'Hip-Hop', value: "Hiphop", dependency: "Singer" },
                //     { text: 'Jazz', value: "Jazz", dependency: "Singer" },
                //     { text: 'Novelty', value: "Novelty", dependency: "Singer" },
                //     { text: 'Parody Music', value: "Parody", dependency: "Singer" },
                //     { text: 'Rock', value: "Rock", dependency: "Singer"},
                //
                //     { text: 'Blues', value: "Blues", dependency: "Musician" },
                //     { text: 'Classical', value: "Classical", dependency: "Musician" },
                //     { text: 'Hip-Hop', value: "Hiphop", dependency: "Musician" },
                //     { text: 'Jazz', value: "Jazz", dependency: "Musician" },
                //     { text: 'Opera', value: "Opera", dependency: "Musician" },
                //     { text: 'Pop', value: "Pop", dependency: "Musician" },
                //     { text: 'Rock', value: "Rock", dependency: "Musician" },
                // ],
                performers: [],
                uid: '',
            }
        },
    methods: {
        show()
        {
            // let ref = db.collection('performers').doc(uid);
            let user = fb.auth.currentUser;
            this.performers = [];
            db.collection('users').doc(user.uid)
                .collection('performersBooked').get()
                .then(doc => {
                    const changes = doc.docChanges();
                    changes.forEach(change => {
                        if (change.type === 'added') {
                            this.performers.push({
                                ...change.doc.data(),
                                id: change.doc.id
                            })
                        }
                    })
                })
        },
        cancel(uid){
            let ref =  db.collection('performers').doc(uid);
            let user = fb.auth.currentUser;
            db.collection('users').doc(user.uid)
                .collection('performersBooked').doc(uid).delete();

            return ref.set({
                isBooked: false
            }, { merge: true })
                .then(function() {
                    // eslint-disable-next-line no-console
                    console.log("Booking is canceled!");
                    window.location.reload()
                })
        }
     },
        created: function(){
            this.show()
        }
    }
</script>

<style scoped>

</style>