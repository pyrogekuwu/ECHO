// ECHO concept catalogue. Prices are illustrative; this is not a live store.
export const products = [
  {
    slug: 'lumia-pro-2-white',
    name: 'LUMIA Pro 2 White',
    category: 'headphones',
    price: 139.99,
    image: '/images/product-lumia-white.png',
    heroImage: '/images/hero-lumia.png',
    alt: 'Sculptural white ECHO Lumia Pro 2 over-ear headphones',
    kicker: 'FORM / 001',
    tagline: 'A different frequency of everyday listening.',
    description: 'Lumia Pro 2 reframes the familiar over-ear silhouette with clean curves, confident proportions and a bright finish. A concept for headphones that look as considered as the music you play.',
    details: ['Sculptural over-ear profile', 'White and silver visual finish', 'Part of the ECHO concept collection']
  },
  {
    slug: 'aerospace-earbuds-black',
    name: 'AEROSPACE Earbuds Black',
    category: 'earbuds',
    price: 79.99,
    image: '/images/product-aerospace-black.png',
    heroImage: '/images/aerospace-detail.png',
    alt: 'Black ECHO Aerospace earbuds with sculptural chrome star details',
    kicker: 'FORM / 002',
    tagline: 'An earbud designed to be seen.',
    description: 'Aerospace explores the space between personal audio and jewellery. Its angular metallic details draw on the visual language of early-2000s cyber culture and turn a functional object into a deliberate accessory.',
    details: ['Experimental sculptural earbud design', 'Black and metallic finish', 'Part of the AEROSPACE editorial collection']
  },
  {
    slug: 'vesper-metallic-silver',
    name: 'VESPER Metallic Silver',
    category: 'headphones',
    price: 99.99,
    image: '/images/product-vesper-silver.png',
    heroImage: '/images/product-vesper-silver.png',
    alt: 'ECHO Vesper over-ear headphones in a metallic silver and black finish',
    kicker: 'FORM / 003',
    tagline: 'Understated form, reflective presence.',
    description: 'VESPER takes a quieter approach to the ECHO visual world: a restrained profile balanced with a high-contrast metallic surface. Built as a design study in everyday objects that feel anything but ordinary.',
    details: ['Over-ear concept silhouette', 'Metallic silver and black visual finish', 'Part of the ECHO concept collection']
  }
] as const;

export type EchoProduct = (typeof products)[number];
