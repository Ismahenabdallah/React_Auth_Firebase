import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
//import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyAVyc1zDvkk_1eFPpeND3MgHfMD8Cvdez8",
  authDomain: "reactauthentification-44d03.firebaseapp.com",
  projectId: "reactauthentification-44d03",
  storageBucket: "reactauthentification-44d03.appspot.com",
  messagingSenderId: "589348520967",
  appId: "1:589348520967:web:06a3d4136306ee611496a2",
  measurementId: "G-EQJCYJZ0ZF"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
