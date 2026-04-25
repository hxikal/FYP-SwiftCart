import { Link } from 'react-router';
import {type Product } from '../context/CartContext';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-square bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 mb-1" style={{ fontSize: '14px' }}>{product.name}</h3>
          <p className="text-primary" style={{ fontSize: '16px', fontWeight: '600' }}>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
