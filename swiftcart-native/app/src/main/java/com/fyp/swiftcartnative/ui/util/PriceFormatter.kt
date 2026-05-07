package com.fyp.swiftcartnative.ui.util

import java.util.Locale

fun formatPrice(price: Double): String {
    return String.format(Locale.US, "RM%.2f", price)
}
