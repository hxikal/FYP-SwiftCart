package ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

val SwiftCartPrimary = Color(0xFF2563EB)
val SwiftCartPrimaryDark = Color(0xFF1D4ED8)
val SwiftCartPrimaryLight = Color(0xFF60A5FA)
val SwiftCartSuccess = Color(0xFF16A34A)
val SwiftCartBackground = Color(0xFFF7F9FC)
val SwiftCartForeground = Color(0xFF111827)
val SwiftCartMuted = Color(0xFFECECF0)
val SwiftCartSoftBlue = Color(0xFFEEF4FF)
val SwiftCartMutedForeground = Color(0xFF64748B)
val SwiftCartBorder = Color(0x14111827)
val SwiftCartDestructive = Color(0xFFDC2626)

val SwiftCartScreenPadding = 16.dp
val SwiftCartSectionPadding = 24.dp
val SwiftCartGridGap = 12.dp
val SwiftCartButtonHeight = 48.dp
val SwiftCartBottomNavHeight = 64.dp
val SwiftCartRadiusSm = 8.dp
val SwiftCartRadiusMd = 10.dp
val SwiftCartRadiusLg = 16.dp
val SwiftCartRadiusXl = 24.dp
val SwiftCartCardElevation = 4.dp

val SwiftCartButtonShape = RoundedCornerShape(SwiftCartRadiusSm)
val SwiftCartCardShape = RoundedCornerShape(SwiftCartRadiusXl)

object SwiftCartButtonDefaults {
    @Composable
    fun primaryColors() = ButtonDefaults.buttonColors(
        containerColor = SwiftCartPrimary,
        contentColor = Color.White
    )

    @Composable
    fun secondaryColors() = ButtonDefaults.buttonColors(
        containerColor = SwiftCartSoftBlue,
        contentColor = SwiftCartPrimary
    )

    @Composable
    fun flatElevation() = ButtonDefaults.buttonElevation(
        defaultElevation = 0.dp,
        pressedElevation = 0.dp,
        focusedElevation = 0.dp,
        hoveredElevation = 0.dp
    )
}
