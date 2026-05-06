import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
export function OrderSuccessScreen() {
    const navigate = useNavigate();
    useEffect(() => {
        // Trigger confetti animation
        const duration = 2000;
        const end = Date.now() + duration;
        const colors = ['#2563eb', '#3b82f6', '#60a5fa'];
        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4", children: _jsxs("div", { className: "max-w-md w-full text-center", children: [_jsx(motion.div, { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 0.5
                    }, className: "mb-6", children: _jsx("div", { className: "w-24 h-24 bg-secondary rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-[var(--card-shadow)]", children: _jsx(CheckCircle, { size: 60, className: "text-primary" }) }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.5 }, children: [_jsx("h1", { className: "mb-3", style: { fontSize: '28px', fontWeight: '800', lineHeight: '34px' }, children: "Order Placed Successfully!" }), _jsx("p", { className: "text-muted-foreground mb-8", style: { fontSize: '15px', lineHeight: '1.6' }, children: "Thank you for your purchase. Your order has been confirmed and will be shipped soon." }), _jsxs("div", { className: "bg-white rounded-3xl border border-border p-6 shadow-[var(--card-shadow)] mb-8 text-left", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-muted-foreground", style: { fontSize: '14px' }, children: "Order Number" }), _jsxs("span", { style: { fontSize: '14px', fontWeight: '600' }, children: ["#ORD-", Math.random().toString(36).substring(2, 8).toUpperCase()] })] }), _jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-muted-foreground", style: { fontSize: '14px' }, children: "Estimated Delivery" }), _jsx("span", { style: { fontSize: '14px', fontWeight: '600' }, children: "3-5 Business Days" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-muted-foreground", style: { fontSize: '14px' }, children: "Status" }), _jsx("span", { className: "text-primary", style: { fontSize: '14px', fontWeight: '600' }, children: "Processing" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { fullWidth: true, onClick: () => navigate('/home'), children: "Continue Shopping" }), _jsx(Button, { fullWidth: true, variant: "secondary", onClick: () => navigate('/home'), children: "View Order History" })] })] })] }) }));
}
