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
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-white border-b border-border">
          <div className="max-w-md mx-auto px-4 py-3">
            <h1 style={{ fontSize: '18px', fontWeight: '600' }}>Shopping Cart</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-muted-foreground" />
          </div>
          <h2 className="mb-2" style={{ fontSize: '18px', fontWeight: '600' }}>
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 style={{ fontSize: '18px', fontWeight: '600' }}>Shopping Cart</h1>
          <p className="text-muted-foreground mt-1" style={{ fontSize: '13px' }}>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-3 mb-32">
        {cart.map(item => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      {/* Fixed Bottom Summary */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4 shadow-lg">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
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
