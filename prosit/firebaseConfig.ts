// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBDSXT3q8RNglgYI_HHyAPy9tCELMusGcI",
//   authDomain: "prosit-f962c.firebaseapp.com",
//   projectId: "prosit-f962c",
//   storageBucket: "prosit-f962c.firebasestorage.app",
//   messagingSenderId: "194666337917",
//   appId: "1:194666337917:web:f38ed67dfa961afd36c314",
//   measurementId: "G-RV5E9Q9FTW",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBDSXT3q8RNglgYI_HHyAPy9tCELMusGcI",
//   authDomain: "prosit-f962c.firebaseapp.com",
//   projectId: "prosit-f962c",
//   storageBucket: "prosit-f962c.firebasestorage.app",
//   messagingSenderId: "194666337917",
//   appId: "1:194666337917:web:f38ed67dfa961afd36c314",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// firebaseConfig.js
// firebaseConfig.js

// import { initializeApp, getApps } from "firebase/app";
// import {
//   initializeAuth,
//   getReactNativePersistence,
//   getAuth,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBDSXT3q8RNglgYI_HHyAPy9tCELMusGcI",
//   authDomain: "prosit-f962c.firebaseapp.com",
//   projectId: "prosit-f962c",
//   storageBucket: "prosit-f962c.appspot.com",
//   messagingSenderId: "194666337917",
//   appId: "1:194666337917:web:f38ed67dfa961afd36c314",
// };

// // Initialize Firebase app (check if already initialized to avoid errors)
// let app;
// if (getApps().length === 0) {
//   app = initializeApp(firebaseConfig);
// } else {
//   app = getApps()[0];
// }

// // Initialize Auth with AsyncStorage persistence for React Native
// let auth;
// try {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// } catch (error: any) {
//   // If auth is already initialized, get the existing instance
//   if (error.code === "auth/already-initialized") {
//     auth = getAuth(app);
//   } else {
//     throw error;
//   }
// }

// const db = getFirestore(app);

// export { auth, db };
// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDSXT3q8RNglgYI_HHyAPy9tCELMusGcI",
  authDomain: "prosit-f962c.firebaseapp.com",
  projectId: "prosit-f962c",
  storageBucket: "prosit-f962c.appspot.com",
  messagingSenderId: "194666337917",
  appId: "1:194666337917:web:f38ed67dfa961afd36c314",
};

// Initialize app (avoid duplicate init)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth (simple approach that works with any Firebase version)
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export for use in screens
export { auth, db };
