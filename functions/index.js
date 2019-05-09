const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
const db = admin.firestore();

const getUsers = (req, res) => {
  let users = [];
  const userRef = db.collection('users');
  userRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        users.push(doc.data());
      });
      return new Promise((resolve, reject) => {
        resolve(users);
      })
    })
    .catch(err => {
      console.log(err);
      return new Promise((resolve, reject) => {
        reject(new Error('Error'));
      })
    })
};

exports.getUsers = functions.https.onRequest(getUsers);

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