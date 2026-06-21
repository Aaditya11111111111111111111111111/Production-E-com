// Product images sourced from Unsplash (unsplash.com) — free to use under the Unsplash License


export const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "electronics",
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    rating: 4.5,
    reviewCount: 2341,
    inStock: true,
    // Photo by C D-X on Unsplash
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e736a63ad3?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&q=80&fit=crop",
    ],
    badge: "Best Seller",
    isNew: false,
    description:
      "Experience crystal-clear audio with industry-leading noise cancellation. These premium over-ear headphones deliver 30-hour battery life, comfortable ear cushions, and foldable design for travel.",
    specifications: {
      Brand: "AudioPro",
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.2",
      Weight: "250g",
      "Driver Size": "40mm",
      Warranty: "1 year",
    },
  },
  {
    id: 2,
    name: "Slim Fit Cotton T-Shirt",
    category: "fashion",
    price: 19.99,
    originalPrice: 34.99,
    discount: 43,
    rating: 4.2,
    reviewCount: 876,
    inStock: true,
    // Photo by Toa Heftiba on Unsplash
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80&fit=crop",
    ],
    badge: null,
    isNew: true,
    description:
      "Premium 100% organic cotton slim-fit T-shirt. Breathable, soft, and durable. Available in multiple colors and sizes.",
    specifications: {
      Material: "100% Organic Cotton",
      Fit: "Slim Fit",
      Care: "Machine washable",
      Sizes: "XS – 3XL",
      Origin: "Made in India",
    },
  },
  {
    id: 3,
    name: "Running Sneakers Pro",
    category: "shoes",
    price: 64.99,
    originalPrice: 89.99,
    discount: 28,
    rating: 4.7,
    reviewCount: 1120,
    inStock: true,
    // Photo by Domino on Unsplash
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80&fit=crop",
    ],
    badge: "Top Rated",
    isNew: false,
    description:
      "Lightweight running sneakers with responsive cushioning and breathable mesh upper. Designed for long-distance comfort on any terrain.",
    specifications: {
      Brand: "SpeedRun",
      Upper: "Breathable Mesh",
      Sole: "Rubber",
      Weight: "280g per shoe",
      Sizes: "UK 6–12",
      Warranty: "6 months",
    },
  },
  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    category: "beauty",
    price: 24.99,
    originalPrice: 39.99,
    discount: 37,
    rating: 4.4,
    reviewCount: 543,
    inStock: true,
    // Photo by Mathilde Langevin on Unsplash
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&fit=crop",
    ],
    badge: null,
    isNew: true,
    description:
      "Powerful brightening serum with 15% Vitamin C, hyaluronic acid, and niacinamide. Reduces dark spots, evens skin tone, and boosts radiance in 4 weeks.",
    specifications: {
      "Vitamin C": "15%",
      Volume: "30ml",
      "Skin Type": "All skin types",
      Usage: "AM/PM",
      "Shelf Life": "12 months",
      "Cruelty Free": "Yes",
    },
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    category: "home-living",
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    rating: 4.6,
    reviewCount: 782,
    inStock: true,
    // Photo by Adolfo Félix on Unsplash
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&fit=crop",
    ],
    badge: "Best Seller",
    isNew: false,
    description:
      "Fully adjustable ergonomic office chair with lumbar support, headrest, and breathable mesh back. Ideal for 8+ hour work sessions.",
    specifications: {
      Material: "Mesh + PU Leather",
      "Max Load": "150kg",
      "Seat Height": "42–52cm adjustable",
      Armrests: "4D adjustable",
      Base: "Aluminium 5-star",
      Warranty: "2 years",
    },
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    category: "sports",
    price: 29.99,
    originalPrice: 44.99,
    discount: 33,
    rating: 4.3,
    reviewCount: 1034,
    inStock: true,
    // Photo by Conscious Design on Unsplash
    image: "https://images.pexels.com/photos/8436679/pexels-photo-8436679.jpeg",
    images: [
      "https://images.pexels.com/photos/8436679/pexels-photo-8436679.jpeg",
      "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop",
    ],
    badge: null,
    isNew: false,
    description:
      "Extra-thick 6mm non-slip yoga mat made from eco-friendly TPE material. Perfect for yoga, pilates, and floor exercises.",
    specifications: {
      Thickness: "6mm",
      Material: "Eco-friendly TPE",
      Dimensions: "183 x 61cm",
      Weight: "1.1kg",
      "Non-slip": "Yes",
      Waterproof: "Yes",
    },
  },
  {
    id: 7,
    name: '4K Smart TV 55"',
    category: "electronics",
    price: 499.99,
    originalPrice: 699.99,
    discount: 29,
    rating: 4.8,
    reviewCount: 3201,
    inStock: true,
    // Photo by Sven Scheuermeier on Unsplash
    image: "https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg",
    images: [
      "https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg",
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80&fit=crop",
    ],
    badge: "Hot Deal",
    isNew: false,
    description:
      "55-inch 4K UHD Smart TV with Dolby Vision, HDR10+, and built-in voice assistant. Enjoy streaming, gaming, and more with the ultra-slim bezel design.",
    specifications: {
      Display: '55" 4K UHD',
      HDR: "Dolby Vision + HDR10+",
      "Refresh Rate": "120Hz",
      OS: "Android TV 12",
      Ports: "3x HDMI, 2x USB",
      Warranty: "2 years",
    },
  },
  {
    id: 8,
    name: "Floral Summer Dress",
    category: "fashion",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.1,
    reviewCount: 459,
    inStock: false,
    // Photo by Andrea Piacquadio on Unsplash
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&fit=crop",
    ],
    badge: null,
    isNew: true,
    description:
      "Lightweight floral-print summer dress made from breathable chiffon. Perfect for beach days, brunches, and casual outings.",
    specifications: {
      Material: "100% Chiffon",
      Fit: "Regular",
      Length: "Midi",
      Care: "Hand wash only",
      Sizes: "XS – XL",
    },
  },
  {
    id: 9,
    name: "Leather Chelsea Boots",
    category: "shoes",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.5,
    reviewCount: 672,
    inStock: true,
    // Photo by Priscilla Du Preez on Unsplash
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1512138664757-360e0aad5132?w=600&q=80&fit=crop",
    ],
    badge: "New",
    isNew: true,
    description:
      "Classic genuine leather Chelsea boots with elastic side panels and stacked heel. Versatile enough for casual and semi-formal occasions.",
    specifications: {
      Material: "Genuine Leather",
      Sole: "Rubber",
      Heel: "3.5cm stacked",
      Sizes: "UK 5–12",
      Closure: "Elastic side panels",
      Warranty: "6 months",
    },
  },
  {
    id: 10,
    name: "Matte Lipstick Set (6 Shades)",
    category: "beauty",
    price: 18.99,
    originalPrice: 29.99,
    discount: 37,
    rating: 4.6,
    reviewCount: 921,
    inStock: true,
    // Photo by freestocks on Unsplash
    image: "https://images.pexels.com/photos/7256096/pexels-photo-7256096.jpeg",
    images: [
      "https://images.pexels.com/photos/7256096/pexels-photo-7256096.jpeg",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80&fit=crop",
    ],
    badge: "Popular",
    isNew: false,
    description:
      "Set of 6 long-lasting matte lipsticks in curated everyday shades. Smooth application, non-drying formula, 8-hour wear.",
    specifications: {
      Shades: "6",
      Finish: "Matte",
      "Wear Time": "8 hours",
      "Cruelty Free": "Yes",
      "Net Weight": "3.5g each",
      "Shelf Life": "24 months",
    },
  },
  {
    id: 11,
    name: "Minimalist Desk Lamp",
    category: "home-living",
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: 4.4,
    reviewCount: 388,
    inStock: true,
    // Photo by Nathan Dumlao on Unsplash
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&fit=crop",
    ],
    badge: null,
    isNew: true,
    description:
      "Sleek LED desk lamp with 3 color temperatures, 5 brightness levels, and USB charging port. Touch control with memory function.",
    specifications: {
      Power: "12W LED",
      "Color Temp": "3000K–6500K",
      Brightness: "5 levels",
      "USB Port": "5V/1A",
      "Arm Reach": "45cm",
      Warranty: "1 year",
    },
  },
  {
    id: 12,
    name: "Adjustable Dumbbell Set",
    category: "sports",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.7,
    reviewCount: 1560,
    inStock: true,
    // Photo by John Arano on Unsplash
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&fit=crop",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80&fit=crop",
    ],
    badge: "Best Seller",
    isNew: false,
    description:
      "Space-saving adjustable dumbbell set that replaces 15 pairs of weights. Quick-adjust dial system from 2.5kg to 24kg per dumbbell.",
    specifications: {
      "Weight Range": "2.5kg – 24kg",
      Increments: "2.5kg",
      Material: "Steel + ABS",
      Handle: "Ergonomic grip",
      "Set Includes": "2 dumbbells + tray",
      Warranty: "2 years",
    },
  },
];

export const featuredProducts = products.filter((p) =>
  [1, 3, 5, 7, 10, 12].includes(p.id)
);

export const newArrivals = products.filter((p) => p.isNew);

export const bestSellers = products.filter((p) => p.badge === "Best Seller");

export const MAX_PRICE = Math.max(...products.map((p) => p.price));
