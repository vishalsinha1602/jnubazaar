import React, { useState, useEffect } from 'react';
import { wishlistService } from '@/features/wishlist/services/wishlistService';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { Loader } from '@/shared/components/ui/Loader';
import { Heart } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

export const Wishlist = ({ onOpenProduct, onStartChat, onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWishlist();
    window.scrollTo({ top: 0 });
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    setError('');
    try {
      const items = await wishlistService.getWishlist();
      setWishlistIds(items.map((item) => item.id));
      setProducts(items);
    } catch (loadError) {
      setError(loadError.message || 'Could not load your saved listings.');
      setProducts([]);
      setWishlistIds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async (productId) => {
    try {
      const updated = await wishlistService.toggleWishlist(productId);
      setWishlistIds(updated);
      setProducts(prev => prev.filter(p => updated.includes(p.id)));
    } catch (toggleError) {
      setError(toggleError.message || 'Could not update your saved listings.');
    }
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-campus-terracotta font-semibold mb-1">Your Collection</p>
            <h1 className="font-serif text-3xl font-bold text-navy-950 tracking-tight">
              Saved Items
            </h1>
            {!loading && (
              <p className="text-sm text-navy-700/70 mt-1">
                {products.length} {products.length === 1 ? 'item' : 'items'} saved
              </p>
            )}
          </div>
          {products.length > 0 && (
            <Button variant="secondary" size="sm" onClick={() => onNavigate('marketplace')}>
              View all listings →
            </Button>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : products.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No saved items yet"
            description="Heart any listing on the Marketplace to save it here for later."
            actionLabel="Browse Campus Marketplace"
            onAction={() => onNavigate('marketplace')}
          />
        ) : (
          <ProductGrid
            products={products}
            loading={false}
            wishlistIds={wishlistIds}
            onWishlistToggle={handleWishlistToggle}
            onOpenProduct={onOpenProduct}
            onStartChat={onStartChat}
            showRemoveAction
            columns={4}
          />
        )}
      </div>
    </div>
  );
};
