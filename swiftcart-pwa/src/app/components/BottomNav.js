import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Home, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
export function BottomNav() {
    const location = useLocation();
    const { cart } = useCart();
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const isActive = (path) => location.pathname === path;
    return (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-border", children: _jsxs("div", { className: "max-w-md mx-auto flex", children: [_jsxs(Link, { to: "/", className: `flex-1 flex flex-col items-center justify-center py-3 transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`, children: [_jsx(Home, { size: 24 }), _jsx("span", { className: "mt-1", style: { fontSize: '12px' }, children: "Home" })] }), _jsxs(Link, { to: "/cart", className: `flex-1 flex flex-col items-center justify-center py-3 transition-colors relative ${isActive('/cart') ? 'text-primary' : 'text-muted-foreground'}`, children: [_jsx(ShoppingCart, { size: 24 }), cartCount > 0 && (_jsx("span", { className: "absolute top-2 right-1/2 translate-x-3 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center", style: { fontSize: '11px' }, children: cartCount })), _jsx("span", { className: "mt-1", style: { fontSize: '12px' }, children: "Cart" })] })] }) }));
}
