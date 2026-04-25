import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { BottomNav } from '../components/BottomNav';
import { getProducts } from '../data/products';
export function HomeScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        let isMounted = true;
        async function loadProducts() {
            try {
                setIsLoading(true);
                setError('');
                const firebaseProducts = await getProducts();
                if (isMounted) {
                    setProducts(firebaseProducts);
                }
            }
            catch (err) {
                console.error('Failed to load products:', err);
                if (isMounted) {
                    setError('Failed to load products');
                }
            }
            finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        loadProducts();
        return () => {
            isMounted = false;
        };
    }, []);
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "min-h-screen bg-background pb-20", children: [_jsx("div", { className: "bg-white border-b border-border sticky top-0 z-10", children: _jsx("div", { className: "max-w-md mx-auto px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { size: 18, className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search products...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary/20 outline-none", style: { fontSize: '14px' } })] }), _jsx("button", { className: "p-2.5 bg-muted rounded-lg hover:bg-muted/80 transition-colors", "aria-label": "Filter products", children: _jsx(SlidersHorizontal, { size: 20 }) })] }) }) }), _jsxs("div", { className: "max-w-md mx-auto px-4 py-4", children: [_jsx("h2", { className: "mb-4", style: { fontSize: '18px', fontWeight: '600' }, children: "All Products" }), isLoading && (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: _jsx("p", { children: "Loading products..." }) })), error && (_jsx("div", { className: "text-center py-12 text-destructive", children: _jsx("p", { children: error }) })), !isLoading && !error && (_jsx("div", { className: "grid grid-cols-2 gap-3", children: filteredProducts.map(product => (_jsx(ProductCard, { product: product }, product.id))) })), !isLoading && !error && filteredProducts.length === 0 && (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: _jsx("p", { children: "No products found" }) }))] }), _jsx(BottomNav, {})] }));
}
