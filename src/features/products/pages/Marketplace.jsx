import React, { useState, useEffect } from 'react';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { SearchBar } from '@/features/home/components/SearchBar';
import { CATEGORIES, CONDITIONS } from '@/shared/config/marketplaceData';
import { productService } from '@/features/products/services/productService';
import { wishlistService } from '@/features/wishlist/services/wishlistService';
import { SlidersHorizontal, X, Plus } from 'lucide-react';

export const Marketplace = ({
  initialFilters = {},
  onOpenProduct,
  onStartChat,
  onNavigate,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loadError, setLoadError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    condition: 'all',
    minPrice: '',
    maxPrice: '',
    search: '',
    sortBy: 'newest',
    page: 0,
    size: 20,
    ...initialFilters,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const page = await productService.getPage(filters.category !== 'all' ? filters : { ...filters, category: undefined });
      setProducts(page.content);
      setTotalElements(page.totalElements);
      setTotalPages(page.totalPages);
      wishlistService.getWishlistIds().then(setWishlistIds).catch(() => setWishlistIds([]));
    } catch (error) {
      setProducts([]);
      setLoadError(error.message || 'Could not load marketplace listings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = ({ search, category }) => {
    setFilters(prev => ({
      ...prev,
      search: search || '',
      category: category || prev.category,
      page: 0,
    }));
  };

  const handleWishlistToggle = async (productId) => {
    try {
      const updated = await wishlistService.toggleWishlist(productId);
      setWishlistIds(updated);
    } catch (error) {
      setLoadError(error.message || 'Could not update your saved listings.');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, ...(key === 'page' ? {} : { page: 0 }) }));
  };

  const clearFilters = () => {
    setFilters({ category: 'all', condition: 'all', minPrice: '', maxPrice: '', search: '', sortBy: 'newest', page: 0, size: 20 });
  };

  const activeFilterCount = [
    filters.category !== 'all',
    filters.condition !== 'all',
    filters.minPrice !== '',
    filters.maxPrice !== '',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Marketplace Header */}
      <div className="bg-white border-b border-paper-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-navy-950">Marketplace</h1>
              <p className="mt-1 text-sm text-navy-700/70" aria-live="polite">
                {loading ? 'Loading listings…' : `${totalElements} ${totalElements === 1 ? 'listing' : 'listings'}`}
              </p>
            </div>
            <button type="button" onClick={() => onNavigate?.('sell')} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-campus-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-campus-blueHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-campus-blue focus-visible:ring-offset-2">
              <Plus className="h-4 w-4" /> Sell an item
            </button>
          </div>
        </div>

        {/* Search + Sort Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                initialQuery={filters.search}
                initialCategory={filters.category}
              />
            </div>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="shrink-0 text-xs border border-paper-darkBorder rounded-lg px-3 py-2.5 bg-white text-navy-950 focus:outline-none focus:border-navy-900 font-medium cursor-pointer hidden md:block"
            >
              <option value="newest">Newly Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-lg border transition-colors shrink-0 ${
                showFilters || activeFilterCount > 0
                  ? 'bg-navy-950 text-white border-navy-950'
                  : 'border-paper-darkBorder text-navy-900 bg-white hover:bg-paper-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showFilters ? 'Hide filters' : 'Filters'}
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-campus-terracotta text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-full lg:w-64 lg:shrink-0 space-y-5">
              <div className="bg-white border border-paper-darkBorder rounded-xl p-4 shadow-subtle">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-campus-terracotta hover:text-campus-terracottaDark font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-5">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-navy-700/60 mb-2">Categories</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleFilterChange('category', 'all')}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md flex items-center justify-between font-medium transition-colors ${filters.category === 'all' ? 'bg-navy-950 text-white' : 'text-navy-800 hover:bg-paper-50'}`}
                    >
                      <span>All Categories</span>
                      <span className="text-[10px] opacity-70">{products.length}</span>
                    </button>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleFilterChange('category', cat.id)}
                        className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md flex items-center justify-between font-medium transition-colors ${filters.category === cat.id ? 'bg-navy-950 text-white' : 'text-navy-800 hover:bg-paper-50'}`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-5 border-t border-paper-border pt-4">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-navy-700/60 mb-2">Price Range (₹)</p>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full text-xs border border-paper-darkBorder rounded-md px-2 py-1.5 focus:outline-none focus:border-navy-900 bg-white"
                    />
                    <span className="text-xs text-navy-700/60">–</span>
                    <input
                      type="number"
                      placeholder="Any"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full text-xs border border-paper-darkBorder rounded-md px-2 py-1.5 focus:outline-none focus:border-navy-900 bg-white"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {[['< ₹500', '', '500'], ['₹500–₹2k', '500', '2000'], ['₹2k–₹5k', '2000', '5000'], ['₹5k+', '5000', '']].map(([label, min, max]) => (
                      <button
                        key={label}
                        onClick={() => { handleFilterChange('minPrice', min); handleFilterChange('maxPrice', max); }}
                        className="text-[10px] px-2 py-1 border border-paper-darkBorder rounded-md hover:bg-paper-100 font-medium text-navy-800 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div className="mb-5 border-t border-paper-border pt-4">
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-navy-700/60 mb-2">Item Condition</p>
                  <div className="space-y-1.5">
                    {[{ id: 'all', label: 'All Conditions' }, ...CONDITIONS].map(cond => (
                      <label key={cond.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="condition"
                          checked={filters.condition === cond.id}
                          onChange={() => handleFilterChange('condition', cond.id)}
                          className="text-navy-950 accent-navy-950"
                        />
                        <span className="text-xs text-navy-800 font-medium">{cond.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {loadError && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</p>}
            {/* Active Filter Tags */}
            {(filters.search || filters.category !== 'all' || filters.condition !== 'all') && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {filters.search && (
                  <span className="text-xs bg-navy-100 text-navy-800 border border-navy-200 rounded-full px-3 py-1 flex items-center gap-1.5 font-medium">
                    "{filters.search}"
                    <button onClick={() => handleFilterChange('search', '')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className="text-xs bg-navy-100 text-navy-800 border border-navy-200 rounded-full px-3 py-1 flex items-center gap-1.5 font-medium">
                    {CATEGORIES.find(c => c.id === filters.category)?.name}
                    <button onClick={() => handleFilterChange('category', 'all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-campus-terracotta hover:text-campus-terracottaDark font-semibold">
                    Reset All
                  </button>
                )}
                <span className="text-xs text-navy-700/60 ml-auto">{products.length} shown</span>
              </div>
            )}

            <ProductGrid
              products={products}
              loading={loading}
              wishlistIds={wishlistIds}
              onWishlistToggle={handleWishlistToggle}
              onOpenProduct={onOpenProduct}
              onStartChat={onStartChat}
              columns={showFilters ? 3 : 4}
              onClearFilters={clearFilters}
            />

            {totalElements > 0 && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper-border pt-4 text-sm text-navy-700/70">
                <label className="flex items-center gap-2">
                  <span>Show</span>
                  <select value={filters.size} onChange={(event) => handleFilterChange('size', Number(event.target.value))} className="rounded-lg border border-paper-darkBorder bg-white px-2.5 py-1.5 font-medium text-navy-950">
                    {[10, 20, 50].map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                  <span>per page</span>
                </label>
                <nav aria-label="Marketplace pages" className="flex items-center gap-3">
                <button type="button" disabled={filters.page <= 0 || loading} onClick={() => handleFilterChange('page', filters.page - 1)} className="rounded-lg border border-paper-darkBorder px-3 py-2 font-medium hover:bg-paper-100 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                <span>Page {filters.page + 1} of {totalPages}</span>
                <button type="button" disabled={filters.page + 1 >= totalPages || loading} onClick={() => handleFilterChange('page', filters.page + 1)} className="rounded-lg border border-paper-darkBorder px-3 py-2 font-medium hover:bg-paper-100 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
