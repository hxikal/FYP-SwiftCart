package com.fyp.swiftcartnative.data.repository

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Source
import com.fyp.swiftcartnative.data.local.AppDatabase
import com.fyp.swiftcartnative.data.local.toEntity
import com.fyp.swiftcartnative.data.local.toProduct
import com.fyp.swiftcartnative.data.model.Product
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ProductRepository(context: Context) {
    private val firestore = FirebaseFirestore.getInstance()
    private val productDao = AppDatabase.getInstance(context).productDao()
    private val appContext = context.applicationContext

    fun getProducts(
        onSuccess: (products: List<Product>, fromCache: Boolean) -> Unit,
        onError: (Exception) -> Unit
    ) {
        if (!isOnline()) {
            loadProductsFromRoom(onSuccess, onError)
            return
        }

        firestore.collection(PRODUCTS_COLLECTION)
            .get(Source.SERVER)
            .addOnSuccessListener { snapshot ->
                val products = snapshot.documents.map { document ->
                    Product(
                        id = document.id,
                        name = document.getString(FIELD_NAME).orEmpty(),
                        description = document.getString(FIELD_DESCRIPTION).orEmpty(),
                        price = document.getDouble(FIELD_PRICE) ?: 0.0,
                        imageUrl = document.getString(FIELD_IMAGE)
                            ?: document.getString(FIELD_IMAGE_URL).orEmpty(),
                        category = document.getString(FIELD_CATEGORY).orEmpty(),
                        stock = document.getLong(FIELD_STOCK)?.toInt() ?: 0
                    )
                }

                CoroutineScope(Dispatchers.IO).launch {
                    runCatching {
                        productDao.clearProducts()
                        productDao.insertProducts(products.map { it.toEntity() })
                    }.onSuccess {
                        withContext(Dispatchers.Main) {
                            onSuccess(products, false)
                        }
                    }.onFailure {
                        withContext(Dispatchers.Main) {
                            onSuccess(products, false)
                        }
                    }
                }
            }
            .addOnFailureListener { exception ->
                loadProductsFromRoom(onSuccess, onError, exception)
            }
    }

    private fun loadProductsFromRoom(
        onSuccess: (products: List<Product>, fromCache: Boolean) -> Unit,
        onError: (Exception) -> Unit,
        originalException: Exception? = null
    ) {
        CoroutineScope(Dispatchers.IO).launch {
            runCatching { productDao.getAllProducts().map { it.toProduct() } }
                .onSuccess { cachedProducts ->
                    withContext(Dispatchers.Main) {
                        if (cachedProducts.isNotEmpty()) {
                            onSuccess(cachedProducts, true)
                        } else {
                            onError(originalException ?: IllegalStateException("No cached products available."))
                        }
                    }
                }
                .onFailure { cacheException ->
                    withContext(Dispatchers.Main) {
                        onError(originalException ?: Exception(cacheException))
                    }
                }
        }
    }

    private fun isOnline(): Boolean {
        val connectivityManager = appContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return false
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return false
        return capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private companion object {
        const val PRODUCTS_COLLECTION = "products"
        const val FIELD_NAME = "name"
        const val FIELD_DESCRIPTION = "description"
        const val FIELD_PRICE = "price"
        const val FIELD_IMAGE = "image"
        const val FIELD_IMAGE_URL = "imageUrl"
        const val FIELD_CATEGORY = "category"
        const val FIELD_STOCK = "stock"
    }
}
