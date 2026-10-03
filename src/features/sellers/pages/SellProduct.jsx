import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { CATEGORIES, SAFE_HUBS, ALL_HOSTELS, CONDITIONS } from '@/shared/config/marketplaceData';
import { productService } from '@/features/products/services/productService';
import { ShieldCheck, Info, ImagePlus, X } from 'lucide-react';

export const SellProduct = ({ onNavigate, onProductSaved, user, productId = null }) => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    categoryLabel: '',
    price: '',
    mrp: '',
    condition: 'good',
    conditionLabel: 'Good Condition',
    description: '',
    hostel: user?.hostel || '',
    preferredHub: SAFE_HUBS[0].id,
    pickupPoint: '',
    negotiable: false,
    imageAssets: [],
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(Boolean(productId));
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoadingProduct(false);
      return undefined;
    }

    let active = true;
    productService.getById(productId)
      .then((product) => {
        if (!active) return;
        const selectedHub = SAFE_HUBS.find((hub) => hub.name === product.pickupPoint);
        setForm((current) => ({
          ...current,
          title: product.title || '',
          category: product.category || '',
          categoryLabel: product.categoryLabel || '',
          price: product.price ?? '',
          mrp: product.mrp ?? '',
          condition: product.conditionType || 'good',
          conditionLabel: product.condition || '',
          description: product.description || '',
          hostel: product.hostel || user?.hostel || '',
          preferredHub: selectedHub?.id || '',
          pickupPoint: product.pickupPoint || '',
          negotiable: Boolean(product.negotiable),
          imageAssets: product.imageAssets || [],
        }));
      })
      .catch((loadError) => { if (active) setError(loadError.message || 'Could not load this listing.'); })
      .finally(() => { if (active) setLoadingProduct(false); });

    return () => { active = false; };
  }, [productId, user?.hostel]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;
    if (form.imageAssets.length + files.length > 6) {
      setError('A listing can have up to 6 photos.');
      return;
    }
    const invalidFile = files.find((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024);
    if (invalidFile) {
      setError('Choose JPG, PNG, or WebP images up to 5 MB each.');
      return;
    }

    setError('');
    setUploadingImages(true);
    try {
      const uploaded = await productService.uploadImages(files);
      setForm((current) => ({ ...current, imageAssets: [...current.imageAssets, ...uploaded] }));
    } catch (uploadError) {
      setError(uploadError.message || 'Could not upload the product photos.');
    } finally {
      setUploadingImages(false);
    }
  };

  const removePhoto = (index) => {
    setForm((current) => ({
      ...current,
      imageAssets: current.imageAssets.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const handleCategoryChange = (catId) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    setForm(prev => ({
      ...prev,
      category: catId,
      categoryLabel: cat?.name || catId,
    }));
  };

  const handleConditionChange = (condId) => {
    const cond = CONDITIONS.find(c => c.id === condId);
    setForm(prev => ({
      ...prev,
      condition: condId,
      conditionLabel: cond?.label || condId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.description) return;
    setLoading(true);
    const hub = SAFE_HUBS.find(h => h.id === form.preferredHub);
    setError('');
    try {
      const productData = {
        ...form,
        conditionType: form.condition,
        condition: form.condition,
        pickupPoint: hub?.name || form.pickupPoint || form.preferredHub,
      };
      if (productId) await productService.update(productId, productData);
      else await productService.create(productData);
      await onProductSaved?.();
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message || 'Could not publish this listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-paper-50 px-4">
        <div className="max-w-md w-full bg-white border border-paper-darkBorder rounded-xl p-8 shadow-card text-center">
          <div className="w-14 h-14 bg-[#F0FDFA] border border-[#99F6E4] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-campus-teal" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-2">{productId ? 'Listing Updated!' : 'Listing Published!'}</h2>
          <p className="text-sm text-navy-700/80 mb-6 leading-relaxed">
            {productId ? 'Your listing changes have been saved.' : 'Your listing is now available in the marketplace.'}
          </p>
          <div className="flex gap-3">
            <Button variant="primary" className="flex-1" onClick={() => onNavigate('home')}>
              Back to Home
            </Button>
            {!productId && <Button variant="secondary" className="flex-1" onClick={() => setSubmitted(false)}>
              List Another
            </Button>}
          </div>
        </div>
      </div>
    );
  }

  const discount = form.mrp && form.price && Number(form.mrp) > Number(form.price)
    ? Math.round(((Number(form.mrp) - Number(form.price)) / Number(form.mrp)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-paper-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-campus-blue mb-1.5">
            JNU Peer Marketplace
          </p>
          <h1 className="text-3xl font-bold text-navy-950 tracking-tight">{productId ? 'Edit listing' : 'List an item'}</h1>
          <p className="text-sm text-navy-700/70 mt-1.5">
            {productId ? 'Update your listing details and campus pickup information.' : 'Share a few details with students nearby. Listing is free, with pickup arranged on campus.'}
          </p>
        </div>

        {loadingProduct ? <p className="rounded-xl border border-[#dfe6f0] bg-white p-6 text-sm text-navy-700">Loading listing…</p> : <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-7">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-5">

              <div className="rounded-2xl border border-[#dfe6f0] bg-white p-5 shadow-[0_5px_20px_rgba(17,29,73,0.04)] sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-navy-950">Product photos</h3>
                    <p className="mt-1 text-xs text-navy-700/60">Photos upload securely to Cloudinary. Add up to 6 JPG, PNG, or WebP files.</p>
                  </div>
                  <span className="rounded-full bg-[#f1f5fb] px-2.5 py-1 text-xs font-medium text-navy-700/65">{form.imageAssets.length}/6</span>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {form.imageAssets.map((image, index) => (
                    <div key={image.cloudinaryPublicId || image.imageUrl} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#dfe6f0]">
                      <img src={image.imageUrl} alt={`Listing photo ${index + 1}`} className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removePhoto(index)} className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-navy-800 shadow-sm hover:bg-red-50 hover:text-red-600" aria-label={`Remove photo ${index + 1}`}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {form.imageAssets.length < 6 && (
                    <label className="relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd7e8] bg-[#f8fafd] text-center transition hover:border-campus-blue hover:bg-blue-50/50">
                      <ImagePlus className="mb-2 h-5 w-5 text-campus-blue" />
                      <span className="text-xs font-medium text-navy-800">{uploadingImages ? 'Uploading…' : 'Add photos'}</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploadingImages} onChange={handlePhotoChange} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Upload product photos" />
                    </label>
                  )}
                </div>
              </div>

              {/* Item Details */}
              <div className="bg-white border border-[#dfe6f0] rounded-2xl p-5 sm:p-6 shadow-[0_5px_20px_rgba(17,29,73,0.04)] space-y-5">
                <h3 className="text-base font-semibold text-navy-950">Item details</h3>

                <Input
                  label="Item Title"
                  id="title"
                  placeholder="e.g. Sony WH-CH520 Wireless Headphones (Blue)"
                  value={form.title}
                  onChange={e => handleChange('title', e.target.value)}
                  required
                />

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Category <span className="text-campus-terracotta">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={e => handleCategoryChange(e.target.value)}
                    required
                    className="w-full text-sm border border-[#d8e0eb] rounded-xl px-3.5 py-3 bg-white text-navy-950 outline-none transition focus:border-campus-blue focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2.5">
                    Item Condition <span className="text-campus-terracotta">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CONDITIONS.map(cond => (
                      <label key={cond.id} className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${form.condition === cond.id ? 'border-campus-blue bg-blue-50/70 text-navy-950' : 'border-[#dfe6f0] text-navy-800 hover:bg-[#f8fafd]'}`}>
                        <input
                          type="radio"
                          name="condition"
                          value={cond.id}
                          checked={form.condition === cond.id}
                          onChange={() => handleConditionChange(cond.id)}
                          className="accent-blue-700"
                        />
                        {cond.label}
                      </label>
                    ))}
                  </div>
                </div>

                <Input
                  label="Description"
                  id="description"
                  placeholder="Describe the item honestly — age, any defects, what's included, why you're selling..."
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                  required
                />
              </div>

              {/* Pricing */}
              <div className="bg-white border border-[#dfe6f0] rounded-2xl p-5 sm:p-6 shadow-[0_5px_20px_rgba(17,29,73,0.04)] space-y-5">
                <h3 className="text-base font-semibold text-navy-950">Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Selling Price (₹)"
                    id="price"
                    type="number"
                    placeholder="e.g. 1200"
                    value={form.price}
                    onChange={e => handleChange('price', e.target.value)}
                    required
                  />
                  <Input
                    label="Original MRP / Cost Price (₹)"
                    id="mrp"
                    type="number"
                    placeholder="e.g. 2499"
                    value={form.mrp}
                    onChange={e => handleChange('mrp', e.target.value)}
                    helperText="Optional. Shows buyers the discount."
                  />
                </div>
                {discount > 0 && (
                  <div className="text-xs bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-emerald-800 font-semibold">
                    ✓ You're offering a {discount}% discount from MRP. This helps attract buyers faster.
                  </div>
                )}
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.negotiable}
                    onChange={e => handleChange('negotiable', e.target.checked)}
                    className="w-4 h-4 accent-navy-950 rounded"
                  />
                  <span className="text-sm text-navy-950 font-medium">Price is negotiable</span>
                </label>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Hostel & Handover Hub */}
              <div className="bg-white border border-[#dfe6f0] rounded-2xl p-5 shadow-[0_5px_20px_rgba(17,29,73,0.04)] space-y-5">
                <h3 className="text-base font-semibold text-navy-950">Campus pickup</h3>

                {/* Your Hostel */}
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Your hostel or location</label>
                  <select
                    value={form.hostel}
                    onChange={e => handleChange('hostel', e.target.value)}
                    className="w-full text-sm border border-[#d8e0eb] rounded-xl px-3.5 py-3 bg-white text-navy-950 outline-none transition focus:border-campus-blue focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Select hostel</option>
                    {ALL_HOSTELS.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                    <option value="SIS Building">SIS Building</option>
                    <option value="SSS Building">SSS Building (Periyar)</option>
                    <option value="SPS Building">SPS Building</option>
                  </select>
                </div>

                {/* Preferred Hub */}
                <div>
                  <label className="block text-sm font-semibold text-navy-900 mb-2">Preferred pickup point</label>
                  <div className="space-y-2">
                    {SAFE_HUBS.map(hub => (
                      <label key={hub.id} className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${form.preferredHub === hub.id ? 'border-campus-blue bg-blue-50/70' : 'border-[#dfe6f0] hover:bg-[#f8fafd]'}`}>
                        <input
                          type="radio"
                          name="hub"
                          value={hub.id}
                          checked={form.preferredHub === hub.id}
                          onChange={() => handleChange('preferredHub', hub.id)}
                          className="mt-0.5 accent-blue-700"
                        />
                        <div>
                          <p className="text-sm font-semibold text-navy-950">{hub.name}</p>
                          <p className="text-[10px] text-navy-700/60">{hub.timing}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seller Info Preview */}
              <div className="bg-white border border-[#dfe6f0] rounded-2xl p-5 shadow-[0_5px_20px_rgba(17,29,73,0.04)]">
                <h3 className="text-sm font-semibold text-navy-950 mb-4">Your listing profile</h3>
                <div className="space-y-3 text-sm text-navy-800">
                  <div className="flex gap-2"><span className="text-navy-700/60 w-20 shrink-0">Seller</span><span className="font-semibold">{user?.name || user?.username || 'Your account'}</span></div>
                  {user?.hostel && <div className="flex gap-2"><span className="text-navy-700/60 w-20 shrink-0">Hostel</span><span className="font-semibold truncate">{user.hostel}</span></div>}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#f0f5ff] border border-[#dce6fa] rounded-2xl p-5 text-sm text-navy-700/80 leading-relaxed space-y-2.5">
                <div className="flex gap-1.5"><Info className="w-4 h-4 text-navy-800 shrink-0 mt-0.5" /><span className="font-semibold text-navy-900">Listing Rules</span></div>
                <p>• Selling price cannot exceed verified MRP</p>
                <p>• Listings expire after 30 days (bump to renew)</p>
                <p>• All handovers must occur at campus safe hubs</p>
                <p>• Never send money before verifying the item</p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="blue"
                size="lg"
                className="w-full rounded-xl py-3"
                disabled={loading || uploadingImages || loadingProduct || !form.title || !form.price || !form.category}
              >
                {loading ? (productId ? 'Saving...' : 'Publishing...') : (productId ? 'Save Changes' : 'Publish Listing — Free')}
              </Button>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            </div>
          </div>
        </form>}
      </div>
    </div>
  );
};
