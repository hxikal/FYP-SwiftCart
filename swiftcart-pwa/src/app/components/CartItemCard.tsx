import { Minus, Plus, Trash2 } from 'lucide-react';
import { type CartItem } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="mb-1" style={{ fontSize: '14px' }}>{item.name}</h3>
        <p className="text-primary mb-2" style={{ fontSize: '16px', fontWeight: '600' }}>
          {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 bg-muted rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-border rounded-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center" style={{ fontSize: '14px', fontWeight: '500' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-border rounded-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
