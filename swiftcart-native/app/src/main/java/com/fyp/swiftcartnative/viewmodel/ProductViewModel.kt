package com.fyp.swiftcartnative.viewmodel

import android.content.Context
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.fyp.swiftcartnative.data.model.Product
import com.fyp.swiftcartnative.data.repository.ProductRepository

class ProductViewModel(
    context: Context
) {
    private val repository = ProductRepository(context)
    private val _products = mutableStateListOf<Product>()
    val products: List<Product> = _products
    var isLoading by mutableStateOf(false)
        private set
    var errorMessage by mutableStateOf<String?>(null)
        private set
    var isFromCache by mutableStateOf(false)
        private set

    fun loadProducts() {
        isLoading = true
        errorMessage = null
        repository.getProducts(
            onSuccess = { loadedProducts, fromCache ->
                _products.clear()
                _products.addAll(loadedProducts)
                isFromCache = fromCache
                isLoading = false
            },
            onError = { exception ->
                _products.clear()
                isFromCache = false
                errorMessage = exception.message ?: "Unable to load products."
                isLoading = false
            }
        )
    }

    fun getProduct(productId: String): Product? =
        products.firstOrNull { it.id == productId }
}
