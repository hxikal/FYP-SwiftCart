import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
export function SplashScreen() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (_jsxs("div", { className: "h-screen flex flex-col items-center justify-center bg-[var(--brand-gradient)]", children: [_jsxs(motion.div, { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5, ease: "easeOut" }, className: "flex flex-col items-center", children: [_jsx("div", { className: "w-24 h-24 bg-white rounded-[28px] flex items-center justify-center mb-6 shadow-2xl", children: _jsx(ShoppingBag, { size: 48, className: "text-primary" }) }), _jsx(motion.h1, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.5 }, className: "text-white mb-2", style: { fontSize: '32px', fontWeight: '700' }, children: "SwiftCart" }), _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 0.9 }, transition: { delay: 0.5, duration: 0.5 }, className: "text-white/90", style: { fontSize: '14px' }, children: "Premium shopping companion" })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8, duration: 0.5 }, className: "absolute bottom-12", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-white/60 rounded-full animate-pulse", style: { animationDelay: '0ms' } }), _jsx("div", { className: "w-2 h-2 bg-white/60 rounded-full animate-pulse", style: { animationDelay: '150ms' } }), _jsx("div", { className: "w-2 h-2 bg-white/60 rounded-full animate-pulse", style: { animationDelay: '300ms' } })] }) })] }));
}
