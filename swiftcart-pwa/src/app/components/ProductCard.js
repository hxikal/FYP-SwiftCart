import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
export function ProductCard({ product }) {
    return (_jsx(Link, { to: `/product/${product.id}`, className: "block", children: _jsxs("div", { className: "android-stable-card desktop-card-hover overflow-hidden rounded-3xl border border-border", children: [_jsx("div", { className: "android-media-frame m-2 aspect-square rounded-2xl", children: _jsx("img", { src: product.image, alt: product.name, className: "android-media-img", loading: "lazy", decoding: "async", onError: (event) => {
                            event.currentTarget.style.display = 'none';
                        } }) }), _jsxs("div", { className: "px-3 pb-4 pt-1", children: [_jsx("h3", { className: "line-clamp-2 min-h-10 text-foreground", style: { fontSize: '14px', fontWeight: 600, lineHeight: '20px' }, children: product.name }), _jsxs("div", { className: "mt-3 flex items-center justify-between gap-2", children: [_jsx("p", { className: "text-primary", style: { fontSize: '17px', fontWeight: '800' }, children: formatPrice(product.price) }), _jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary", children: _jsx(ShoppingCart, { size: 16 }) })] })] })] }) }));
}
