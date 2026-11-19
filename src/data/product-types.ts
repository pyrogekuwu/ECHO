export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  color: string | string[];
  price: number;
  originalPrice?: number;
  badge?: string;
  popularity?: number;
  image: string;
  alt: string;
  sku?: string;
  description?: string;
  fullDescription?: string;
  gallery?: ProductImage[];
  variants?: { label: string; productId: string }[];
  inStock?: boolean;
  specifications?: { label: string; value: string }[];
  reviews?: { author: string; rating: number; text: string }[];
}

export type ClientProduct = Pick<Product,
  'id' | 'name' | 'category' | 'price' | 'image' | 'alt' | 'inStock' | 'variants'
>;
