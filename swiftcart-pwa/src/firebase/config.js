import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCJvJmttW7cVfuJ95UlLqm0zgc889PzRmg",
    authDomain: "huntgry-cafe-apps.firebaseapp.com",
    projectId: "huntgry-cafe-apps",
    storageBucket: "huntgry-cafe-apps.appspot.com",
    messagingSenderId: "495352913150",
    appId: "1:495352913150:web:7c209719bbb549cc5c99af"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
