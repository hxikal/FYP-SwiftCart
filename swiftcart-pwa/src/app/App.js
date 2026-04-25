import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { router } from './routes';
export default function App() {
    return (_jsx(CartProvider, { children: _jsxs("div", { className: "max-w-md mx-auto bg-white min-h-screen", children: [_jsx(RouterProvider, { router: router }), _jsx(Toaster, { position: "top-center" })] }) }));
}
