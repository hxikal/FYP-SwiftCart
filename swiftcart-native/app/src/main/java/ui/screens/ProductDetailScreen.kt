package ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
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
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import data.model.Product
import ui.theme.SwiftCartBackground
import ui.theme.SwiftCartBorder
import ui.theme.SwiftCartButtonDefaults
import ui.theme.SwiftCartButtonShape
import ui.theme.SwiftCartMuted
import ui.theme.SwiftCartMutedForeground
import ui.theme.SwiftCartPrimary
import ui.theme.SwiftCartRadiusSm
import ui.theme.SwiftCartScreenPadding
import ui.theme.SwiftCartSectionPadding
import ui.theme.SwiftCartSoftBlue
import ui.util.formatPrice

@Composable
fun ProductDetailScreen(
    product: Product?,
    onAddToCart: (Product) -> Unit,
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(SwiftCartBackground)
    ) {
        if (product == null) {
            ProductNotFound(onBack = onBack)
        } else {
            Column(modifier = Modifier.fillMaxSize()) {
                ProductDetailHeader(onBack = onBack)

                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .verticalScroll(rememberScrollState())
                        .padding(bottom = 96.dp)
                ) {
                    ProductImage(product = product)
                    ProductInfo(product = product)
                }
            }

            Surface(
                color = Color.White,
                shadowElevation = 8.dp,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .fillMaxWidth()
                    .border(width = 1.dp, color = SwiftCartBorder)
            ) {
                Button(
                    onClick = { onAddToCart(product) },
                    colors = SwiftCartButtonDefaults.primaryColors(),
                    shape = SwiftCartButtonShape,
                    elevation = SwiftCartButtonDefaults.flatElevation(),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(SwiftCartScreenPadding)
                        .height(52.dp)
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        CartLineIcon(color = Color.White, modifier = Modifier.size(20.dp))
                        Text(text = "Add to Cart", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
                    }
                }
            }
        }
    }
}

@Composable
private fun ProductDetailHeader(
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
                text = "Product Details",
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.Black
            )
        }
    }
}

@Composable
private fun ProductImage(
    product: Product,
    modifier: Modifier = Modifier
) {
    var imageFailed by remember(product.imageUrl) {
        mutableStateOf(product.imageUrl.isBlank())
    }

    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = SwiftCartScreenPadding, vertical = 12.dp)
            .height(320.dp)
            .clip(RoundedCornerShape(28.dp))
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
                fontSize = 16.sp
            )
        }
    }
}

@Composable
private fun ProductInfo(
    product: Product,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(SwiftCartSectionPadding)
    ) {
        Text(
            text = product.name,
            style = MaterialTheme.typography.headlineSmall,
            fontSize = 24.sp,
            lineHeight = 32.sp,
            fontWeight = FontWeight.Bold,
            color = Color.Black
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = formatPrice(product.price),
            color = SwiftCartPrimary,
            fontSize = 28.sp,
            lineHeight = 34.sp,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "Description",
            fontSize = 16.sp,
            lineHeight = 24.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = product.description,
            color = SwiftCartMutedForeground,
            fontSize = 14.sp,
            lineHeight = 22.sp
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = "Features",
            fontSize = 16.sp,
            lineHeight = 24.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black
        )
        Spacer(modifier = Modifier.height(8.dp))
        FeatureText("High quality materials and construction")
        FeatureText("Fast and reliable shipping")
        FeatureText("30-day money-back guarantee")
        FeatureText("Customer support available 24/7")
    }
}

@Composable
private fun FeatureText(text: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Box(
            modifier = Modifier
                .padding(top = 7.dp)
                .size(8.dp)
                .background(SwiftCartPrimary, RoundedCornerShape(50))
        )
        Text(
            text = text,
            color = SwiftCartMutedForeground,
            fontSize = 14.sp,
            lineHeight = 20.sp
        )
    }
}

@Composable
private fun ProductNotFound(
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "Product not found", color = SwiftCartMutedForeground)
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = onBack,
            colors = SwiftCartButtonDefaults.primaryColors(),
            shape = SwiftCartButtonShape,
            elevation = SwiftCartButtonDefaults.flatElevation()
        ) {
            Text("Back to Home")
        }
    }
}

@Composable
private fun CartLineIcon(
    color: Color,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val stroke = 2.dp.toPx()
        drawLine(color, Offset(size.width * 0.18f, size.height * 0.2f), Offset(size.width * 0.3f, size.height * 0.2f), stroke)
        drawLine(color, Offset(size.width * 0.3f, size.height * 0.2f), Offset(size.width * 0.42f, size.height * 0.62f), stroke)
        drawLine(color, Offset(size.width * 0.42f, size.height * 0.62f), Offset(size.width * 0.82f, size.height * 0.62f), stroke)
        drawLine(color, Offset(size.width * 0.36f, size.height * 0.34f), Offset(size.width * 0.86f, size.height * 0.34f), stroke)
        drawLine(color, Offset(size.width * 0.86f, size.height * 0.34f), Offset(size.width * 0.78f, size.height * 0.62f), stroke)
        drawCircle(color, radius = 2.2.dp.toPx(), center = Offset(size.width * 0.48f, size.height * 0.78f), style = Stroke(stroke))
        drawCircle(color, radius = 2.2.dp.toPx(), center = Offset(size.width * 0.76f, size.height * 0.78f), style = Stroke(stroke))
    }
}

