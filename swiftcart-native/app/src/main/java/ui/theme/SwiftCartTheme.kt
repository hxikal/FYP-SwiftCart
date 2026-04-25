package ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val SwiftCartPrimary = Color(0xFF2563EB)
val SwiftCartSuccess = Color(0xFF16A34A)
val SwiftCartBackground = Color(0xFFFFFFFF)
val SwiftCartForeground = Color(0xFF030213)
val SwiftCartMuted = Color(0xFFECECF0)
val SwiftCartMutedForeground = Color(0xFF717182)
val SwiftCartBorder = Color(0x1A000000)
val SwiftCartDestructive = Color(0xFFD4183D)

val SwiftCartScreenPadding = 16.dp
val SwiftCartSectionPadding = 24.dp
val SwiftCartGridGap = 12.dp
val SwiftCartButtonHeight = 48.dp
val SwiftCartBottomNavHeight = 64.dp
val SwiftCartRadiusSm = 8.dp
val SwiftCartRadiusMd = 10.dp
val SwiftCartRadiusLg = 12.dp
val SwiftCartCardElevation = 1.dp

val SwiftCartButtonShape = RoundedCornerShape(SwiftCartRadiusSm)
val SwiftCartCardShape = RoundedCornerShape(SwiftCartRadiusLg)

object SwiftCartButtonDefaults {
    @Composable
    fun primaryColors() = ButtonDefaults.buttonColors(
        containerColor = SwiftCartPrimary,
        contentColor = Color.White
    )

    @Composable
    fun secondaryColors() = ButtonDefaults.buttonColors(
        containerColor = SwiftCartMuted,
        contentColor = SwiftCartForeground
    )

    @Composable
    fun flatElevation() = ButtonDefaults.buttonElevation(
        defaultElevation = 0.dp,
        pressedElevation = 0.dp,
        focusedElevation = 0.dp,
        hoveredElevation = 0.dp
    )
}
