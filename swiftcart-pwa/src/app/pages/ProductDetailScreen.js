import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { motion } from 'motion/react';
import { toast } from 'sonner';
export function ProductDetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        let isMounted = true;
        async function loadProduct() {
            if (!id) {
                setIsLoading(false);
                setError('Product not found');
                return;
            }
            try {
                setIsLoading(true);
                setError('');
                const firebaseProduct = await getProductById(id);
                if (isMounted) {
                    setProduct(firebaseProduct);
                }
            }
            catch (err) {
                console.error('Failed to load product:', err);
                if (isMounted) {
                    setError('Failed to load product');
                }
            }
            finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        loadProduct();
        return () => {
            isMounted = false;
        };
    }, [id]);
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsx("p", { className: "text-muted-foreground", children: "Loading product..." }) }));
    }
    if (!product) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", children: _jsxs("div", { className: "android-stable-card rounded-3xl border border-border p-6 text-center", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: error || 'Product not found' }), _jsx(Button, { onClick: () => navigate('/home'), children: "Back to Home" })] }) }));
    }
    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Added to cart', {
            description: product.name,
            duration: 2000,
        });
    };
    const features = [
        'High quality materials and construction',
        'Fast and reliable shipping',
        '30-day money-back guarantee',
        'Customer support available 24/7',
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background pb-28", children: [_jsx("div", { className: "android-stable-surface sticky top-0 z-10", children: _jsxs("div", { className: "max-w-md mx-auto px-4 py-3 flex items-center gap-3", children: [_jsx("button", { onClick: () => navigate(-1), className: "rounded-2xl bg-white p-2 shadow-sm transition-colors hover:bg-muted", "aria-label": "Go back", children: _jsx(ArrowLeft, { size: 20 }) }), _jsx("h1", { style: { fontSize: '18px', fontWeight: '700' }, children: "Product Details" })] }) }), _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("div", { className: "android-media-frame mx-4 mt-2 aspect-square rounded-[28px] shadow-[var(--card-shadow)]", children: _jsx("img", { src: product.image, alt: product.name, className: "android-media-img", decoding: "async", onError: (event) => {
                                event.currentTarget.style.display = 'none';
                            } }) }), _jsx("div", { className: "p-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "android-disable-touch-transform", children: [_jsxs("div", { className: "android-stable-card rounded-3xl border border-border p-5", children: [_jsx("p", { className: "mb-2 text-muted-foreground", style: { fontSize: '12px', fontWeight: 700 }, children: "PRODUCT DETAIL" }), _jsx("h2", { style: { fontSize: '24px', fontWeight: '800', lineHeight: '31px' }, children: product.name }), _jsx("p", { className: "mt-3 text-primary", style: { fontSize: '30px', fontWeight: '800' }, children: formatPrice(product.price) })] }), _jsxs("div", { className: "android-stable-card mt-4 rounded-3xl border border-border p-5", children: [_jsx("h3", { className: "mb-2", style: { fontSize: '16px', fontWeight: '700' }, children: "Description" }), _jsx("p", { className: "text-muted-foreground leading-relaxed", style: { fontSize: '14px' }, children: product.description })] }), _jsxs("div", { className: "android-stable-card mt-4 rounded-3xl border border-border p-5", children: [_jsx("h3", { className: "mb-3", style: { fontSize: '16px', fontWeight: '700' }, children: "Features" }), _jsx("ul", { className: "space-y-3 text-muted-foreground", style: { fontSize: '14px' }, children: features.map((feature) => (_jsxs("li", { className: "flex items-start gap-3", children: [_jsx("span", { className: "mt-1.5 h-2 w-2 rounded-full bg-primary" }), _jsx("span", { children: feature })] }, feature))) })] })] }) }), _jsx("div", { className: "android-stable-fixed fixed bottom-0 left-0 right-0 border-t border-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Button, { fullWidth: true, onClick: handleAddToCart, className: "flex items-center justify-center gap-2", children: [_jsx(ShoppingCart, { size: 20 }), "Add to Cart"] }) }) })] })] }));
}
