import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = "No campus listings found",
  description = "Try adjusting your filters, hostel location, or search keywords.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-paper-darkBorder/80 max-w-md mx-auto my-6 shadow-subtle">
      <div className="w-14 h-14 bg-paper-100 rounded-full flex items-center justify-center text-navy-800 mb-4 border border-paper-darkBorder">
        <Icon className="w-7 h-7 text-navy-700" />
      </div>
      <h3 className="font-serif text-lg font-bold text-navy-950 mb-1">{title}</h3>
      <p className="text-sm text-navy-700/70 mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
