import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const getUsers = functions.https.onRequest((request, response) => {
  response.send(db.collection('users'));
});

export const addUsers = functions.auth
  .user()
  .onCreate((user) => {
    const userRef = db.doc(`users/${user.uid}`);

    // @ts-ignore
    return userRef.set({
      uid: user.uid,
      email: user.email
    });
  });

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
