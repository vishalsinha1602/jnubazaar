import React from 'react';

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-navy-900 mb-2">
          {label} {required && <span className="text-campus-terracotta">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-navy-700/60">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-white text-navy-950 placeholder:text-navy-700/45 text-sm rounded-xl border transition duration-150 py-3 ${
            Icon ? 'pl-10 pr-3' : 'px-3.5'
          } ${
            error
              ? 'border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500'
              : 'border-[#d8e0eb] focus:border-campus-blue focus:ring-4 focus:ring-blue-50'
          }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};
