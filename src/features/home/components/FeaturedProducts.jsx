import React from 'react';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { ArrowRight } from 'lucide-react';
import { AnimatedBackground } from '@/shared/components/ui/AnimatedBackground';

export const FeaturedProducts = ({
  products,
  loading,
  wishlistIds,
  onWishlistToggle,
  onOpenProduct,
  onStartChat,
  onViewAll,
}) => {
  return (
    <section className="border-t border-paper-border bg-white py-8 sm:py-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-navy-950 tracking-tight">
              Fresh From Campus
            </h2>
            <p className="mt-1 text-sm text-navy-700/70">
              Items listed by verified members of the JNU community.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-campus-blue hover:text-campus-blueHover transition-colors"
          >
            View All {products.length} Listings <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Chips */}
        <AnimatedBackground
          className="mb-4 flex flex-wrap items-center gap-2"
          backgroundClassName="rounded-full bg-paper-100 dark:bg-slate-700"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
          enableHover
        >
          {['All Campuses', 'Near Ganga/Yamuna', 'Near KC Market', 'Library Complex', 'Budget < ₹1,000'].map((label, i) => (
            <button
              key={label}
              type="button"
              data-id={label}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
                i === 0
                  ? 'bg-navy-950 text-white border-navy-950'
                  : 'border-paper-darkBorder text-navy-800 hover:text-navy-950'
              }`}
            >
              {label}
            </button>
          ))}
        </AnimatedBackground>

        <ProductGrid
          products={products.slice(0, 8)}
          loading={loading}
          wishlistIds={wishlistIds}
          onWishlistToggle={onWishlistToggle}
          onOpenProduct={onOpenProduct}
          onStartChat={onStartChat}
          columns={4}
        />

        {/* View All Button */}
        <div className="text-center mt-8">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 border border-paper-darkBorder hover:bg-paper-100 px-6 py-2.5 rounded-lg transition-colors"
          >
            View All {products.length} Campus Listings <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
