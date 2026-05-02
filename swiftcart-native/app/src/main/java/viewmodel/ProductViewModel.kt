package viewmodel

import androidx.compose.runtime.mutableStateListOf
import data.model.Product
import data.repository.ProductRepository

class ProductViewModel(
    private val repository: ProductRepository = ProductRepository()
) {
    private val _products = mutableStateListOf<Product>()
    val products: List<Product> = _products

    fun loadProducts() {
        repository.getProducts(
            onSuccess = { loadedProducts ->
                _products.clear()
                _products.addAll(loadedProducts)
            },
            onError = {
                _products.clear()
            }
        )
    }

    fun getProduct(productId: String): Product? =
        products.firstOrNull { it.id == productId }
}
