package ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import data.model.CartItem
import ui.theme.SwiftCartCardElevation
import ui.theme.SwiftCartCardShape
import ui.theme.SwiftCartDestructive
import ui.theme.SwiftCartMuted
import ui.theme.SwiftCartMutedForeground
import ui.theme.SwiftCartPrimary
import ui.theme.SwiftCartRadiusSm

@Composable
fun CartItemCard(
    item: CartItem,
    onQuantityChange: (Int) -> Unit,
    onRemove: () -> Unit,
    modifier: Modifier = Modifier
) {
    ElevatedCard(
        modifier = modifier.fillMaxWidth(),
        shape = SwiftCartCardShape,
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = SwiftCartCardElevation)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .background(SwiftCartMuted, RoundedCornerShape(8.dp)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = item.product.imageUrl.ifBlank { "Image" },
                    color = SwiftCartMutedForeground,
                    fontSize = 11.sp
                )
            }

            Column(
                modifier = Modifier
                    .weight(1f)
                    .height(80.dp)
            ) {
                Text(
                    text = item.product.name,
                    fontSize = 14.sp,
                    lineHeight = 18.sp,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    color = Color.Black
                )
                Text(
                    text = "$%.2f".format(item.product.price),
                    color = SwiftCartPrimary,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.padding(top = 4.dp)
                )

                Spacer(modifier = Modifier.weight(1f))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    QuantityControls(
                        quantity = item.quantity,
                        onDecrease = { onQuantityChange(item.quantity - 1) },
                        onIncrease = { onQuantityChange(item.quantity + 1) }
                    )
                    IconButton(
                        onClick = onRemove,
                        modifier = Modifier
                            .size(36.dp)
                            .background(SwiftCartDestructive.copy(alpha = 0.1f), RoundedCornerShape(SwiftCartRadiusSm))
                    ) {
                        TrashIcon(color = SwiftCartDestructive, modifier = Modifier.size(18.dp))
                    }
                }
            }
        }
    }
}

@Composable
private fun TrashIcon(
    color: Color,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val stroke = 1.8.dp.toPx()
        drawLine(color, Offset(size.width * 0.25f, size.height * 0.28f), Offset(size.width * 0.75f, size.height * 0.28f), stroke)
        drawLine(color, Offset(size.width * 0.42f, size.height * 0.16f), Offset(size.width * 0.58f, size.height * 0.16f), stroke)
        drawLine(color, Offset(size.width * 0.36f, size.height * 0.28f), Offset(size.width * 0.4f, size.height * 0.82f), stroke)
        drawLine(color, Offset(size.width * 0.64f, size.height * 0.28f), Offset(size.width * 0.6f, size.height * 0.82f), stroke)
        drawLine(color, Offset(size.width * 0.4f, size.height * 0.82f), Offset(size.width * 0.6f, size.height * 0.82f), stroke)
        drawLine(color, Offset(size.width * 0.48f, size.height * 0.4f), Offset(size.width * 0.48f, size.height * 0.7f), stroke)
        drawLine(color, Offset(size.width * 0.56f, size.height * 0.4f), Offset(size.width * 0.56f, size.height * 0.7f), stroke)
    }
}

@Composable
private fun QuantityControls(
    quantity: Int,
    onDecrease: () -> Unit,
    onIncrease: () -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier.background(SwiftCartMuted, RoundedCornerShape(SwiftCartRadiusSm)),
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(onClick = onDecrease, modifier = Modifier.size(34.dp)) {
            Text(text = "-", fontSize = 18.sp, color = Color.Black)
        }
        Text(
            text = quantity.toString(),
            fontSize = 14.sp,
            fontWeight = FontWeight.Medium,
            color = Color.Black,
            modifier = Modifier.width(32.dp),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
        IconButton(onClick = onIncrease, modifier = Modifier.size(34.dp)) {
            Text(text = "+", fontSize = 18.sp, color = Color.Black)
        }
    }
}
