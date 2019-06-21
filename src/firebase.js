import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

// Removed configuration keys and put in .config file
const config = {
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();
const currentUser = auth.currentUser;

export { db, auth, currentUser, functions };
