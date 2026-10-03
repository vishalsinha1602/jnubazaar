import React from 'react';
import { CATEGORIES } from '@/shared/config/marketplaceData';
import { CategoryGrid } from '@/features/categories/components/CategoryGrid';
import { ArrowRight } from 'lucide-react';

export const CategorySection = ({ products = [], onCategorySelect, onViewAll }) => {
  const categories = CATEGORIES.map((category) => ({
    ...category,
    count: products.filter((product) => product.category === category.id && product.status !== 'sold').length,
  }));

  return (
    <section id="categories" className="border-t border-paper-border bg-[#F7F9FF] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-campus-blue">
              Browse categories
            </p>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Shop by category
            </h2>
            <p className="mt-2 text-sm text-navy-700/70">
              Find useful things for campus life, shared by fellow students.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-campus-blue hover:text-campus-blueHover transition-colors"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <CategoryGrid categories={categories} onCategorySelect={onCategorySelect} />

        {/* Mobile view all */}
        <button
          onClick={onViewAll}
          className="sm:hidden w-full mt-4 text-center text-xs font-semibold text-campus-blue hover:text-campus-blueHover py-2 border border-blue-200 rounded-lg transition-colors"
        >
          View All Categories →
        </button>
      </div>
    </section>
  );
};
