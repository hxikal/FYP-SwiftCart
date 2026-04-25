import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart, type Product } from '../context/CartContext';
import { getProductById } from '../data/products';
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
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
          <h1 style={{ fontSize: '18px', fontWeight: '600' }}>Product Details</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Product Image */}
        <div className="aspect-square bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mb-3" style={{ fontSize: '24px', fontWeight: '700' }}>
              {product.name}
            </h2>

            <div className="mb-6">
              <p className="text-primary" style={{ fontSize: '28px', fontWeight: '700' }}>
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: '600' }}>
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: '14px' }}>
                {product.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: '600' }}>
                Features
              </h3>
              <ul className="space-y-2 text-muted-foreground" style={{ fontSize: '14px' }}>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>High quality materials and construction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Fast and reliable shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>30-day money-back guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Customer support available 24/7</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg">
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
