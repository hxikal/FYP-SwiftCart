import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { motion } from 'motion/react';
export function CheckoutScreen() {
    const navigate = useNavigate();
    const { cart, getTotal, clearCart } = useCart();
    const total = getTotal();
    const shipping = 5.99;
    const tax = total * 0.08;
    const finalTotal = total + shipping + tax;
    const handleConfirmOrder = () => {
        clearCart();
        navigate('/success');
    };
    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }
    return (_jsxs("div", { className: "min-h-screen bg-background pb-32", children: [_jsx("div", { className: "android-stable-surface sticky top-0 z-10", children: _jsxs("div", { className: "max-w-md mx-auto px-4 py-3 flex items-center gap-3", children: [_jsx("button", { onClick: () => navigate(-1), className: "rounded-2xl bg-white p-2 shadow-sm transition-colors hover:bg-muted", "aria-label": "Go back", children: _jsx(ArrowLeft, { size: 20 }) }), _jsx("h1", { style: { fontSize: '18px', fontWeight: '700' }, children: "Checkout" })] }) }), _jsx("div", { className: "max-w-md mx-auto px-4 py-5 space-y-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "android-disable-touch-transform space-y-4", children: [_jsxs("section", { className: "android-stable-card rounded-3xl border border-border p-4", children: [_jsx("h2", { className: "mb-4", style: { fontSize: '17px', fontWeight: '800' }, children: "Order Summary" }), _jsx("div", { className: "space-y-3 mb-4", children: cart.map(item => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "android-media-frame w-20 h-20 rounded-2xl flex-shrink-0", children: _jsx("img", { src: item.image, alt: item.name, className: "android-media-img", loading: "lazy", decoding: "async", onError: (event) => {
                                                        event.currentTarget.style.display = 'none';
                                                    } }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "truncate mb-1", style: { fontSize: '14px', fontWeight: 700 }, children: item.name }), _jsxs("p", { className: "text-muted-foreground", style: { fontSize: '13px' }, children: ["Qty: ", item.quantity] })] }), _jsx("p", { style: { fontSize: '14px', fontWeight: '700' }, children: formatPrice(item.price * item.quantity) })] }, item.id))) }), _jsxs("div", { className: "border-t border-border pt-4 space-y-2", children: [_jsx(PriceLine, { label: "Subtotal", value: formatPrice(total) }), _jsx(PriceLine, { label: "Shipping", value: formatPrice(shipping) }), _jsx(PriceLine, { label: "Tax (8%)", value: formatPrice(tax) }), _jsxs("div", { className: "flex justify-between pt-3 border-t border-border", style: { fontSize: '17px', fontWeight: '800' }, children: [_jsx("span", { children: "Total" }), _jsx("span", { className: "text-primary", children: formatPrice(finalTotal) })] })] })] }), _jsxs("section", { className: "android-stable-card rounded-3xl border border-border p-4", children: [_jsxs("div", { className: "mb-4 flex items-center gap-2", children: [_jsx(CreditCard, { size: 18, className: "text-primary" }), _jsx("h2", { style: { fontSize: '16px', fontWeight: '800' }, children: "Payment Method" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center gap-3 p-3 border border-primary/20 bg-secondary rounded-2xl cursor-pointer", children: [_jsx("input", { type: "radio", name: "payment", defaultChecked: true, className: "w-4 h-4 text-primary" }), _jsx("span", { style: { fontSize: '14px', fontWeight: 600 }, children: "Credit / Debit Card" })] }), _jsxs("label", { className: "flex items-center gap-3 p-3 border border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors", children: [_jsx("input", { type: "radio", name: "payment", className: "w-4 h-4 text-primary" }), _jsx("span", { style: { fontSize: '14px' }, children: "Cash on Delivery" })] })] })] }), _jsxs("section", { className: "android-stable-card rounded-3xl border border-border p-4", children: [_jsxs("div", { className: "mb-4 flex items-center gap-2", children: [_jsx(MapPin, { size: 18, className: "text-primary" }), _jsx("h2", { style: { fontSize: '16px', fontWeight: '800' }, children: "Shipping Address" })] }), _jsxs("div", { className: "text-muted-foreground", style: { fontSize: '14px', lineHeight: '1.7' }, children: [_jsx("p", { children: "John Doe" }), _jsx("p", { children: "123 Main Street, Apt 4B" }), _jsx("p", { children: "New York, NY 10001" }), _jsx("p", { children: "United States" }), _jsx("p", { className: "mt-2", children: "Phone: +1 (555) 123-4567" })] })] })] }) }), _jsx("div", { className: "android-stable-fixed fixed bottom-0 left-0 right-0 border-t border-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Button, { fullWidth: true, onClick: handleConfirmOrder, children: ["Confirm Order - ", formatPrice(finalTotal)] }) }) })] }));
}
function PriceLine({ label, value }) {
    return (_jsxs("div", { className: "flex justify-between", style: { fontSize: '14px' }, children: [_jsx("span", { className: "text-muted-foreground", children: label }), _jsx("span", { children: value })] }));
}
