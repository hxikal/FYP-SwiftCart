import { useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../components/Button';
import { CartItemCard } from '../components/CartItemCard';
import { BottomNav } from '../components/BottomNav';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export function CartScreen() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  const total = getTotal();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <div className="android-stable-surface border-b border-border">
          <div className="max-w-md mx-auto px-4 py-3">
            <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Shopping Cart</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
          <div className="android-stable-card mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-secondary">
            <ShoppingBag size={40} className="text-muted-foreground" />
          </div>
          <h2 className="mb-2" style={{ fontSize: '20px', fontWeight: '800' }}>
            Your cart is empty
          </h2>
          <p className="text-muted-foreground text-center mb-6" style={{ fontSize: '14px' }}>
            Browse products and add items to your cart
          </p>
          <Button onClick={() => navigate('/home')}>
            Start Shopping
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-36">
      <div className="bg-[var(--brand-gradient)] text-white">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 style={{ fontSize: '22px', fontWeight: '800' }}>Shopping Cart</h1>
          <p className="mt-1 text-white/80" style={{ fontSize: '13px' }}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-3 mb-40">
        {cart.map(item => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-4">
        <div className="android-stable-fixed max-w-md mx-auto space-y-3 rounded-3xl border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span style={{ fontSize: '18px', fontWeight: '800' }}>
              {formatPrice(total)}
            </span>
          </div>

          <Button
            fullWidth
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
