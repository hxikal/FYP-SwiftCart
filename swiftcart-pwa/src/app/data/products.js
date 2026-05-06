import { collection, doc, getDoc, getDocs, limit, query, where, } from 'firebase/firestore';
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
    if (productSnap.exists()) {
        return mapProduct(productSnap.id, productSnap.data());
    }
    const numericId = Number(id);
    const lookupQueries = Number.isNaN(numericId)
        ? [query(productsCollection, where('id', '==', id), limit(1))]
        : [
            query(productsCollection, where('id', '==', numericId), limit(1)),
            query(productsCollection, where('id', '==', id), limit(1)),
        ];
    for (const productQuery of lookupQueries) {
        const snapshot = await getDocs(productQuery);
        const matchedProduct = snapshot.docs[0];
        if (matchedProduct) {
            return mapProduct(matchedProduct.id, matchedProduct.data());
        }
    }
    return null;
}
