import lumiaWhite from './products/product-lumia-white.json';
import vesperSilver from './products/product-vesper-silver.json';
import venusSilver from './products/product-venus-silver.json';
import aerospaceBlack from './products/product-aerospace-black.json';
import aerospaceSilver from './products/product-aerospace-silver.json';
import aerospaceWhite from './products/product-aerospace-white.json';
import starlightSilver from './products/product-starlight-silver.json';
import monoWhite from './products/product-mono-white.json';
import sphereBlack from './products/product-sphere-black.json';
import tamagotchiKeychainSilver from './products/product-tamagotchi-keychain-silver.json';
import charmsSilver from './products/product-charms-silver.json';

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

export const products: Product[] = [
  lumiaWhite,
  vesperSilver,
  venusSilver,
  aerospaceBlack,
  aerospaceSilver,
  aerospaceWhite,
  starlightSilver,
  monoWhite,
  sphereBlack,
  tamagotchiKeychainSilver,
  charmsSilver,
];