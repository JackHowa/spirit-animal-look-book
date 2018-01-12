import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDhHfKjgb1isNNmnobNUQjd0Mo4vNNWnsc",
  authDomain: "spirit-animals-9867d.firebaseapp.com",
  databaseURL: "https://spirit-animals-9867d.firebaseio.com",
  projectId: "spirit-animals-9867d",
  storageBucket: "spirit-animals-9867d.appspot.com",
  messagingSenderId: "414157047056"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
