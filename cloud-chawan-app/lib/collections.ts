export type Collection = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  active: boolean;
  featured: boolean;
};

export const collections: Collection[] = [
  {
    id: 1,
    slug: "petal-bloom",
    name: "Petal Bloom",
    description: "A cloud-soft set with airy stoneware and a blush-toned finish.",
    image: "petal-bloom.png",
    active: true,
    featured: true,
  },
  {
    id: 2,
    slug: "sakura-mist",
    name: "Sakura Mist",
    description: "Ceramic calm with pale pink glaze and a hushed, seasonal glow.",
    image: "sakura-mist.png",
    active: true,
    featured: true,
  },
  {
    id: 3,
    slug: "baby-pink",
    name: "Baby Pink",
    description: "An understated collection shaped for slow mornings and quiet corners.",
    image: "baby-pink.png",
    active: true,
    featured: false,
  },
  {
    id: 4,
    slug: "rosy-haze",
    name: "Rosy Haze",
    description: "A refined palette of blush and cloud-white for a spa-like ritual.",
    image: "rosy-haze.png",
    active: true,
    featured: true,
  },
  {
    id: 5,
    slug: "heart-cloud",
    name: "Heart Cloud",
    description: "Soft curves and gentle color for an intimate matcha moment.",
    image: "heart-cloud.png",
    active: true,
    featured: false,
  },
  {
    id: 6,
    slug: "cloud-drip",
    name: "Cloud Drip",
    description: "A sculptural yet serene set with fluid lines and cool shadows.",
    image: "cloud-drip.png",
    active: true,
    featured: false,
  },
  {
    id: 7,
    slug: "forest-moss",
    name: "Forest Moss",
    description: "Grounded, warm, and quietly luxurious in a mossy, modern palette.",
    image: "forest-moss.png",
    active: true,
    featured: false,
  },
  {
    id: 8,
    slug: "ocean-mist",
    name: "Ocean Mist",
    description: "A breezy collection inspired by mist over still water and dusk skies.",
    image: "ocean-mist.png",
    active: true,
    featured: false,
  },
  {
    id: 9,
    slug: "pink-blossom",
    name: "Pink Blossom",
    description: "A dreamy blend of blossom tones and airy ceramic simplicity.",
    image: "pink-blossom.png",
    active: true,
    featured: false,
  },
];

export const featuredCollections = collections.filter(
  (collection) => collection.active && collection.featured,
);
