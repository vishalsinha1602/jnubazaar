/**
 * Format numeric price to standard Indian Rupee notation (e.g. ₹1,200)
 */
export function formatPrice(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate savings percentage between MRP and selling price
 */
export function calculateDiscount(mrp, sellingPrice) {
  if (!mrp || !sellingPrice || mrp <= sellingPrice) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
}
