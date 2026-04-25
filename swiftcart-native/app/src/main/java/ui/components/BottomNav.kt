package ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import ui.theme.SwiftCartBorder
import ui.theme.SwiftCartBottomNavHeight
import ui.theme.SwiftCartDestructive
import ui.theme.SwiftCartMutedForeground
import ui.theme.SwiftCartPrimary

@Composable
fun BottomNav(
    activeItem: BottomNavItem,
    cartCount: Int,
    onHomeClick: () -> Unit,
    onCartClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .height(SwiftCartBottomNavHeight)
            .background(Color.White)
            .border(width = 1.dp, color = SwiftCartBorder)
    ) {
        BottomNavTab(
            label = "Home",
            icon = "⌂",
            selected = activeItem == BottomNavItem.Home,
            onClick = onHomeClick,
            modifier = Modifier.weight(1f)
        )
        BottomNavTab(
            label = "Cart",
            icon = "Cart",
            selected = activeItem == BottomNavItem.Cart,
            badgeCount = cartCount,
            onClick = onCartClick,
            modifier = Modifier.weight(1f)
        )
    }
}

enum class BottomNavItem {
    Home,
    Cart
}

@Composable
private fun BottomNavTab(
    label: String,
    icon: String,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    badgeCount: Int = 0
) {
    val color = if (selected) SwiftCartPrimary else SwiftCartMutedForeground

    Column(
        modifier = modifier
            .height(SwiftCartBottomNavHeight)
            .clickable(onClick = onClick),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(contentAlignment = Alignment.TopEnd) {
            Text(
                text = icon,
                color = color,
                fontSize = if (icon.length > 1) 13.sp else 24.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.align(Alignment.Center)
            )
            if (badgeCount > 0) {
                Box(
                    modifier = Modifier
                        .offset(x = 14.dp, y = (-2).dp)
                        .size(20.dp)
                        .background(SwiftCartDestructive, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = badgeCount.toString(),
                        color = Color.White,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
        Text(text = label, color = color, fontSize = 12.sp, modifier = Modifier)
    }
}
