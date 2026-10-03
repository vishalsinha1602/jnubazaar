import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
    md: "text-sm px-4 py-2 rounded-lg gap-2",
    lg: "text-base px-5 py-2.5 rounded-lg gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary: "bg-navy-900 hover:bg-navy-800 text-white border-navy-900 shadow-sm active:scale-[0.99]",
    blue: "bg-campus-blue hover:bg-campus-blueHover text-white border-campus-blue shadow-sm active:scale-[0.99]",
    accent: "bg-campus-terracotta hover:bg-campus-terracottaDark text-white border-campus-terracotta shadow-sm active:scale-[0.99]",
    secondary: "bg-white hover:bg-paper-100 text-navy-950 border-paper-darkBorder active:bg-paper-200",
    outline: "bg-transparent hover:bg-paper-100 text-navy-950 border-paper-darkBorder",
    ghost: "bg-transparent hover:bg-paper-200 text-navy-900 border-transparent",
    teal: "bg-campus-teal hover:bg-teal-800 text-white border-campus-teal shadow-sm",
    danger: "bg-red-50 hover:bg-red-100 text-red-700 border-red-200",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};
