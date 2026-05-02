package ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import data.model.Product
import ui.theme.SwiftCartCardElevation
import ui.theme.SwiftCartCardShape
import ui.theme.SwiftCartMuted
import ui.theme.SwiftCartMutedForeground
import ui.theme.SwiftCartPrimary

@Composable
fun ProductCard(
    product: Product,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var imageFailed by remember(product.imageUrl) {
        mutableStateOf(product.imageUrl.isBlank())
    }

    ElevatedCard(
        onClick = onClick,
        modifier = modifier.fillMaxWidth(),
        shape = SwiftCartCardShape,
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = SwiftCartCardElevation)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f)
                .background(SwiftCartMuted),
            contentAlignment = Alignment.Center
        ) {
            AsyncImage(
                model = product.imageUrl.ifBlank { null },
                contentDescription = product.name,
                contentScale = ContentScale.Crop,
                onError = { imageFailed = true },
                onSuccess = { imageFailed = false },
                modifier = Modifier.fillMaxSize()
            )

            if (imageFailed) {
                Text(
                    text = "Image unavailable",
                    color = SwiftCartMutedForeground,
                    fontSize = 13.sp
                )
            }
        }
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                text = product.name,
                style = MaterialTheme.typography.bodyMedium,
                fontSize = 14.sp,
                lineHeight = 18.sp,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier
            )
            Text(
                text = "$%.2f".format(product.price),
                color = SwiftCartPrimary,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.padding(top = 4.dp)
            )
        }
    }
}

