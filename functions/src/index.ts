import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const getUsers = functions.https.onRequest((request, response) => {
  response.send(db.collection('users'));
});

export const addUsers = functions.auth
  .user()
  .onCreate((user : any) => {
    const userRef = db.doc(`users/${user.uid}`);

    // @ts-ignore
    return userRef.set({
      uid: user.uid,
      email: user.email,
      bookings: []
    });
  });

export const bookPerformer = functions.database
  .ref('/performers/BSKOC1P0z0bwOIE6WI9uwmWKw2J3')
  .onUpdate(((change) => {
    //const userRef = '/users/xrZ4uAgdZAe1ol3Skg2f2EuMAmh2/performersBooked';
    const before = change.before;
    const after = change.after;
    if (before === after) {
      return null;
    }

    return admin.database()
      .ref('users/xrZ4uAgdZAe1ol3Skg2f2EuMAmh2')
      .set({after});
    // return admin.database().ref(userRef).push({after});
  }));

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
