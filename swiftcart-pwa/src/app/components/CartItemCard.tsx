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
    <div className="android-stable-card flex gap-3 rounded-3xl border border-border p-3">
      <div className="android-media-frame h-24 w-24 flex-shrink-0 rounded-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="android-media-img"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="line-clamp-2 text-foreground" style={{ fontSize: '14px', fontWeight: 700, lineHeight: '19px' }}>{item.name}</h3>
        <p className="mt-1 text-primary" style={{ fontSize: '16px', fontWeight: '800' }}>
          {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center rounded-2xl bg-muted p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="rounded-xl bg-white p-1.5 shadow-sm transition-colors hover:bg-border"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-9 text-center" style={{ fontSize: '14px', fontWeight: '700' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="rounded-xl bg-white p-1.5 shadow-sm transition-colors hover:bg-border"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="rounded-2xl bg-destructive/10 p-2 text-destructive transition-colors hover:bg-destructive/15"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
