import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
const productsCollection = collection(db, 'products');
function mapProduct(id, data) {
    return {
        id,
        name: String(data.name ?? ''),
        price: Number(data.price ?? 0),
        image: String(data.image ?? ''),
        description: String(data.description ?? ''),
    };
}
export async function getProducts() {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((productDoc) => mapProduct(productDoc.id, productDoc.data()));
}
export async function getProductById(id) {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    if (!productSnap.exists()) {
        return null;
    }
    return mapProduct(productSnap.id, productSnap.data());
}
