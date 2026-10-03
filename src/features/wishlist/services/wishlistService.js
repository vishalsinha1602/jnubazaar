import axiosClient from '@/shared/api/axiosClient';
import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';
import { normalizeProduct } from '@/features/products/services/productService';

export const wishlistService = {
  async getWishlist() {
    const { data } = await axiosClient.get(API_ENDPOINTS.wishlist.base);
    return Array.isArray(data) ? data.map((item) => normalizeProduct({ ...item, id: item.productId })) : [];
  },
  async getWishlistIds() {
    const items = await this.getWishlist();
    return items.map((item) => item.productId || item.product?.id || item.id).filter(Boolean);
  },
  async toggleWishlist(productId) {
    const ids = await this.getWishlistIds();
    if (ids.includes(productId)) {
      await axiosClient.delete(API_ENDPOINTS.wishlist.byProduct(productId));
      return ids.filter((id) => id !== productId);
    }
    await axiosClient.post(API_ENDPOINTS.wishlist.byProduct(productId));
    return [...ids, productId];
  },
};
