import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { motion } from 'motion/react';

export function CheckoutScreen() {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCart();

  const total = getTotal();
  const shipping = 5.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handleConfirmOrder = () => {
    clearCart();
    navigate('/success');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="android-stable-surface sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-2xl bg-white p-2 shadow-sm transition-colors hover:bg-muted"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Checkout</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="android-disable-touch-transform space-y-4"
        >
          <section className="android-stable-card rounded-3xl border border-border p-4">
            <h2 className="mb-4" style={{ fontSize: '17px', fontWeight: '800' }}>
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="android-media-frame w-20 h-20 rounded-2xl flex-shrink-0">
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
                  <div className="flex-1 min-w-0">
                    <p className="truncate mb-1" style={{ fontSize: '14px', fontWeight: 700 }}>
                      {item.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '700' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <PriceLine label="Subtotal" value={formatPrice(total)} />
              <PriceLine label="Shipping" value={formatPrice(shipping)} />
              <PriceLine label="Tax (8%)" value={formatPrice(tax)} />
              <div className="flex justify-between pt-3 border-t border-border" style={{ fontSize: '17px', fontWeight: '800' }}>
                <span>Total</span>
                <span className="text-primary">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </section>

          <section className="android-stable-card rounded-3xl border border-border p-4">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-primary" />
              <h2 style={{ fontSize: '16px', fontWeight: '800' }}>Payment Method</h2>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-primary/20 bg-secondary rounded-2xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-primary" />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="radio" name="payment" className="w-4 h-4 text-primary" />
                <span style={{ fontSize: '14px' }}>Cash on Delivery</span>
              </label>
            </div>
          </section>

          <section className="android-stable-card rounded-3xl border border-border p-4">
            <div className="mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              <h2 style={{ fontSize: '16px', fontWeight: '800' }}>Shipping Address</h2>
            </div>
            <div className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '1.7' }}>
              <p>John Doe</p>
              <p>123 Main Street, Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p className="mt-2">Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </motion.div>
      </div>

      <div className="android-stable-fixed fixed bottom-0 left-0 right-0 border-t border-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto">
          <Button fullWidth onClick={handleConfirmOrder}>
            Confirm Order - {formatPrice(finalTotal)}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between" style={{ fontSize: '14px' }}>
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
