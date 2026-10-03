import React from 'react';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { ScrollReveal } from '@/shared/components/ui/ScrollReveal';
import { AnimatedBackground } from '@/shared/components/ui/AnimatedBackground';

export const CategoryGrid = ({ categories, onCategorySelect, activeCategory }) => {
  return (
    <AnimatedBackground
      defaultValue={activeCategory ?? null}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4"
      backgroundClassName="rounded-xl bg-white shadow-card ring-1 ring-blue-100 dark:bg-slate-800 dark:ring-slate-700"
      transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
      enableHover
    >
      {categories.map((category, index) => (
        <ScrollReveal key={category.id} dataId={category.id} delay={index % 5 * 45}>
          <CategoryCard
            category={category}
            onClick={onCategorySelect}
            isActive={activeCategory === category.id}
          />
        </ScrollReveal>
      ))}
    </AnimatedBackground>
  );
};
