export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
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
  
  
  
  /* HEADPHONES */
  
  {
    "id": "product-lumia-white",
    "name": "LUMIA Pro 2 White",
    "category": "headphones",
    "price": 139.99,
    "image": "/images/product-lumia-white.png",
    "alt": "White Lumia Pro 2 over-ear headphones",
    "inStock": true
  },
  {
    "id": "product-vesper-silver",
    "name": "VESPER Metallic Silver",
    "category": "headphones",
    "price": 99.99,
    "image": "/images/product-vesper-silver.png",
    "alt": "Silver and black Vesper headphones",
    "inStock": true
  },
  {
    "id": "product-venus-silver",
    "name": "VENUS Silver",
    "category": "headphones",
    "price": 119.99,
    "image": "/images/product-venus-silver.jpg",
    "alt": "Silver Venus headphones",
    "inStock": true
  },



  /* EARBUDS */

  {
    "id": "product-aerospace-black",
    "name": "AEROSPACE Earbuds Black",
    "category": "earbuds",
    "price": 79.99,
    "image": "/images/product-aerospace-black.png",
    "alt": "Black AEROSPACE earbuds",
    "gallery": [
      {
        "src": "/images/product-aerospace-black.png",
        "alt": "Black AEROSPACE earbuds"
      },
      {
        "src": "/images/product-aerospace-black-detail-1.png",
        "alt": "Black AEROSPACE earbuds, detail view 1"
      },
      {
        "src": "/images/product-aerospace-black-detail-2.png",
        "alt": "Black AEROSPACE earbuds, detail view 2"
      },
      {
        "src": "/images/product-aerospace-black-detail-3.jpg",
        "alt": "Black AEROSPACE earbuds, detail view 3"
      },
      {
        "src": "/images/product-aerospace-black-detail-4.jpg",
        "alt": "Black AEROSPACE earbuds, detail view 4"
      }
    ],
    "variants": [
      {
        "label": "Black",
        "productId": "product-aerospace-black"
      },
      {
        "label": "Silver",
        "productId": "product-aerospace-silver"
      },
      {
        "label": "White",
        "productId": "product-aerospace-white"
      }
    ],
    "inStock": true
  },
  {
    "id": "product-aerospace-silver",
    "name": "AEROSPACE Earbuds Silver",
    "category": "earbuds",
    "price": 89.99,
    "image": "/images/product-aerospace-silver.png",
    "alt": "Silver AEROSPACE earbuds",
    "gallery": [
      {
        "src": "/images/product-aerospace-silver.png",
        "alt": "Silver AEROSPACE earbuds"
      },
      {
        "src": "/images/product-aerospace-silver-detail-1.png",
        "alt": "Silver AEROSPACE earbuds, detail view 1"
      },
      {
        "src": "/images/product-aerospace-silver-detail-2.png",
        "alt": "Silver AEROSPACE earbuds, detail view 2"
      },
      {
        "src": "/images/product-aerospace-silver-detail-3.webp",
        "alt": "Silver AEROSPACE earbuds, detail view 3"
      },
      {
        "src": "/images/product-aerospace-silver-detail-4.jpg",
        "alt": "Silver AEROSPACE earbuds, detail view 4"
      }
    ],
    "variants": [
      {
        "label": "Black",
        "productId": "product-aerospace-black"
      },
      {
        "label": "Silver",
        "productId": "product-aerospace-silver"
      },
      {
        "label": "White",
        "productId": "product-aerospace-white"
      }
    ],
    "sku": "ECHO-AER-SLV",
    "description": "Sculptural silver earbuds with star-shaped details. AEROSPACE brings the visual language of jewellery to everyday audio.",
    "fullDescription": "AEROSPACE explores the relationship between audio and personal style. Its silver finish, sculptural silhouette and star-shaped details make the earbuds a visible part of an outfit. This model belongs to ECHO’s experimental AEROSPACE collection.",
    "inStock": true,
    "specifications": [
      {
        "label": "Collection",
        "value": "AEROSPACE"
      },
      {
        "label": "Product type",
        "value": "Earbuds"
      },
      {
        "label": "Colour",
        "value": "Silver"
      },
      {
        "label": "Product code",
        "value": "ECHO-AER-SLV"
      }
    ],
    "reviews": [
      {
        "author": "Alex",
        "rating": 5,
        "text": "The star-shaped details make this my favourite design in the collection."
      },
      {
        "author": "Sam",
        "rating": 4,
        "text": "I like the silver finish and the sculptural shape."
      }
    ]
  },
  {
    "id": "product-aerospace-white",
    "name": "AEROSPACE Earbuds White",
    "category": "earbuds",
    "price": 89.99,
    "image": "/images/product-aerospace-white.png",
    "alt": "White AEROSPACE earbuds",
    "gallery": [
      {
        "src": "/images/product-aerospace-white.png",
        "alt": "White AEROSPACE earbuds"
      },
      {
        "src": "/images/product-aerospace-white-detail-1.jpg",
        "alt": "White AEROSPACE earbuds, detail view 1"
      },
      {
        "src": "/images/product-aerospace-white-detail-2.png",
        "alt": "White AEROSPACE earbuds, detail view 2"
      },
      {
        "src": "/images/product-aerospace-white-detail-3.jpg",
        "alt": "White AEROSPACE earbuds, detail view 3"
      }
    ],
    "variants": [
      {
        "label": "Black",
        "productId": "product-aerospace-black"
      },
      {
        "label": "Silver",
        "productId": "product-aerospace-silver"
      },
      {
        "label": "White",
        "productId": "product-aerospace-white"
      }
    ],
    "inStock": true
  },
  {
    "id": "product-starlight-silver",
    "name": "STARLIGHT Earbuds Silver",
    "category": "earbuds",
    "price": 99.99,
    "image": "/images/product-starlight-silver.png",
    "alt": "Silver STARLIGHT earbuds",
    "inStock": true
  },
  {
    "id": "product-mono-white",
    "name": "MONO White Speaker",
    "category": "speakers",
    "price": 239.99,
    "image": "/images/product-mono-white.jpg",
    "alt": "White MONO speaker",
    "inStock": true
  },



  /* SPEAKERS */

  {
    "id": "product-sphere-black",
    "name": "SPHERE Black Speaker",
    "category": "speakers",
    "price": 249.99,
    "image": "/images/product-sphere-black.jpg",
    "alt": "Black SPHERE speaker",
    "inStock": true
  },
  {
    "id": "product-tamagotchi-keychain-silver",
    "name": "TAMAGOTCHI Keychain Silver",
    "category": "accessories",
    "price": 29.99,
    "image": "/images/product-tamagotchi-keychain-silver.jpg",
    "alt": "Silver TAMAGOTCHI keychain",
    "inStock": true
  },
  {
    "id": "product-charms-silver",
    "name": "CHARMS Silver",
    "category": "accessories",
    "price": 19.99,
    "image": "/images/product-charms-silver.jpg",
    "alt": "Silver CHARMS accessory",
    "inStock": true
  }
];
