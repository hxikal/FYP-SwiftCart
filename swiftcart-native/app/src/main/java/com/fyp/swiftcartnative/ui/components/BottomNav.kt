package com.fyp.swiftcartnative.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fyp.swiftcartnative.ui.theme.SwiftCartBorder
import com.fyp.swiftcartnative.ui.theme.SwiftCartBottomNavHeight
import com.fyp.swiftcartnative.ui.theme.SwiftCartDestructive
import com.fyp.swiftcartnative.ui.theme.SwiftCartMutedForeground
import com.fyp.swiftcartnative.ui.theme.SwiftCartPrimary
import com.fyp.swiftcartnative.ui.theme.SwiftCartSoftBlue

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
            .navigationBarsPadding()
            .padding(horizontal = 16.dp, vertical = 12.dp)
            .height(SwiftCartBottomNavHeight)
            .background(Color.White, RoundedCornerShape(28.dp))
            .border(width = 1.dp, color = SwiftCartBorder, shape = RoundedCornerShape(28.dp))
            .padding(8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        BottomNavTab(
            label = "Home",
            selected = activeItem == BottomNavItem.Home,
            onClick = onHomeClick,
            modifier = Modifier.weight(1f)
        )
        BottomNavTab(
            label = "Cart",
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
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    badgeCount: Int = 0
) {
    val color = if (selected) SwiftCartPrimary else SwiftCartMutedForeground

    Row(
        modifier = modifier
            .height(48.dp)
            .background(
                color = if (selected) SwiftCartSoftBlue else Color.Transparent,
                shape = RoundedCornerShape(18.dp)
            )
            .clickable(onClick = onClick),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(contentAlignment = Alignment.TopEnd) {
            Text(
                text = label,
                color = color,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold
            )
            if (badgeCount > 0) {
                Box(
                    modifier = Modifier
                        .offset(x = 18.dp, y = (-10).dp)
                        .size(20.dp)
                        .background(SwiftCartDestructive, RoundedCornerShape(50)),
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
    }
}
