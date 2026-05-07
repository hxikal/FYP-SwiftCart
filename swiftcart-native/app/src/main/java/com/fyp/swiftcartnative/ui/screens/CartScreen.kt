package com.fyp.swiftcartnative.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.WindowInsetsSides
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.only
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fyp.swiftcartnative.data.model.CartItem
import com.fyp.swiftcartnative.ui.components.BottomNav
import com.fyp.swiftcartnative.ui.components.BottomNavItem
import com.fyp.swiftcartnative.ui.components.CartItemCard
import com.fyp.swiftcartnative.ui.theme.SwiftCartBackground
import com.fyp.swiftcartnative.ui.theme.SwiftCartBorder
import com.fyp.swiftcartnative.ui.theme.SwiftCartBottomNavHeight
import com.fyp.swiftcartnative.ui.theme.SwiftCartButtonDefaults
import com.fyp.swiftcartnative.ui.theme.SwiftCartButtonShape
import com.fyp.swiftcartnative.ui.theme.SwiftCartButtonHeight
import com.fyp.swiftcartnative.ui.theme.SwiftCartMuted
import com.fyp.swiftcartnative.ui.theme.SwiftCartMutedForeground
import com.fyp.swiftcartnative.ui.theme.SwiftCartPrimary
import com.fyp.swiftcartnative.ui.theme.SwiftCartPrimaryDark
import com.fyp.swiftcartnative.ui.theme.SwiftCartPrimaryLight
import com.fyp.swiftcartnative.ui.theme.SwiftCartScreenPadding
import com.fyp.swiftcartnative.ui.theme.SwiftCartSoftBlue
import com.fyp.swiftcartnative.ui.util.formatPrice

@Composable
fun CartScreen(
    items: List<CartItem>,
    total: Double,
    onQuantityChange: (String, Int) -> Unit,
    onRemoveItem: (String) -> Unit,
    onCheckoutClick: () -> Unit,
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    val itemCount = items.sumOf { it.quantity }
    val navigationBarPadding = WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(SwiftCartBackground)
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            CartHeader(itemCount = itemCount)

            if (items.isEmpty()) {
                EmptyCartState(onStartShopping = onBack)
            } else {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    contentPadding = androidx.compose.foundation.layout.PaddingValues(
                        start = SwiftCartScreenPadding,
                        top = 16.dp,
                        end = SwiftCartScreenPadding,
                        bottom = 232.dp + navigationBarPadding
                    ),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(items, key = { it.product.id }) { item ->
                        CartItemCard(
                            item = item,
                            onQuantityChange = { quantity ->
                                onQuantityChange(item.product.id, quantity)
                            },
                            onRemove = { onRemoveItem(item.product.id) }
                        )
                    }
                }
            }
        }

        if (items.isNotEmpty()) {
            CartSummaryBar(
                itemCount = itemCount,
                total = total,
                onCheckoutClick = onCheckoutClick,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = SwiftCartBottomNavHeight)
                    .windowInsetsPadding(WindowInsets.navigationBars.only(WindowInsetsSides.Bottom))
            )
        }

        BottomNav(
            activeItem = BottomNavItem.Cart,
            cartCount = itemCount,
            onHomeClick = onBack,
            onCartClick = {},
            modifier = Modifier.align(Alignment.BottomCenter)
        )
    }
}

@Composable
private fun CartHeader(
    itemCount: Int,
    modifier: Modifier = Modifier
) {
    Surface(
        color = Color.Transparent,
        modifier = modifier
            .fillMaxWidth()
            .background(Brush.horizontalGradient(listOf(SwiftCartPrimaryDark, SwiftCartPrimary, SwiftCartPrimaryLight)))
    ) {
        Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)) {
            Text(
                text = "Shopping Cart",
                style = MaterialTheme.typography.titleMedium,
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            if (itemCount > 0) {
                Text(
                    text = "$itemCount ${if (itemCount == 1) "item" else "items"}",
                    color = Color.White.copy(alpha = 0.82f),
                    fontSize = 13.sp,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }
    }
}

@Composable
private fun EmptyCartState(
    onStartShopping: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = SwiftCartScreenPadding)
            .padding(bottom = SwiftCartBottomNavHeight)
            .windowInsetsPadding(WindowInsets.navigationBars.only(WindowInsetsSides.Bottom)),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(96.dp)
                .background(SwiftCartSoftBlue, RoundedCornerShape(28.dp)),
            contentAlignment = Alignment.Center
        ) {
            ShoppingBagIcon(
                color = SwiftCartMutedForeground,
                modifier = Modifier.size(40.dp)
            )
        }
        Spacer(modifier = Modifier.height(24.dp))
        Text(
            text = "Your cart is empty",
            fontSize = 18.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Browse products and add items to your cart",
            color = SwiftCartMutedForeground,
            fontSize = 14.sp,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = onStartShopping,
            colors = SwiftCartButtonDefaults.primaryColors(),
            shape = SwiftCartButtonShape,
            elevation = SwiftCartButtonDefaults.flatElevation(),
            contentPadding = PaddingValues(horizontal = 24.dp, vertical = 0.dp),
            modifier = Modifier.height(SwiftCartButtonHeight)
        ) {
            Text("Start Shopping")
        }
    }
}

@Composable
private fun ShoppingBagIcon(
    color: Color,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val stroke = 2.4.dp.toPx()
        val corner = 4.dp.toPx()
        val left = size.width * 0.2f
        val top = size.height * 0.34f
        val right = size.width * 0.8f
        val bottom = size.height * 0.86f

        drawRoundRect(
            color = color,
            topLeft = Offset(left, top),
            size = androidx.compose.ui.geometry.Size(right - left, bottom - top),
            cornerRadius = androidx.compose.ui.geometry.CornerRadius(corner, corner),
            style = Stroke(width = stroke)
        )
        drawArc(
            color = color,
            startAngle = 200f,
            sweepAngle = 140f,
            useCenter = false,
            topLeft = Offset(size.width * 0.34f, size.height * 0.12f),
            size = androidx.compose.ui.geometry.Size(size.width * 0.32f, size.height * 0.38f),
            style = Stroke(width = stroke)
        )
    }
}

@Composable
private fun CartSummaryBar(
    itemCount: Int,
    total: Double,
    onCheckoutClick: () -> Unit,
    modifier: Modifier = Modifier
) {
        Surface(
            color = Color.White,
            shadowElevation = 8.dp,
            modifier = modifier
                .padding(start = 16.dp, end = 16.dp, bottom = 12.dp)
                .fillMaxWidth()
                .border(width = 1.dp, color = SwiftCartBorder, shape = RoundedCornerShape(24.dp))
        ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Subtotal ($itemCount ${if (itemCount == 1) "item" else "items"})",
                    color = SwiftCartMutedForeground,
                    fontSize = 14.sp
                )
                Text(
                    text = formatPrice(total),
                    color = Color.Black,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }
            Spacer(modifier = Modifier.height(12.dp))
            Button(
                onClick = onCheckoutClick,
                colors = SwiftCartButtonDefaults.primaryColors(),
                shape = SwiftCartButtonShape,
                elevation = SwiftCartButtonDefaults.flatElevation(),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp)
            ) {
                Text(text = "Proceed to Checkout", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

