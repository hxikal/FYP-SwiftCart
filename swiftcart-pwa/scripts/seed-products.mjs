import { initializeApp } from 'firebase/app';
import {
  doc,
  getFirestore,
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

const productsById = {
  9: {
    name: 'Anker Soundcore Life Q30 Wireless Headphones',
    price: 329.99,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Comfortable Bluetooth headphones with hybrid noise cancellation, long battery life, and clear audio for commuting or study sessions.',
    category: 'electronics',
  },
  10: {
    name: 'Xiaomi Redmi Watch 4',
    price: 459.99,
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Large-display smartwatch with fitness tracking, heart-rate monitoring, sleep insights, and phone notifications.',
    category: 'electronics',
  },
  11: {
    name: 'Tomtoc 15.6-inch Laptop Backpack',
    price: 189.99,
    imageUrl:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Water-resistant backpack with padded laptop storage, organised pockets, and comfortable straps for daily travel.',
    category: 'travel',
  },
  12: {
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    price: 499.99,
    imageUrl:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Compact waterproof speaker with punchy sound, durable build quality, and all-day playback for indoor or outdoor use.',
    category: 'electronics',
  },
  13: {
    name: 'Logitech Pebble M350 Wireless Mouse',
    price: 89.99,
    imageUrl:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Slim silent-click wireless mouse with smooth tracking, compact portability, and long battery life.',
    category: 'workspace',
  },
  14: {
    name: 'UGREEN 7-in-1 USB-C Hub',
    price: 159.99,
    imageUrl:
      'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Multiport USB-C hub with HDMI, USB-A, SD card slots, and power delivery for laptops and tablets.',
    category: 'workspace',
  },
  15: {
    name: 'Spigen Liquid Air iPhone Case',
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Lightweight protective phone case with textured grip, raised edges, and everyday shock absorption.',
    category: 'accessories',
  },
  16: {
    name: 'Baseus Rechargeable LED Desk Lamp',
    price: 129.99,
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Adjustable LED desk lamp with touch controls, multiple brightness levels, and a clean minimalist profile.',
    category: 'workspace',
  },
  17: {
    name: 'Sony WH-CH520 Wireless On-Ear Headphones',
    price: 249.99,
    imageUrl:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Lightweight wireless headphones with balanced sound, fast pairing, and reliable battery life for daily listening.',
    category: 'electronics',
  },
  18: {
    name: 'Bellroy Tech Kit Organiser',
    price: 239.99,
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Compact organiser for cables, chargers, earbuds, and small accessories, ideal for keeping work bags tidy.',
    category: 'accessories',
  },
  19: {
    name: 'Hydro Flask 21oz Standard Mouth Bottle',
    price: 169.99,
    imageUrl:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Insulated stainless steel bottle that keeps drinks cold or warm for hours during classes, work, or travel.',
    category: 'lifestyle',
  },
  20: {
    name: 'Orbitkey Leather Key Organiser',
    price: 159.99,
    imageUrl:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Premium leather key organiser designed to reduce pocket bulk, prevent key scratches, and keep essentials neat.',
    category: 'accessories',
  },
  21: {
    name: 'Targus CityGear Laptop Sleeve 14-inch',
    price: 99.99,
    imageUrl:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Slim padded laptop sleeve with a soft interior lining and lightweight protection for daily carry.',
    category: 'workspace',
  },
  22: {
    name: 'American Tourister Curio Spinner 55cm',
    price: 499.99,
    imageUrl:
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Cabin-size hard-shell luggage with smooth spinner wheels, secure locking, and practical packing space.',
    category: 'travel',
  },
  23: {
    name: 'IKEA LAGKAPTEN Desk Mat',
    price: 49.99,
    imageUrl:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=800&fit=crop&auto=format&q=80',
    description:
      'Large desk mat that creates a smooth writing and mouse surface while protecting your workspace from scratches.',
    category: 'workspace',
  },
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const batch = writeBatch(db);

for (const [id, productData] of Object.entries(productsById)) {
  batch.set(doc(db, 'products', id), productData, { merge: false });
}

await batch.commit();

console.log(
  `Seeded ${Object.keys(productsById).length} products into Firestore.`
);
