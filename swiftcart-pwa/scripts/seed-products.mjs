import { initializeApp } from 'firebase/app';
import {
  doc,
  getFirestore,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJvJmttW7cVfuJ95UlLqm0zgc889PzRmg',
  authDomain: 'huntgry-cafe-apps.firebaseapp.com',
  projectId: 'huntgry-cafe-apps',
  storageBucket: 'huntgry-cafe-apps.appspot.com',
  messagingSenderId: '495352913150',
  appId: '1:495352913150:web:7c209719bbb549cc5c99af',
};

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description:
      'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description:
      'Advanced fitness tracking, heart rate monitoring, and smartphone notifications.',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description:
      'Durable and spacious backpack with padded laptop compartment up to 15 inches.',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 59.99,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    description:
      'Portable speaker with 360-degree sound, waterproof design, and 12-hour playtime.',
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    price: 29.99,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    description:
      'Ergonomic wireless mouse with precision tracking and long battery life.',
  },
  {
    id: 6,
    name: 'USB-C Hub',
    price: 39.99,
    image:
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop',
    description:
      '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
  },
  {
    id: 7,
    name: 'Phone Case',
    price: 19.99,
    image:
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
    description:
      'Protective phone case with shock absorption and slim profile design.',
  },
  {
    id: 8,
    name: 'Desk Lamp',
    price: 44.99,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    description:
      'LED desk lamp with adjustable brightness, color temperature, and USB charging port.',
  },
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const batch = writeBatch(db);

for (const product of products) {
  batch.set(doc(db, 'products', String(product.id)), {
    ...product,
    updatedAt: serverTimestamp(),
  });
}

await batch.commit();

console.log(`Seeded ${products.length} products into Firestore.`);
