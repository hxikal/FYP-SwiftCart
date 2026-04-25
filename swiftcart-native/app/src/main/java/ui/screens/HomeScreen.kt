package ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import data.model.Product
import ui.components.BottomNav
import ui.components.BottomNavItem
import ui.components.ProductCard
import ui.theme.SwiftCartBackground
import ui.theme.SwiftCartBorder
import ui.theme.SwiftCartBottomNavHeight
import ui.theme.SwiftCartButtonDefaults
import ui.theme.SwiftCartButtonShape
import ui.theme.SwiftCartGridGap
import ui.theme.SwiftCartMuted
import ui.theme.SwiftCartMutedForeground
import ui.theme.SwiftCartRadiusSm
import ui.theme.SwiftCartScreenPadding

@Composable
fun HomeScreen(
    products: List<Product>,
    cartCount: Int,
    onProductClick: (String) -> Unit,
    onCartClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var searchQuery by rememberSaveable { mutableStateOf("") }
    val filteredProducts = products.filter { product ->
        product.name.contains(searchQuery, ignoreCase = true)
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(SwiftCartBackground)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(bottom = SwiftCartBottomNavHeight)
        ) {
            Surface(
                color = Color.White,
                shadowElevation = 0.dp,
                modifier = Modifier
                    .fillMaxWidth()
                    .border(width = 1.dp, color = SwiftCartBorder)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = SwiftCartScreenPadding, vertical = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(SwiftCartGridGap)
                ) {
                    SearchField(
                        value = searchQuery,
                        onValueChange = { searchQuery = it },
                        modifier = Modifier.weight(1f)
                    )
                    FilterButton(onClick = { })
                }
            }

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(horizontal = SwiftCartScreenPadding, vertical = 16.dp)
            ) {
                Text(
                    text = "All Products",
                    style = MaterialTheme.typography.titleMedium,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.SemiBold
                )

                if (filteredProducts.isEmpty()) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .padding(top = 48.dp)
                    ) {
                        Text(
                            text = "No products found",
                            color = SwiftCartMutedForeground,
                            modifier = Modifier.padding(top = 24.dp)
                        )
                    }
                } else {
                    LazyVerticalGrid(
                        columns = GridCells.Fixed(2),
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .padding(top = 16.dp),
                        contentPadding = PaddingValues(bottom = 16.dp),
                        horizontalArrangement = Arrangement.spacedBy(SwiftCartGridGap),
                        verticalArrangement = Arrangement.spacedBy(SwiftCartGridGap)
                    ) {
                        items(filteredProducts, key = { it.id }) { product ->
                            ProductCard(
                                product = product,
                                onClick = { onProductClick(product.id) }
                            )
                        }
                    }
                }
            }
        }

        BottomNav(
            activeItem = BottomNavItem.Home,
            cartCount = cartCount,
            onHomeClick = {},
            onCartClick = onCartClick,
            modifier = Modifier.align(androidx.compose.ui.Alignment.BottomCenter)
        )
    }
}

@Composable
private fun SearchField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    BasicTextField(
        value = value,
        onValueChange = onValueChange,
        singleLine = true,
        textStyle = TextStyle(
            color = Color.Black,
            fontSize = 14.sp,
            lineHeight = 20.sp
        ),
        modifier = modifier
            .heightIn(min = 44.dp)
            .background(SwiftCartMuted, RoundedCornerShape(SwiftCartRadiusSm))
            .padding(horizontal = 12.dp, vertical = 11.dp),
        decorationBox = { innerTextField ->
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                SearchIcon(
                    color = SwiftCartMutedForeground,
                    modifier = Modifier.size(18.dp)
                )
                Box(modifier = Modifier.weight(1f)) {
                    if (value.isEmpty()) {
                        Text(
                            text = "Search products...",
                            color = SwiftCartMutedForeground,
                            fontSize = 14.sp
                        )
                    }
                    innerTextField()
                }
            }
        }
    )
}

@Composable
private fun FilterButton(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Button(
        onClick = onClick,
        colors = SwiftCartButtonDefaults.secondaryColors(),
        contentPadding = PaddingValues(horizontal = 12.dp, vertical = 0.dp),
        modifier = modifier
            .heightIn(min = 44.dp)
            .size(width = 48.dp, height = 44.dp),
        shape = SwiftCartButtonShape,
        elevation = ButtonDefaults.buttonElevation(defaultElevation = 0.dp, pressedElevation = 0.dp)
    ) {
        FilterIcon(color = Color.Black, modifier = Modifier.size(20.dp))
    }
}

@Composable
private fun SearchIcon(
    color: Color,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val stroke = 2.dp.toPx()
        drawCircle(
            color = color,
            radius = size.minDimension * 0.32f,
            center = Offset(size.width * 0.42f, size.height * 0.42f),
            style = Stroke(width = stroke)
        )
        drawLine(
            color = color,
            start = Offset(size.width * 0.64f, size.height * 0.64f),
            end = Offset(size.width * 0.9f, size.height * 0.9f),
            strokeWidth = stroke
        )
    }
}

@Composable
private fun FilterIcon(
    color: Color,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val stroke = 2.dp.toPx()
        val firstY = size.height * 0.25f
        val secondY = size.height * 0.5f
        val thirdY = size.height * 0.75f

        listOf(firstY, secondY, thirdY).forEachIndexed { index, y ->
            drawLine(
                color = color,
                start = Offset(size.width * 0.12f, y),
                end = Offset(size.width * 0.88f, y),
                strokeWidth = stroke
            )
            val knobX = if (index == 1) size.width * 0.65f else size.width * 0.35f
            drawCircle(color = color, radius = 2.4.dp.toPx(), center = Offset(knobX, y))
        }
    }
}

