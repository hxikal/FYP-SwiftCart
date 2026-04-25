import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../components/Button';
import { CartItemCard } from '../components/CartItemCard';
import { BottomNav } from '../components/BottomNav';
import { useCart } from '../context/CartContext';
export function CartScreen() {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeFromCart, getTotal } = useCart();
    const total = getTotal();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cart.length === 0) {
        return (_jsxs("div", { className: "min-h-screen bg-background pb-20", children: [_jsx("div", { className: "bg-white border-b border-border", children: _jsx("div", { className: "max-w-md mx-auto px-4 py-3", children: _jsx("h1", { style: { fontSize: '18px', fontWeight: '600' }, children: "Shopping Cart" }) }) }), _jsxs("div", { className: "max-w-md mx-auto flex flex-col items-center justify-center px-4", style: { minHeight: 'calc(100vh - 200px)' }, children: [_jsx("div", { className: "w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6", children: _jsx(ShoppingBag, { size: 40, className: "text-muted-foreground" }) }), _jsx("h2", { className: "mb-2", style: { fontSize: '18px', fontWeight: '600' }, children: "Your cart is empty" }), _jsx("p", { className: "text-muted-foreground text-center mb-6", style: { fontSize: '14px' }, children: "Browse products and add items to your cart" }), _jsx(Button, { onClick: () => navigate('/home'), children: "Start Shopping" })] }), _jsx(BottomNav, {})] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-background pb-20", children: [_jsx("div", { className: "bg-white border-b border-border sticky top-0 z-10", children: _jsxs("div", { className: "max-w-md mx-auto px-4 py-3", children: [_jsx("h1", { style: { fontSize: '18px', fontWeight: '600' }, children: "Shopping Cart" }), _jsxs("p", { className: "text-muted-foreground mt-1", style: { fontSize: '13px' }, children: [itemCount, " ", itemCount === 1 ? 'item' : 'items'] })] }) }), _jsx("div", { className: "max-w-md mx-auto px-4 py-4 space-y-3 mb-32", children: cart.map(item => (_jsx(CartItemCard, { item: item, onUpdateQuantity: updateQuantity, onRemove: removeFromCart }, item.id))) }), _jsx("div", { className: "fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4 shadow-lg", children: _jsxs("div", { className: "max-w-md mx-auto space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-muted-foreground", style: { fontSize: '14px' }, children: ["Subtotal (", itemCount, " ", itemCount === 1 ? 'item' : 'items', ")"] }), _jsxs("span", { style: { fontSize: '16px', fontWeight: '600' }, children: ["$", total.toFixed(2)] })] }), _jsx(Button, { fullWidth: true, onClick: () => navigate('/checkout'), children: "Proceed to Checkout" })] }) }), _jsx(BottomNav, {})] }));
}
