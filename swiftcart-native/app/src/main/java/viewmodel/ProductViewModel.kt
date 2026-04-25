package viewmodel

import data.model.Product
import data.repository.ProductRepository

class ProductViewModel(
    private val repository: ProductRepository = ProductRepository()
) {
    val products: List<Product> = repository.getProducts()

    fun getProduct(productId: String): Product? =
        products.firstOrNull { it.id == productId }
}

