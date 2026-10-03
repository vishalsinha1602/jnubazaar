import React from 'react';
import { formatPrice, calculateDiscount } from '@/shared/utils/formatPrice';

export const ProductPrice = ({ price, mrp, size = 'md', showDiscount = true }) => {
  const discount = calculateDiscount(mrp, price);
  
  const sizeStyles = {
    sm: { price: 'text-base font-bold', original: 'text-xs', badge: 'text-[10px] px-1.5 py-0.5' },
    md: { price: 'text-lg font-bold', original: 'text-xs', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { price: 'text-2xl font-bold', original: 'text-sm', badge: 'text-xs px-2 py-0.5' },
    xl: { price: 'text-3xl font-bold', original: 'text-base', badge: 'text-xs px-2 py-0.5' },
  };

  const s = sizeStyles[size];

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span
        className={`${s.price} text-navy-950 font-serif tracking-tight tabular-nums`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {formatPrice(price)}
      </span>
      {mrp && mrp > price && (
        <span className={`${s.original} text-navy-700/50 line-through tabular-nums`}>
          {formatPrice(mrp)}
        </span>
      )}
      {discount > 0 && showDiscount && (
        <span className={`${s.badge} rounded-md border border-blue-100 bg-blue-50 font-sans font-medium text-blue-700`}>
          {discount}% off
        </span>
      )}
    </div>
  );
};
