import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCukYeIwM1YCkYGJXpn2dupNzLy2t39EAQ",
  authDomain: "weperform-8063b.firebaseapp.com",
  databaseURL: "https://weperform-8063b.firebaseio.com",
  projectId: "weperform-8063b",
  storageBucket: "weperform-8063b.appspot.com",
  messagingSenderId: "279863446616"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

export { db, auth, currentUser};
