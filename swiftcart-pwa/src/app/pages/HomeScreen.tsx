import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { BottomNav } from '../components/BottomNav';
import { getProducts } from '../data/products';
import { type Product } from '../context/CartContext';

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError('');
        const firebaseProducts = await getProducts();

        if (isMounted) {
          setProducts(firebaseProducts);
        }
      } catch (err) {
        console.error('Failed to load products:', err);

        if (isMounted) {
          setError('Failed to load products');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                style={{ fontSize: '14px' }}
              />
            </div>
            <button
              className="p-2.5 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              aria-label="Filter products"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-md mx-auto px-4 py-4">
        <h2 className="mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
          All Products
        </h2>

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
