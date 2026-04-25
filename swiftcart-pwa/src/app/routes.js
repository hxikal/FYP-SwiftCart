import { createBrowserRouter } from 'react-router';
import { SplashScreen } from './pages/SplashScreen';
import { HomeScreen } from './pages/HomeScreen';
import { ProductDetailScreen } from './pages/ProductDetailScreen';
import { CartScreen } from './pages/CartScreen';
import { CheckoutScreen } from './pages/CheckoutScreen';
import { OrderSuccessScreen } from './pages/OrderSuccessScreen';
export const router = createBrowserRouter([
    {
        path: '/',
        Component: SplashScreen,
    },
    {
        path: '/home',
        Component: HomeScreen,
    },
    {
        path: '/product/:id',
        Component: ProductDetailScreen,
    },
    {
        path: '/cart',
        Component: CartScreen,
    },
    {
        path: '/checkout',
        Component: CheckoutScreen,
    },
    {
        path: '/success',
        Component: OrderSuccessScreen,
    },
]);
