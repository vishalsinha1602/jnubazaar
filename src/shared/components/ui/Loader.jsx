import React from 'react';

export const Loader = ({ message = "Loading campus listings...", size = "md" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
      <div className="relative">
        <div className="w-10 h-10 border-2 border-paper-darkBorder border-t-navy-900 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-campus-terracotta rounded-full"></div>
        </div>
      </div>
      <p className="text-xs font-mono uppercase tracking-wider text-navy-700/70">{message}</p>
    </div>
  );
};
