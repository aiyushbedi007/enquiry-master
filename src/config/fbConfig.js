import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var config = {
  apiKey: "AIzaSyA_nNVV_Fk7ZZ9wqk4F3UK9lRbTRGqTD7A",
  authDomain: "enquiry-test-007.firebaseapp.com",
  projectId: "enquiry-test-007",
  storageBucket: "enquiry-test-007.appspot.com",
  messagingSenderId: "20787462834",
  appId: "1:20787462834:web:44304a5670fb1ed6a83fab",
  measurementId: "G-5S3PCDL061"
};
// Initialize Firebase
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 