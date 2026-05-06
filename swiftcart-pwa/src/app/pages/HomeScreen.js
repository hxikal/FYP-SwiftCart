import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
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
    const categories = ['All', 'Featured', 'New', 'Essentials'];
    return (_jsxs("div", { className: "min-h-screen bg-background pb-28", children: [_jsx("div", { className: "bg-[var(--brand-gradient)] pb-6 pt-5 text-white", children: _jsxs("div", { className: "max-w-md mx-auto px-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white/75", style: { fontSize: '13px', fontWeight: 600 }, children: "SwiftCart" }), _jsx("h1", { className: "mt-1", style: { fontSize: '28px', fontWeight: 800, lineHeight: '34px' }, children: "Premium picks for your day" })] }), _jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15", children: _jsx(Sparkles, { size: 21 }) })] }), _jsx("p", { className: "mt-3 max-w-[280px] text-white/80", style: { fontSize: '14px', lineHeight: '21px' }, children: "Browse curated essentials with fast checkout and offline-ready shopping." })] }) }), _jsx("div", { className: "sticky top-0 z-10 -mt-5 px-4", children: _jsx("div", { className: "max-w-md mx-auto rounded-3xl border border-border bg-white p-3 shadow-[var(--soft-shadow)]", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex-1 relative", children: [_jsx(Search, { size: 18, className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search products...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full rounded-2xl border-0 bg-input-background py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary/20", style: { fontSize: '14px' } })] }), _jsx("button", { className: "rounded-2xl bg-secondary p-3 text-primary transition-colors hover:bg-secondary/80", "aria-label": "Filter products", children: _jsx(SlidersHorizontal, { size: 20 }) })] }) }) }), _jsxs("div", { className: "max-w-md mx-auto px-4 py-5", children: [_jsx("div", { className: "mb-5 flex gap-2 overflow-x-auto pb-1", children: categories.map((category, index) => (_jsx("span", { className: `shrink-0 rounded-full px-4 py-2 ${index === 0 ? 'bg-primary text-white' : 'bg-white text-muted-foreground border border-border'}`, style: { fontSize: '13px', fontWeight: 700 }, children: category }, category))) }), _jsxs("div", { className: "mb-4 flex items-end justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground", style: { fontSize: '12px', fontWeight: 700 }, children: "CATALOG" }), _jsx("h2", { style: { fontSize: '20px', fontWeight: '800' }, children: "All Products" })] }), _jsxs("span", { className: "text-muted-foreground", style: { fontSize: '13px' }, children: [filteredProducts.length, " items"] })] }), isLoading && (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: _jsx("p", { children: "Loading products..." }) })), error && (_jsx("div", { className: "text-center py-12 text-destructive", children: _jsx("p", { children: error }) })), !isLoading && !error && (_jsx("div", { className: "grid grid-cols-2 gap-4", children: filteredProducts.map(product => (_jsx(ProductCard, { product: product }, product.id))) })), !isLoading && !error && filteredProducts.length === 0 && (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: _jsx("p", { children: "No products found" }) }))] }), _jsx(BottomNav, {})] }));
}
