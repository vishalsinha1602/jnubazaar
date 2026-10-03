import React from 'react';

const conditionConfig = {
  like_new: { label: 'Like new', className: 'bg-white/95 text-navy-800 border-paper-darkBorder' },
  good: { label: 'Good condition', className: 'bg-white/95 text-navy-800 border-paper-darkBorder' },
  fair: { label: 'Fair condition', className: 'bg-white/95 text-navy-800 border-paper-darkBorder' },
  new: { label: 'New', className: 'bg-white/95 text-navy-800 border-paper-darkBorder' },
};

export const ProductBadge = ({ condition, conditionType, className = '' }) => {
  const config = conditionConfig[conditionType] || conditionConfig.good;
  return (
    <span className={`inline-flex items-center text-[11px] font-medium px-2 py-1 rounded-md border shadow-sm ${config.className} ${className}`}>
      {config.label}
    </span>
  );
};
