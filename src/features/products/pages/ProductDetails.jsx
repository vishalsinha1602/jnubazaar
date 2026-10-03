import React, { useState, useEffect } from 'react';
import { productService } from '@/features/products/services/productService';
import { wishlistService } from '@/features/wishlist/services/wishlistService';
import { ProductPrice } from '@/features/products/components/ProductPrice';
import { ProductBadge } from '@/features/products/components/ProductBadge';
import { Button } from '@/shared/components/ui/Button';
import { Loader } from '@/shared/components/ui/Loader';
import { Heart, ChevronRight, ShieldCheck, Clock, ImageOff, MapPin, UserRound } from 'lucide-react';
import { authService } from '@/features/auth/services/authService';
import { VerifiedBadge } from '@/shared/components/ui/VerifiedBadge';

export const ProductDetails = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const prod = await productService.getById(productId);
        const [wIds, sellerProfile] = await Promise.all([
          wishlistService.getWishlistIds().catch(() => []),
          prod.sellerId ? authService.getPublicProfile(prod.sellerId).catch(() => null) : Promise.resolve(null),
        ]);
        setProduct(prod);
        setSeller(sellerProfile);
        setSelectedImage(0);
        setWishlisted(wIds.includes(productId));
      } catch (loadError) {
        setError(loadError.message || 'Could not load this listing.');
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo({ top: 0 });
  }, [productId]);

  const handleWishlist = async () => {
    try {
      const ids = await wishlistService.toggleWishlist(productId);
      setWishlisted(ids.includes(productId));
      setError('');
    } catch (toggleError) {
      setError(toggleError.message || 'Could not update your saved listings.');
    }
  };

  if (loading) return <Loader message="Loading listing..." />;
  if (!product) return (
    <div className="p-8 text-center">
      <p role={error ? 'alert' : undefined} className="text-navy-700">{error || 'This listing could not be found.'}</p>
      <Button variant="secondary" onClick={() => onNavigate('marketplace')} className="mt-4">
        Back to Marketplace
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-navy-700/60 mb-5 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-navy-950 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate('marketplace')} className="hover:text-navy-950 transition-colors">Marketplace</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-semibold truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.85fr)]">
          {/* Left: Images */}
          <div className="min-w-0">
            {/* Main Image */}
            <div className="product-detail-image-frame relative overflow-hidden rounded-xl border border-paper-darkBorder bg-paper-100 mb-3">
              {product.images?.[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full min-h-64 flex-col items-center justify-center gap-2 text-navy-700/45">
                  <ImageOff className="h-10 w-10" />
                  <span className="text-sm">No product photos available</span>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <ProductBadge condition={product.condition} conditionType={product.conditionType} />
              </div>
              {product.negotiable && (
                <div className="absolute top-3 right-12">
                  <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded tracking-wide uppercase">
                    Negotiable
                  </span>
                </div>
              )}
              <button
                onClick={handleWishlist}
                className={`absolute top-3 right-3 p-2 rounded-full border shadow-sm transition-all ${
                  wishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-paper-darkBorder text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mb-6">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-navy-950' : 'border-paper-darkBorder opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Safe Handover Info */}
            <div className="mt-4 bg-[#F0FDFA] border border-[#99F6E4] rounded-xl p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-campus-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-campus-teal">Safe Campus Handover</p>
                  <p className="text-xs text-teal-800/80 mt-0.5 leading-relaxed">
                    Inspect the item and agree on exchange details directly with the seller.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Product summary and description */}
            <div className="bg-white border border-paper-darkBorder rounded-xl p-5 shadow-subtle">
              {error && <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-campus-terracotta mb-2">
                {product.categoryLabel}
              </p>
              <h1 className="font-serif text-2xl font-bold text-navy-950 tracking-tight mb-3">{product.title}</h1>
              <ProductPrice price={product.price} mrp={product.mrp} size="md" />
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-navy-700/70">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0" />Listed {product.postedAgo}</span>
              </div>
              <div className="mt-4 border-t border-paper-border pt-4">
                <h2 className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-navy-700/60">Description</h2>
                <p className="text-sm leading-relaxed text-navy-800">{product.description}</p>
              </div>
            </div>

            {/* Public seller profile */}
            <div className="bg-white border border-paper-darkBorder rounded-xl p-5 shadow-subtle">
              <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-navy-700/65">Seller</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-paper-darkBorder bg-paper-50 text-navy-700/60">
                  {seller?.profileImage ? <img src={seller.profileImage} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-6 w-6" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-navy-950">{seller?.name || 'JNU student'}</p>
                    {seller?.verificationStatus === 'VERIFIED' && <VerifiedBadge size="sm" />}
                  </div>
                  {seller?.username && <p className="mt-0.5 truncate text-xs text-navy-700/70">@{seller.username}</p>}
                </div>
              </div>
              {(seller?.hostel || product.hostel) && (
                <p className="mt-3 flex items-center gap-2 text-xs text-navy-700/75">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {seller?.hostel || product.hostel}
                </p>
              )}
            </div>

            {/* Item Details Quick Reference */}
            <div className="bg-white border border-paper-darkBorder rounded-xl p-5 shadow-subtle">
              <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.14em] text-navy-700/65">Item Details</h3>
              <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 gap-y-3">
                {[
                  { label: 'Condition', val: product.condition },
                  { label: 'Category', val: product.categoryLabel },
                  { label: 'Pickup location', val: product.pickupPoint || product.hostel || 'Not specified' },
                ].map(({ label, val }) => (
                  <div key={label} className="contents">
                    <span className="text-sm font-medium text-navy-700/70">{label}</span>
                    <span className="break-words text-sm font-semibold leading-snug text-navy-950">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
