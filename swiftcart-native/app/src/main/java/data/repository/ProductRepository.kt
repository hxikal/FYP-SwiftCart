package data.repository

import com.google.firebase.firestore.FirebaseFirestore
import data.model.Product

class ProductRepository {
    private val firestore = FirebaseFirestore.getInstance()

    fun getProducts(
        onSuccess: (List<Product>) -> Unit,
        onError: (Exception) -> Unit
    ) {
        firestore.collection(PRODUCTS_COLLECTION)
            .get()
            .addOnSuccessListener { snapshot ->
                val products = snapshot.documents.map { document ->
                    Product(
                        id = document.id,
                        name = document.getString(FIELD_NAME).orEmpty(),
                        description = document.getString(FIELD_DESCRIPTION).orEmpty(),
                        price = document.getDouble(FIELD_PRICE) ?: 0.0,
                        imageUrl = document.getString(FIELD_IMAGE).orEmpty(),
                        category = "",
                        stock = 0
                    )
                }
                onSuccess(products)
            }
            .addOnFailureListener { exception ->
                onError(exception)
            }
    }

    private companion object {
        const val PRODUCTS_COLLECTION = "products"
        const val FIELD_NAME = "name"
        const val FIELD_DESCRIPTION = "description"
        const val FIELD_PRICE = "price"
        const val FIELD_IMAGE = "image"
    }
}
