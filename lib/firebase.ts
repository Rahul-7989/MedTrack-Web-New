
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD7Pn4Y79d_zHUvLeiTldqXfSCVNrywSY",
  authDomain: "medtrack-new-861ab.firebaseapp.com",
  projectId: "medtrack-new-861ab",
  storageBucket: "medtrack-new-861ab.firebasestorage.app",
  messagingSenderId: "490566152754",
  appId: "1:490566152754:web:f9c90be1118e652fad022b",
  measurementId: "G-JZ3FT4CG21"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use initializeFirestore to configure networking and cache behavior
// Force long polling to bypass potential proxy/sandbox connectivity issues
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache()
});
