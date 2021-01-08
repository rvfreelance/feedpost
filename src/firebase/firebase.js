import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmT8-UTyZfWA04tAqE6QP79F0I5yNJ_PY",
    authDomain: "feeds-db.firebaseapp.com",
    projectId: "feeds-db",
    storageBucket: "feeds-db.appspot.com",
    messagingSenderId: "169093208633",
    appId: "1:169093208633:web:e97e2738567bf32b39cbe8"
  };



  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestoreTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const createUserProfileDocument = async (userAuth, additionalData) =>{
  if(!userAuth) return;

  const userRef = firestore.doc(`feeders/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const { displayName, email, uid } = userAuth;
    const joined = firestoreTimestamp;
    
    // console.log('firebase-userauth:', userAuth)
    try{
      await userRef.set({
        'name': displayName,
        'org': null,
        uid,
        joined,
        'lovebytes': [],
        email,

      })
    }catch(error){
      console.log(error);
    }
  }
  return userRef;
}


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle =() => auth.signInWithPopup(provider);

export default firebase;