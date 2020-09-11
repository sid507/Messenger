import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyClyjql23x45aT_JSUYxMiZ7b48LcZ5lok",
    authDomain: "whatsapp-clone-1c961.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-1c961.firebaseio.com",
    projectId: "whatsapp-clone-1c961",
    storageBucket: "whatsapp-clone-1c961.appspot.com",
    messagingSenderId: "1050676969845",
    appId: "1:1050676969845:web:726111da7cb017d787933c",
    measurementId: "G-S5MDQE9W27"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;