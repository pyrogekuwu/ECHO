export interface Collection {
  slug: string;
  name: string;
  cover: string;
}

export const collections: Collection[] = [
  {
    slug: 'aerospace',
    name: 'AEROSPACE',
    cover: '/images/product-aerospace-silver.png',
  },
  {
    slug: 'lumia',
    name: 'LUMIA',
    cover: '/images/product-lumia-white.png',
  },
  {
    slug: 'starlight',
    name: 'STARLIGHT',
    cover: '/images/product-starlight-silver.png',
  },
  {
    slug: 'venus',
    name: 'VENUS',
    cover: '/images/product-venus-silver.png',
  },
  {
    slug: 'vesper',
    name: 'VESPER',
    cover: '/images/product-vesper-silver.png',
  },
  {
    slug: 'mono',
    name: 'MONO',
    cover: '/images/product-mono-white.png',
  },
  {
    slug: 'sphere',
    name: 'SPHERE',
    cover: '/images/product-sphere-black.png',
  },
];