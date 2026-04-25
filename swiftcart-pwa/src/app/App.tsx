import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { router } from './routes';

export default function App() {
  return (
    <CartProvider>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </div>
    </CartProvider>
  );
}