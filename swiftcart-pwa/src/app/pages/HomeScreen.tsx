import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
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
  const categories = ['All', 'Featured', 'New', 'Essentials'];

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="bg-[var(--brand-gradient)] pb-6 pt-5 text-white">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/75" style={{ fontSize: '13px', fontWeight: 600 }}>SwiftCart</p>
              <h1 className="mt-1" style={{ fontSize: '28px', fontWeight: 800, lineHeight: '34px' }}>
                Premium picks for your day
              </h1>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <Sparkles size={21} />
            </div>
          </div>
          <p className="mt-3 max-w-[280px] text-white/80" style={{ fontSize: '14px', lineHeight: '21px' }}>
            Browse curated essentials with fast checkout and offline-ready shopping.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-10 -mt-5 px-4">
        <div className="max-w-md mx-auto rounded-3xl border border-border bg-white p-3 shadow-[var(--soft-shadow)]">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-0 bg-input-background py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary/20"
                style={{ fontSize: '14px' }}
              />
            </div>
            <button
              className="rounded-2xl bg-secondary p-3 text-primary transition-colors hover:bg-secondary/80"
              aria-label="Filter products"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-5">
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category, index) => (
            <span
              key={category}
              className={`shrink-0 rounded-full px-4 py-2 ${index === 0 ? 'bg-primary text-white' : 'bg-white text-muted-foreground border border-border'}`}
              style={{ fontSize: '13px', fontWeight: 700 }}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: 700 }}>CATALOG</p>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>All Products</h2>
          </div>
          <span className="text-muted-foreground" style={{ fontSize: '13px' }}>{filteredProducts.length} items</span>
        </div>

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
          <div className="grid grid-cols-2 gap-4">
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
