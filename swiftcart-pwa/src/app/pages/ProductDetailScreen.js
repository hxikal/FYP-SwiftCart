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
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("p", { className: "text-muted-foreground", children: "Loading product..." }) }));
    }
    if (!product) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: error || 'Product not found' }), _jsx(Button, { onClick: () => navigate('/home'), children: "Back to Home" })] }) }));
    }
    const handleAddToCart = () => {
        addToCart(product);
        toast.success('Added to cart', {
            description: product.name,
            duration: 2000,
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx("div", { className: "bg-white border-b border-border sticky top-0 z-10", children: _jsxs("div", { className: "max-w-md mx-auto px-4 py-3 flex items-center gap-3", children: [_jsx("button", { onClick: () => navigate(-1), className: "p-2 hover:bg-muted rounded-lg transition-colors", "aria-label": "Go back", children: _jsx(ArrowLeft, { size: 20 }) }), _jsx("h1", { style: { fontSize: '18px', fontWeight: '600' }, children: "Product Details" })] }) }), _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: _jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" }) }), _jsx("div", { className: "p-6", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: [_jsx("h2", { className: "mb-3", style: { fontSize: '24px', fontWeight: '700' }, children: product.name }), _jsx("div", { className: "mb-6", children: _jsx("p", { className: "text-primary", style: { fontSize: '28px', fontWeight: '700' }, children: formatPrice(product.price) }) }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "mb-2", style: { fontSize: '16px', fontWeight: '600' }, children: "Description" }), _jsx("p", { className: "text-muted-foreground leading-relaxed", style: { fontSize: '14px' }, children: product.description })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "mb-2", style: { fontSize: '16px', fontWeight: '600' }, children: "Features" }), _jsxs("ul", { className: "space-y-2 text-muted-foreground", style: { fontSize: '14px' }, children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary mt-1", children: "\u2022" }), _jsx("span", { children: "High quality materials and construction" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary mt-1", children: "\u2022" }), _jsx("span", { children: "Fast and reliable shipping" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary mt-1", children: "\u2022" }), _jsx("span", { children: "30-day money-back guarantee" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-primary mt-1", children: "\u2022" }), _jsx("span", { children: "Customer support available 24/7" })] })] })] })] }) }), _jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Button, { fullWidth: true, onClick: handleAddToCart, className: "flex items-center justify-center gap-2", children: [_jsx(ShoppingCart, { size: 20 }), "Add to Cart"] }) }) })] })] }));
}
