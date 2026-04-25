import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJvJmttW7cVfuJ95UlLqm0zgc889PzRmg',
  authDomain: 'huntgry-cafe-apps.firebaseapp.com',
  projectId: 'huntgry-cafe-apps',
  storageBucket: 'huntgry-cafe-apps.appspot.com',
  messagingSenderId: '495352913150',
  appId: '1:495352913150:web:7c209719bbb549cc5c99af',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const snapshot = await getDocs(collection(db, 'products'));

console.log(`Found ${snapshot.size} products in Firestore.`);
for (const productDoc of snapshot.docs) {
  const data = productDoc.data();
  console.log(`${productDoc.id}: ${data.name}`);
}
