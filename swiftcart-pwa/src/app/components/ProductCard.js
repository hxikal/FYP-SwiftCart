import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router';
import { formatPrice } from '../utils/formatPrice';
export function ProductCard({ product }) {
    return (_jsx(Link, { to: `/product/${product.id}`, children: _jsxs("div", { className: "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow", children: [_jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: _jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "line-clamp-2 mb-1", style: { fontSize: '14px' }, children: product.name }), _jsx("p", { className: "text-primary", style: { fontSize: '16px', fontWeight: '600' }, children: formatPrice(product.price) })] })] }) }));
}
