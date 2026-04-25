package data.repository

import data.model.Product

class ProductRepository {
    fun getProducts(): List<Product> = listOf(
        Product(
            id = "apple",
            name = "Fresh Apple",
            description = "Crisp red apples for daily groceries.",
            price = 2.5,
            imageUrl = "apple",
            category = "Fruits",
            stock = 24
        ),
        Product(
            id = "milk",
            name = "Milk",
            description = "One litre dairy milk.",
            price = 4.8,
            imageUrl = "milk",
            category = "Dairy",
            stock = 12
        ),
        Product(
            id = "bread",
            name = "Bread",
            description = "Soft sandwich bread loaf.",
            price = 3.2,
            imageUrl = "bread",
            category = "Bakery",
            stock = 18
        )
    )
}
