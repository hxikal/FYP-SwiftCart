import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import {type Product } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="group overflow-hidden rounded-3xl border border-border bg-white shadow-[var(--card-shadow)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--soft-shadow)]">
        <div className="m-2 aspect-square overflow-hidden rounded-2xl bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="px-3 pb-4 pt-1">
          <h3 className="line-clamp-2 min-h-10 text-foreground" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>
            {product.name}
          </h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-primary" style={{ fontSize: '17px', fontWeight: '800' }}>
              {formatPrice(product.price)}
            </p>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
              <ShoppingCart size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
