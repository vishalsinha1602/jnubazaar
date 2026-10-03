import React from 'react';
import { ShieldCheck, MapPin, CheckCircle, Tag } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  icon: CustomIcon,
  className = '',
}) => {
  const sizeStyles = {
    xs: "text-[10px] px-1.5 py-0.5 rounded font-medium",
    sm: "text-xs px-2 py-0.5 rounded-md font-medium",
    md: "text-xs px-2.5 py-1 rounded-md font-semibold",
  };

  const variantStyles = {
    default: "bg-paper-100 text-navy-900 border border-paper-darkBorder",
    verified: "bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] font-semibold tracking-wide",
    condition: "bg-white text-navy-800 border border-paper-darkBorder shadow-xs",
    hub: "bg-amber-50 text-amber-900 border border-amber-200",
    terracotta: "bg-orange-50 text-campus-terracotta border border-orange-200 font-semibold",
    blue: "bg-blue-50 text-blue-800 border border-blue-200",
    sold: "bg-gray-100 text-gray-600 border border-gray-300",
  };

  return (
    <span className={`inline-flex items-center gap-1 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {variant === 'verified' && !CustomIcon && <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />}
      {variant === 'hub' && !CustomIcon && <MapPin className="w-3 h-3 text-amber-700 shrink-0" />}
      {CustomIcon && <CustomIcon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
