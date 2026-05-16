import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../components/Button';
import { CartItemCard } from '../components/CartItemCard';
import { BottomNav } from '../components/BottomNav';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
export function CartScreen() {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeFromCart, getTotal } = useCart();
    const total = getTotal();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cart.length === 0) {
        return (_jsxs("div", { className: "min-h-screen bg-background pb-28", children: [_jsx("div", { className: "android-stable-surface border-b border-border", children: _jsx("div", { className: "max-w-md mx-auto px-4 py-3", children: _jsx("h1", { style: { fontSize: '18px', fontWeight: '700' }, children: "Shopping Cart" }) }) }), _jsxs("div", { className: "max-w-md mx-auto flex flex-col items-center justify-center px-4", style: { minHeight: 'calc(100vh - 220px)' }, children: [_jsx("div", { className: "android-stable-card mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-secondary", children: _jsx(ShoppingBag, { size: 40, className: "text-muted-foreground" }) }), _jsx("h2", { className: "mb-2", style: { fontSize: '20px', fontWeight: '800' }, children: "Your cart is empty" }), _jsx("p", { className: "text-muted-foreground text-center mb-6", style: { fontSize: '14px' }, children: "Browse products and add items to your cart" }), _jsx(Button, { onClick: () => navigate('/home'), children: "Start Shopping" })] }), _jsx(BottomNav, {})] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-background pb-36", children: [_jsx("div", { className: "bg-[var(--brand-gradient)] text-white", children: _jsxs("div", { className: "max-w-md mx-auto px-4 py-4", children: [_jsx("h1", { style: { fontSize: '22px', fontWeight: '800' }, children: "Shopping Cart" }), _jsxs("p", { className: "mt-1 text-white/80", style: { fontSize: '13px' }, children: [itemCount, " ", itemCount === 1 ? 'item' : 'items'] })] }) }), _jsx("div", { className: "max-w-md mx-auto px-4 py-5 space-y-3 mb-40", children: cart.map(item => (_jsx(CartItemCard, { item: item, onUpdateQuantity: updateQuantity, onRemove: removeFromCart }, item.id))) }), _jsx("div", { className: "fixed bottom-24 left-0 right-0 px-4", children: _jsxs("div", { className: "android-stable-fixed max-w-md mx-auto space-y-3 rounded-3xl border border-border p-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-muted-foreground", style: { fontSize: '14px' }, children: ["Subtotal (", itemCount, " ", itemCount === 1 ? 'item' : 'items', ")"] }), _jsx("span", { style: { fontSize: '18px', fontWeight: '800' }, children: formatPrice(total) })] }), _jsx(Button, { fullWidth: true, onClick: () => navigate('/checkout'), children: "Proceed to Checkout" })] }) }), _jsx(BottomNav, {})] }));
}
