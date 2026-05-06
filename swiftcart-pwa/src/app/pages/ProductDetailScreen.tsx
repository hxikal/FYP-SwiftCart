import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart, type Product } from '../context/CartContext';
import { getProductById } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function ProductDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!id) {
        setIsLoading(false);
        setError('Product not found');
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        const firebaseProduct = await getProductById(id);

        if (isMounted) {
          setProduct(firebaseProduct);
        }
      } catch (err) {
        console.error('Failed to load product:', err);

        if (isMounted) {
          setError('Failed to load product');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="rounded-3xl border border-border bg-white p-6 text-center shadow-[var(--card-shadow)]">
          <p className="text-muted-foreground mb-4">
            {error || 'Product not found'}
          </p>
          <Button onClick={() => navigate('/home')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart', {
      description: product.name,
      duration: 2000,
    });
  };

  const features = [
    'High quality materials and construction',
    'Fast and reliable shipping',
    '30-day money-back guarantee',
    'Customer support available 24/7',
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-2xl bg-white p-2 shadow-sm transition-colors hover:bg-muted"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Product Details</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mx-4 mt-2 aspect-square overflow-hidden rounded-[28px] bg-muted shadow-[var(--card-shadow)]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-3xl border border-border bg-white p-5 shadow-[var(--card-shadow)]">
              <p className="mb-2 text-muted-foreground" style={{ fontSize: '12px', fontWeight: 700 }}>PRODUCT DETAIL</p>
              <h2 style={{ fontSize: '24px', fontWeight: '800', lineHeight: '31px' }}>
                {product.name}
              </h2>
              <p className="mt-3 text-primary" style={{ fontSize: '30px', fontWeight: '800' }}>
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-border bg-white p-5 shadow-[var(--card-shadow)]">
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: '700' }}>
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: '14px' }}>
                {product.description}
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-border bg-white p-5 shadow-[var(--card-shadow)]">
              <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: '700' }}>
                Features
              </h3>
              <ul className="space-y-3 text-muted-foreground" style={{ fontSize: '14px' }}>
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-white/95 p-4 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(15,23,42,0.10)] backdrop-blur">
          <div className="max-w-md mx-auto">
            <Button
              fullWidth
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
