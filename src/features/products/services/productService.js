import axiosClient from '@/shared/api/axiosClient';
import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';

const CATEGORY_LABELS = { electronics: 'Electronics', books: 'Books', furniture: 'Furniture', clothing: 'Clothing', sports: 'Sports', vehicles: 'Vehicles', mobile: 'Mobile', laptop: 'Laptop', accessories: 'Accessories', other: 'Other' };
const CONDITION_LABELS = { new: 'Brand New / Sealed', like_new: 'Like New', good: 'Good Condition', fair: 'Fair / Functional', poor: 'Poor Condition' };
const toOptionalPrice = (value) => value === '' || value === undefined || value === null
  ? null
  : Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : null;

export const normalizeProduct = (product) => {
  if (!product) return product;
  const category = String(product.category || 'other').toLowerCase();
  const conditionType = String(product.condition || 'good').toLowerCase();
  const rawImages = [product.images, product.imageUrls, product.productImages]
    .find((images) => Array.isArray(images) && images.length)
    || [product.coverImageUrl || product.imageUrl].filter(Boolean);
  const imageAssets = rawImages.map((image) => typeof image === 'string'
    ? { imageUrl: image, cloudinaryPublicId: '', displayOrder: 0, cover: false }
    : {
      imageUrl: image?.imageUrl,
      cloudinaryPublicId: image?.cloudinaryPublicId || image?.publicId || '',
      displayOrder: image?.displayOrder ?? 0,
      cover: Boolean(image?.cover),
    }).filter((image) => image.imageUrl);
  return {
    ...product,
    id: product.id,
    category,
    categoryLabel: CATEGORY_LABELS[category] || category,
    conditionType,
    condition: CONDITION_LABELS[conditionType] || conditionType,
    images: imageAssets.map((image) => image.imageUrl),
    imageAssets,
    mrp: product.mrp ?? product.originalPrice ?? null,
    hostel: product.hostel || product.sellerHostel || '',
    seller: product.seller || null,
    status: String(product.status || 'active').toLowerCase(),
    postedAgo: product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '',
  };
};

const toBackendProduct = (data) => ({
  title: data.title,
  description: data.description,
  price: Number(data.price),
  category: String(data.category || '').toUpperCase(),
  condition: String(data.conditionType || data.condition || '').toUpperCase(),
  originalPrice: toOptionalPrice(data.originalPrice ?? data.mrp),
  negotiable: Boolean(data.negotiable),
  sellerHostel: data.sellerHostel ?? data.hostel ?? null,
  pickupPoint: data.pickupPoint ?? data.preferredHub ?? null,
  images: data.imageAssets || [],
});

const toFilters = (filters = {}) => ({
  keyword: filters.search || undefined,
  category: filters.category && filters.category !== 'all' ? filters.category.toUpperCase() : undefined,
  condition: filters.condition && filters.condition !== 'all' ? filters.condition.toUpperCase() : undefined,
  status: filters.status && filters.status !== 'all' ? filters.status.toUpperCase() : undefined,
  minPrice: filters.minPrice || undefined,
  maxPrice: filters.maxPrice || undefined,
  page: Number(filters.page || 0),
  size: Number(filters.size || 20),
  sort: filters.sortBy === 'price_asc' ? 'price,asc' : filters.sortBy === 'price_desc' ? 'price,desc' : 'createdAt,desc',
});

export const productService = {
  async getAll(filters = {}) {
    const page = await this.getPage(filters);
    return page.content;
  },
  async getPage(filters = {}) {
    const { data } = await axiosClient.get(API_ENDPOINTS.products.base, { params: toFilters(filters) });
    const products = Array.isArray(data) ? data : data?.content;
    return {
      content: Array.isArray(products) ? products.map(normalizeProduct) : [],
      totalElements: Number(data?.totalElements ?? products?.length ?? 0),
      totalPages: Number(data?.totalPages ?? 1),
      number: Number(data?.number ?? filters.page ?? 0),
      size: Number(data?.size ?? filters.size ?? 20),
    };
  },
  async getById(id) {
    const { data } = await axiosClient.get(API_ENDPOINTS.products.byId(id));
    return normalizeProduct(data);
  },
  async uploadImages(files) {
    const body = new FormData();
    files.forEach((file) => body.append('files', file));
    const { data } = await axiosClient.post(API_ENDPOINTS.products.uploadImages, body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return Array.isArray(data) ? data : [];
  },
  async create(productData) {
    const { data } = await axiosClient.post(API_ENDPOINTS.products.base, toBackendProduct(productData));
    return normalizeProduct(data);
  },
  async update(id, productData) {
    const { data } = await axiosClient.put(API_ENDPOINTS.products.byId(id), toBackendProduct(productData));
    return normalizeProduct(data);
  },
  async delete(id) {
    await axiosClient.delete(API_ENDPOINTS.products.byId(id));
  },
  async getBySeller(sellerId) {
    const { data } = await axiosClient.get(API_ENDPOINTS.products.bySeller(sellerId));
    return Array.isArray(data) ? data.map(normalizeProduct) : [];
  },
};
