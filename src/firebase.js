import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyB3aTYMmsd0SmWokhW-OJ60cQsgpFZMy7E",
  authDomain: "my-shop-40ed8.firebaseapp.com",
  databaseURL: "https://my-shop-40ed8.firebaseio.com",
  projectId: "my-shop-40ed8",
  storageBucket: "my-shop-40ed8.appspot.com",
  messagingSenderId: "765149375487",
  appId: "1:765149375487:web:0bae4fce750cfe8d8f95ca",
  measurementId: "G-YGN4J2JCDF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;