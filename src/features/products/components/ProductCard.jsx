import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { ProductPrice } from '@/features/products/components/ProductPrice';
import { ProductBadge } from '@/features/products/components/ProductBadge';
import { VerifiedBadge } from '@/shared/components/ui/VerifiedBadge';

export const ProductCard = ({
  product,
  isWishlisted = false,
  onWishlistToggle,
  onOpenProduct,
  showSeller = true,
  showRemoveAction = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [wishAnim, setWishAnim] = useState(false);

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishAnim(true);
    setTimeout(() => setWishAnim(false), 400);
    onWishlistToggle?.(product.id);
  };

  const coverImage = product.images?.[0];

  return (
    <article
      onClick={() => onOpenProduct?.(product)}
      className="group bg-white border border-paper-darkBorder rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-paper-darkBorder/80 shadow-subtle flex flex-col"
      aria-label={`${product.title} — ${product.condition}`}
    >
      {/* Product Image with Condition & Wishlist Overlay */}
      <div className="relative overflow-hidden aspect-[4/3] bg-paper-100">
        {coverImage && !imgError ? (
          <img
            src={coverImage}
            alt={product.title}
            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-navy-700/30">
            <span className="text-[10px] font-medium uppercase tracking-wider">No image</span>
          </div>
        )}

        {/* Condition Chip — top left */}
        <div className="absolute top-2 left-2">
          <ProductBadge condition={product.condition} conditionType={product.conditionType} />
        </div>

        {/* Wishlist Heart — top right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full border transition-all duration-150 ${
            isWishlisted
              ? 'bg-red-50 border-red-200 text-red-500'
              : 'bg-white/90 border-paper-darkBorder text-gray-400 hover:text-red-400 hover:border-red-200 hover:bg-red-50'
          } ${wishAnim ? 'scale-125' : 'scale-100'}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-all ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>

        {/* Negotiable tag */}
        {product.negotiable && (
          <div className="absolute bottom-2 left-2">
            <span className="rounded-md border border-paper-darkBorder bg-white/95 px-2 py-1 text-[11px] font-medium text-navy-800 shadow-sm">
              Negotiable
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-3">
        {/* Category Label */}
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-campus-blue">
          {product.categoryLabel}
        </p>

        {/* Title */}
        <h3 className="mb-1 text-[13px] font-semibold leading-snug text-navy-950 line-clamp-2 transition-colors group-hover:text-campus-blue">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mb-2">
          <ProductPrice price={product.price} mrp={product.mrp} size="sm" />
        </div>

        {/* Seller & Location */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {showSeller && product.seller && (
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-5 h-5 rounded-full object-cover border border-paper-darkBorder"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.seller.name)}&background=1E4373&color=fff&size=40`;
                  }}
                />
                {product.seller.verified && (
                  <VerifiedBadge placement="avatar" size="xs" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold leading-tight text-navy-950 truncate">{product.seller.name}</p>
                <div className="flex items-center gap-0.5 text-[9px] leading-tight text-navy-700/60">
                  <MapPin className="h-2.5 w-2.5 shrink-0" />
                  <span className="truncate">{product.seller.hostel}</span>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist action */}
          <div className="flex shrink-0 items-center gap-2">
            {showRemoveAction && (
              <button
                onClick={handleWishlist}
                className="rounded-lg px-2 py-1.5 text-xs font-medium text-navy-700 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Remove from saved items"
              >
                Remove
              </button>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
