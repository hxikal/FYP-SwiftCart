import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '600' }}>Checkout</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Order Summary */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate mb-1" style={{ fontSize: '14px' }}>
                      {item.name}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between" style={{ fontSize: '14px' }}>
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '14px' }}>
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '14px' }}>
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border" style={{ fontSize: '16px', fontWeight: '700' }}>
                <span>Total</span>
                <span className="text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
              Payment Method
            </h2>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="w-4 h-4 text-primary"
                />
                <span style={{ fontSize: '14px' }}>Credit / Debit Card</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  className="w-4 h-4 text-primary"
                />
                <span style={{ fontSize: '14px' }}>Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
              Shipping Address
            </h2>

            <div className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <p>John Doe</p>
              <p>123 Main Street, Apt 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p className="mt-2">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <Button
            fullWidth
            onClick={handleConfirmOrder}
          >
            Confirm Order - ${finalTotal.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}
