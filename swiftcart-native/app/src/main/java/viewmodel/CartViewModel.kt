package viewmodel

import androidx.compose.runtime.mutableStateListOf
import data.model.CartItem
import data.model.Product

class CartViewModel {
    private val _items = mutableStateListOf<CartItem>()
    val items: List<CartItem> = _items

    val total: Double
        get() = _items.sumOf { it.subtotal }

    fun addToCart(product: Product) {
        val existingIndex = _items.indexOfFirst { it.product.id == product.id }
        if (existingIndex >= 0) {
            val existing = _items[existingIndex]
            _items[existingIndex] = existing.copy(quantity = existing.quantity + 1)
        } else {
            _items.add(CartItem(product = product, quantity = 1))
        }
    }

    fun updateQuantity(productId: String, quantity: Int) {
        val index = _items.indexOfFirst { it.product.id == productId }
        if (index < 0) return

        if (quantity <= 0) {
            removeFromCart(productId)
        } else {
            _items[index] = _items[index].copy(quantity = quantity)
        }
    }

    fun removeFromCart(productId: String) {
        _items.removeAll { it.product.id == productId }
    }

    fun clearCart() {
        _items.clear()
    }
}

