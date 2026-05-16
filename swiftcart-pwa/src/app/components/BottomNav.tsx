import { Home, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';

export function BottomNav() {
  const location = useLocation();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="android-stable-fixed max-w-md mx-auto flex rounded-3xl border border-border p-2">
        <Link
          to="/"
          className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 transition-colors ${
            isActive('/') ? 'bg-secondary text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home size={20} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Home</span>
        </Link>

        <Link
          to="/cart"
          className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 transition-colors relative ${
            isActive('/cart') ? 'bg-secondary text-primary' : 'text-muted-foreground'
          }`}
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-[calc(50%_-_32px)] bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: '11px', fontWeight: 700 }}>
              {cartCount}
            </span>
          )}
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Cart</span>
        </Link>
      </div>
    </nav>
  );
}
