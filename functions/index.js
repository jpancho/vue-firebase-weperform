const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.addUsers = functions.auth
  .user()
  .onCreate((user) => {
    const userRef = db.doc(`users/${user.uid}`);

    return userRef.set({
      uid: user.uid,
      email: user.email,
      bookings: []
    });
  });