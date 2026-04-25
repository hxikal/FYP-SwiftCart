package ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import data.model.CartItem
import ui.components.BottomNav
import ui.components.BottomNavItem
import ui.components.CartItemCard
import ui.theme.SwiftCartBackground
import ui.theme.SwiftCartBorder
import ui.theme.SwiftCartBottomNavHeight
import ui.theme.SwiftCartButtonDefaults
import ui.theme.SwiftCartButtonShape
import ui.theme.SwiftCartMuted
import ui.theme.SwiftCartMutedForeground
import ui.theme.SwiftCartPrimary
import ui.theme.SwiftCartScreenPadding

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
                        bottom = 232.dp
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
        color = Color.White,
        modifier = modifier
            .fillMaxWidth()
            .border(width = 1.dp, color = SwiftCartBorder)
    ) {
        Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)) {
            Text(
                text = "Shopping Cart",
                style = MaterialTheme.typography.titleMedium,
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.Black
            )
            if (itemCount > 0) {
                Text(
                    text = "$itemCount ${if (itemCount == 1) "item" else "items"}",
                    color = SwiftCartMutedForeground,
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
            .padding(bottom = SwiftCartBottomNavHeight),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            modifier = Modifier
                .size(96.dp)
                .background(SwiftCartMuted, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "Bag", color = SwiftCartMutedForeground, fontSize = 18.sp)
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
            fontSize = 14.sp
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = onStartShopping,
            colors = SwiftCartButtonDefaults.primaryColors(),
            shape = SwiftCartButtonShape,
            elevation = SwiftCartButtonDefaults.flatElevation()
        ) {
            Text("Start Shopping")
        }
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
            .fillMaxWidth()
            .border(width = 1.dp, color = SwiftCartBorder)
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
                    text = "$%.2f".format(total),
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

