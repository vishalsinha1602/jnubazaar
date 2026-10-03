import React from 'react';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Loader } from '@/shared/components/ui/Loader';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { SearchX } from 'lucide-react';

export const ProductGrid = ({
  products,
  loading,
  wishlistIds = [],
  onWishlistToggle,
  onOpenProduct,
  onStartChat,
  showRemoveAction = false,
  columns = 4,
  emptyTitle,
  emptyDescription,
  onClearFilters,
}) => {
  if (loading) {
    return <Loader message="Loading campus listings..." />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title={emptyTitle || "No campus listings found"}
        description={emptyDescription || "Try changing your search, category, condition, or price range."}
        actionLabel={onClearFilters ? "Clear All Filters" : undefined}
        onAction={onClearFilters}
      />
    );
  }

  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${colClass} gap-3 md:gap-4`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistIds.includes(product.id)}
          onWishlistToggle={onWishlistToggle}
          onOpenProduct={onOpenProduct}
          onStartChat={onStartChat}
          showRemoveAction={showRemoveAction}
        />
      ))}
    </div>
  );
};
