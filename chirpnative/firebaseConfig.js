import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_Mnl3dug92q5BCzR1HC9y8twhxhRAPI0",
  authDomain: "chirp-3e947.firebaseapp.com",
  projectId: "chirp-3e947",
  storageBucket: "chirp-3e947.appspot.com",
  messagingSenderId: "997262997735",
  appId: "1:997262997735:web:ca94640420c7499a748a42",
  measurementId: "G-GXPNT1BY39"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  
export default firebase;