
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// /lite

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKKSJaWyfzgx1a8vCMoU0Jrdc39Jiw5Eg",
    authDomain: "whatsapp-clone-1263e.firebaseapp.com",
    projectId: "whatsapp-clone-1263e",
    storageBucket: "whatsapp-clone-1263e.appspot.com",
    messagingSenderId: "463525924740",
    appId: "1:463525924740:web:cc90ee1331102dc4fed7d1",
    measurementId: "G-7LNRG9JZ6L"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();  
//   const firebaseApp = firebase.initializeApp(firebaseConfig);
//   const db = firebaseApp.firestore();
//   const auth = firebase.auth();
//   const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db ;
//   export default firebaseApp ;