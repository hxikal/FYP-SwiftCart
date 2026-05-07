package com.fyp.swiftcartnative.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.RadioButton
import androidx.compose.material3.RadioButtonDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.fyp.swiftcartnative.data.model.CartItem
import com.fyp.swiftcartnative.ui.theme.SwiftCartBackground
import com.fyp.swiftcartnative.ui.theme.SwiftCartBorder
import com.fyp.swiftcartnative.ui.theme.SwiftCartButtonDefaults
import com.fyp.swiftcartnative.ui.theme.SwiftCartButtonShape
import com.fyp.swiftcartnative.ui.theme.SwiftCartCardElevation
import com.fyp.swiftcartnative.ui.theme.SwiftCartCardShape
import com.fyp.swiftcartnative.ui.theme.SwiftCartMuted
import com.fyp.swiftcartnative.ui.theme.SwiftCartMutedForeground
import com.fyp.swiftcartnative.ui.theme.SwiftCartPrimary
import com.fyp.swiftcartnative.ui.theme.SwiftCartRadiusSm
import com.fyp.swiftcartnative.ui.theme.SwiftCartScreenPadding
import com.fyp.swiftcartnative.ui.theme.SwiftCartSectionPadding
import com.fyp.swiftcartnative.ui.util.formatPrice

@Composable
fun CheckoutScreen(
    items: List<CartItem>,
    total: Double,
    onPlaceOrder: () -> Unit,
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    val shipping = 5.99
    val tax = total * 0.08
    val finalTotal = total + shipping + tax

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(SwiftCartBackground)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            CheckoutHeader(onBack = onBack)

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .verticalScroll(rememberScrollState())
                    .padding(horizontal = SwiftCartScreenPadding, vertical = SwiftCartSectionPadding)
                    .padding(bottom = 112.dp)
                    .windowInsetsPadding(WindowInsets.navigationBars.only(WindowInsetsSides.Bottom)),
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                if (items.isEmpty()) {
                    Text(
                        text = "Your cart is empty",
                        color = SwiftCartMutedForeground,
                        fontSize = 14.sp
                    )
                } else {
                    OrderSummaryCard(
                        items = items,
                        subtotal = total,
                        shipping = shipping,
                        tax = tax,
                        finalTotal = finalTotal
                    )
                    PaymentMethodCard()
                    ShippingAddressCard()
                }
            }
        }

        if (items.isNotEmpty()) {
            Surface(
                color = Color.White,
                shadowElevation = 8.dp,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth()
                    .navigationBarsPadding()
                    .border(width = 1.dp, color = SwiftCartBorder)
            ) {
                Button(
                    onClick = onPlaceOrder,
                    colors = SwiftCartButtonDefaults.primaryColors(),
                    shape = SwiftCartButtonShape,
                    elevation = SwiftCartButtonDefaults.flatElevation(),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(SwiftCartScreenPadding)
                        .height(52.dp)
                ) {
                    Text(
                        text = "Confirm Order - ${formatPrice(finalTotal)}",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}

@Composable
private fun CheckoutHeader(
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        color = Color.White,
        modifier = modifier
            .fillMaxWidth()
            .border(width = 1.dp, color = SwiftCartBorder)
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            TextButton(
                onClick = onBack,
                shape = RoundedCornerShape(SwiftCartRadiusSm),
                modifier = Modifier.size(width = 48.dp, height = 40.dp)
            ) {
                Text(text = "<", color = Color.Black, fontSize = 20.sp)
            }
            Text(
                text = "Checkout",
                color = Color.Black,
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold
            )
        }
    }
}

@Composable
private fun OrderSummaryCard(
    items: List<CartItem>,
    subtotal: Double,
    shipping: Double,
    tax: Double,
    finalTotal: Double,
    modifier: Modifier = Modifier
) {
    CheckoutCard(modifier = modifier) {
        Text(
            text = "Order Summary",
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black
        )
        Spacer(modifier = Modifier.height(16.dp))

        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items.forEach { item ->
                CheckoutItemRow(item = item)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(SwiftCartBorder)
        )
        Spacer(modifier = Modifier.height(16.dp))

        PriceRow(label = "Subtotal", value = formatPrice(subtotal))
        PriceRow(label = "Shipping", value = formatPrice(shipping))
        PriceRow(label = "Tax (8%)", value = formatPrice(tax))

        Spacer(modifier = Modifier.height(8.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(SwiftCartBorder)
        )
        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = "Total", color = Color.Black, fontSize = 16.sp, fontWeight = FontWeight.Bold)
            Text(
                text = formatPrice(finalTotal),
                color = SwiftCartPrimary,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
private fun CheckoutItemRow(
    item: CartItem,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.Top
    ) {
        CheckoutProductThumbnail(item = item)
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = item.product.name,
                color = Color.Black,
                fontSize = 14.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = "Qty: ${item.quantity}",
                color = SwiftCartMutedForeground,
                fontSize = 13.sp,
                modifier = Modifier.padding(top = 4.dp)
            )
        }
        Text(
            text = formatPrice(item.subtotal),
            color = Color.Black,
            fontSize = 14.sp,
            fontWeight = FontWeight.SemiBold
        )
    }
}

@Composable
private fun CheckoutProductThumbnail(
    item: CartItem,
    modifier: Modifier = Modifier
) {
    var imageFailed by remember(item.product.imageUrl) {
        mutableStateOf(item.product.imageUrl.isBlank())
    }
    val shape = RoundedCornerShape(SwiftCartRadiusSm)

    Box(
        modifier = modifier
            .size(80.dp)
            .clip(shape)
            .background(SwiftCartMuted),
        contentAlignment = Alignment.Center
    ) {
        AsyncImage(
            model = item.product.imageUrl.ifBlank { null },
            contentDescription = item.product.name,
            contentScale = ContentScale.Crop,
            onError = { imageFailed = true },
            onSuccess = { imageFailed = false },
            modifier = Modifier.matchParentSize()
        )

        if (imageFailed) {
            Text(
                text = "Image unavailable",
                color = SwiftCartMutedForeground,
                fontSize = 10.sp
            )
        }
    }
}

@Composable
private fun PriceRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, color = SwiftCartMutedForeground, fontSize = 14.sp)
        Text(text = value, color = Color.Black, fontSize = 14.sp)
    }
}

@Composable
private fun PaymentMethodCard(modifier: Modifier = Modifier) {
    CheckoutCard(modifier = modifier) {
        Text(
            text = "Payment Method",
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black
        )
        Spacer(modifier = Modifier.height(16.dp))
        PaymentOption(text = "Credit / Debit Card", selected = true)
        Spacer(modifier = Modifier.height(8.dp))
        PaymentOption(text = "Cash on Delivery", selected = false)
    }
}

@Composable
private fun PaymentOption(text: String, selected: Boolean) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .border(width = 1.dp, color = SwiftCartBorder, shape = RoundedCornerShape(SwiftCartRadiusSm))
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        RadioButton(
            selected = selected,
            onClick = null,
            colors = RadioButtonDefaults.colors(selectedColor = SwiftCartPrimary)
        )
        Text(text = text, color = Color.Black, fontSize = 14.sp)
    }
}

@Composable
private fun ShippingAddressCard(modifier: Modifier = Modifier) {
    CheckoutCard(modifier = modifier) {
        Text(
            text = "Shipping Address",
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = "John Doe\n123 Main Street, Apt 4B\nNew York, NY 10001\nUnited States\n\nPhone: +1 (555) 123-4567",
            color = SwiftCartMutedForeground,
            fontSize = 14.sp,
            lineHeight = 22.sp
        )
    }
}

@Composable
private fun CheckoutCard(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit
) {
    ElevatedCard(
        modifier = modifier.fillMaxWidth(),
        shape = SwiftCartCardShape,
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = SwiftCartCardElevation)
    ) {
        Column(modifier = Modifier.padding(16.dp), content = content)
    }
}

