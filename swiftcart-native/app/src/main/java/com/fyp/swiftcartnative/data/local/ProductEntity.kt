package com.fyp.swiftcartnative.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.fyp.swiftcartnative.data.model.Product

@Entity(tableName = "products")
data class ProductEntity(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val price: Double,
    val imageUrl: String = "",
    val category: String = "",
    val stock: Int = 0
)

fun ProductEntity.toProduct(): Product =
    Product(
        id = id,
        name = name,
        description = description,
        price = price,
        imageUrl = imageUrl,
        category = category,
        stock = stock
    )

fun Product.toEntity(): ProductEntity =
    ProductEntity(
        id = id,
        name = name,
        description = description,
        price = price,
        imageUrl = imageUrl,
        category = category,
        stock = stock
    )
