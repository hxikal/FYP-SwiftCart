package navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import ui.screens.CartScreen
import ui.screens.CheckoutScreen
import ui.screens.HomeScreen
import ui.screens.OrderSuccessScreen
import ui.screens.ProductDetailScreen
import ui.screens.SplashScreen
import viewmodel.CartViewModel
import viewmodel.ProductViewModel

sealed interface SwiftCartRoute {
    data object Splash : SwiftCartRoute
    data object Home : SwiftCartRoute
    data class ProductDetail(val productId: String) : SwiftCartRoute
    data object Cart : SwiftCartRoute
    data object Checkout : SwiftCartRoute
    data object OrderSuccess : SwiftCartRoute
}

@Composable
fun NavGraph(
    productViewModel: ProductViewModel = remember { ProductViewModel() },
    cartViewModel: CartViewModel = remember { CartViewModel() }
) {
    var route: SwiftCartRoute by remember { mutableStateOf(SwiftCartRoute.Splash) }
    val navigateHomeAndClearBackStack = {
        route = SwiftCartRoute.Home
    }

    when (val currentRoute = route) {
        SwiftCartRoute.Splash -> SplashScreen(
            onContinue = { route = SwiftCartRoute.Home }
        )

        SwiftCartRoute.Home -> HomeScreen(
            products = productViewModel.products,
            cartCount = cartViewModel.items.sumOf { it.quantity },
            onProductClick = { productId -> route = SwiftCartRoute.ProductDetail(productId) },
            onCartClick = { route = SwiftCartRoute.Cart }
        )

        is SwiftCartRoute.ProductDetail -> ProductDetailScreen(
            product = productViewModel.getProduct(currentRoute.productId),
            onAddToCart = { product ->
                cartViewModel.addToCart(product)
                route = SwiftCartRoute.Cart
            },
            onBack = { route = SwiftCartRoute.Home }
        )

        SwiftCartRoute.Cart -> CartScreen(
            items = cartViewModel.items,
            total = cartViewModel.total,
            onQuantityChange = cartViewModel::updateQuantity,
            onRemoveItem = cartViewModel::removeFromCart,
            onCheckoutClick = { route = SwiftCartRoute.Checkout },
            onBack = { route = SwiftCartRoute.Home }
        )

        SwiftCartRoute.Checkout -> CheckoutScreen(
            items = cartViewModel.items,
            total = cartViewModel.total,
            onPlaceOrder = {
                cartViewModel.clearCart()
                route = SwiftCartRoute.OrderSuccess
            },
            onBack = { route = SwiftCartRoute.Cart }
        )

        SwiftCartRoute.OrderSuccess -> OrderSuccessScreen(
            onContinueShopping = navigateHomeAndClearBackStack
        )
    }
}

