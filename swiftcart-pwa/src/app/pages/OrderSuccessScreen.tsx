import { useNavigate } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function OrderSuccessScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti animation
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#2563eb', '#3b82f6', '#60a5fa'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.5
          }}
          className="mb-6"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={60} className="text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="mb-3" style={{ fontSize: '28px', fontWeight: '700' }}>
            Order Placed Successfully!
          </h1>

          <p className="text-muted-foreground mb-8" style={{ fontSize: '15px', lineHeight: '1.6' }}>
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-8 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                Order Number
              </span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>
                #ORD-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                Estimated Delivery
              </span>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>
                3-5 Business Days
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                Status
              </span>
              <span className="text-primary" style={{ fontSize: '14px', fontWeight: '600' }}>
                Processing
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              fullWidth
              onClick={() => navigate('/home')}
            >
              Continue Shopping
            </Button>

            <Button
              fullWidth
              variant="secondary"
              onClick={() => navigate('/home')}
            >
              View Order History
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
