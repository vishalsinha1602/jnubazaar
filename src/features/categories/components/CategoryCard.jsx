import React from 'react';
import { BookOpen, Monitor, Bike, Armchair, Shirt, Dumbbell, Smartphone, Laptop, Headphones, Package } from 'lucide-react';

const iconMap = { BookOpen, Monitor, Bike, Armchair, Shirt, Dumbbell, Smartphone, Laptop, Headphones, Package };

export const CategoryCard = ({ category, onClick, isActive = false }) => {
  const IconComponent = iconMap[category.icon] || Package;
  const count = Number(category.count) || 0;

  return (
    <button
      type="button"
      onClick={() => onClick?.(category)}
      className={`group flex min-h-[132px] w-full flex-col items-start justify-between rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue focus-visible:ring-offset-2 sm:min-h-[144px] sm:p-5 ${
        isActive
          ? 'border-campus-blue bg-campus-blue text-white shadow-[0_8px_20px_rgba(49,91,223,0.16)]'
        : 'border-paper-border bg-transparent text-navy-950 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-blue-200'
      }`}
      aria-label={`Browse ${category.name}, ${count} listings`}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${isActive ? 'border-white/20 bg-white/10' : 'border-paper-border bg-white text-campus-blue group-hover:border-blue-200'}`}>
        <IconComponent className={`h-[19px] w-[19px] ${isActive ? 'text-white' : ''}`} strokeWidth={1.8} />
      </span>
      <span className="mt-5 block">
        <span className={`block text-sm font-semibold leading-snug ${isActive ? 'text-white' : 'text-navy-950'}`}>
          {category.name}
        </span>
        <span className={`mt-1 block text-xs tabular-nums ${isActive ? 'text-white/75' : 'text-navy-700/60'}`}>
          {count} {count === 1 ? 'listing' : 'listings'}
        </span>
      </span>
    </button>
  );
};
