export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  emoji: string;
  amazonUrl: string;
  tiers: string[];
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nike Academy Soccer Ball',
    category: 'Balls',
    price: '$24.99',
    rating: 4.8,
    reviews: 12400,
    description: 'Machine-stitched construction for consistent shape and durability. Ideal for training and recreational play. Used in Foundation Builder and all Kicklab programs.',
    emoji: '⚽',
    amazonUrl: 'https://www.amazon.com/s?k=nike+academy+soccer+ball',
    tiers: ['Starter', 'Pro', 'Elite'],
    badge: 'Most Popular'
  },
  {
    id: 'p2',
    name: 'SKLZ Golden Touch Weighted Training Ball',
    category: 'Balls',
    price: '$34.99',
    rating: 4.7,
    reviews: 3200,
    description: 'Weighted ball designed to strengthen feet and improve touch, control and first touch. Used in Elite Performance program.',
    emoji: '🟡',
    amazonUrl: 'https://www.amazon.com/s?k=sklz+golden+touch+weighted+training+ball',
    tiers: ['Elite'],
    badge: 'Elite Pick'
  },
  {
    id: 'p3',
    name: 'Pro Disc Cones (Set of 50)',
    category: 'Cones',
    price: '$19.99',
    rating: 4.9,
    reviews: 8700,
    description: 'Heavy-duty flat disc cones in 5 colors. Essential for marking out drill zones, agility courses and training areas. Used in every program.',
    emoji: '🟠',
    amazonUrl: 'https://www.amazon.com/s?k=disc+cones+set+of+50+soccer',
    tiers: ['Starter', 'Pro', 'Elite'],
    badge: 'Must Have'
  },
  {
    id: 'p4',
    name: 'Tall Training Pylons (Set of 12)',
    category: 'Cones',
    price: '$22.99',
    rating: 4.6,
    reviews: 2100,
    description: 'High-visibility 9-inch safety cones for creating gates and boundary markers in advanced drills and pressing exercises.',
    emoji: '🔶',
    amazonUrl: 'https://www.amazon.com/s?k=tall+training+pylons+soccer',
    tiers: ['Pro', 'Elite']
  },
  {
    id: 'p5',
    name: 'Agility Ladder 20ft + 12 Cones Complete Set',
    category: 'Agility',
    price: '$29.99',
    rating: 4.8,
    reviews: 6500,
    description: 'Flat rung agility ladder with adjustable rungs plus 12 marker cones. Perfect for footwork, coordination and speed training.',
    emoji: '⚡',
    amazonUrl: 'https://www.amazon.com/s?k=agility+ladder+soccer+training',
    tiers: ['Starter', 'Pro', 'Elite'],
    badge: 'Best Value'
  },
  {
    id: 'p6',
    name: 'Speed Resistance Parachute 56"',
    category: 'Agility',
    price: '$18.99',
    rating: 4.5,
    reviews: 1800,
    description: 'Resistance parachute for sprint training and building explosive speed. Used in Elite Performance conditioning sessions.',
    emoji: '🪂',
    amazonUrl: 'https://www.amazon.com/s?k=speed+resistance+parachute+soccer',
    tiers: ['Elite']
  },
  {
    id: 'p7',
    name: 'Portable Soccer Goal 12×6 ft',
    category: 'Goals',
    price: '$89.99',
    rating: 4.7,
    reviews: 4300,
    description: 'Quick-assembly portable metal goal with net. Regulation 12×6ft size for shooting, finishing and small-sided games.',
    emoji: '🥅',
    amazonUrl: 'https://www.amazon.com/s?k=portable+soccer+goal+12x6',
    tiers: ['Starter', 'Pro', 'Elite'],
    badge: 'Top Rated'
  },
  {
    id: 'p8',
    name: 'SKLZ Pro Soccer Rebounder Goal 2-in-1',
    category: 'Goals',
    price: '$74.99',
    rating: 4.6,
    reviews: 2800,
    description: 'Dual-angle rebounder for solo passing, shooting and receiving practice. Used in Skill Accelerator and Elite Performance programs.',
    emoji: '🔁',
    amazonUrl: 'https://www.amazon.com/s?k=sklz+pro+soccer+rebounder',
    tiers: ['Elite']
  },
  {
    id: 'p9',
    name: 'Pro Soccer Goalkeeper Gloves',
    category: 'GK',
    price: '$39.99',
    rating: 4.7,
    reviews: 5100,
    description: 'Professional-grade latex palm goalkeeper gloves with finger protection spines. Essential for goalkeepers at all levels.',
    emoji: '🧤',
    amazonUrl: 'https://www.amazon.com/s?k=soccer+goalkeeper+gloves+pro',
    tiers: ['Elite'],
    badge: 'GK Essential'
  },
  {
    id: 'p10',
    name: 'Complete Speed & Agility Training Kit',
    category: 'Conditioning',
    price: '$49.99',
    rating: 4.8,
    reviews: 3600,
    description: 'All-in-one training kit: agility ladder, speed hurdles, resistance bands, and cones. Perfect for Elite conditioning sessions.',
    emoji: '💪',
    amazonUrl: 'https://www.amazon.com/s?k=soccer+speed+agility+training+kit',
    tiers: ['Elite'],
    badge: 'Complete Kit'
  },
  {
    id: 'p11',
    name: 'Soccer Resistance Bands (5-Pack)',
    category: 'Conditioning',
    price: '$14.99',
    rating: 4.6,
    reviews: 7200,
    description: 'Multi-resistance band set for strength training, warm-up routines and injury prevention exercises used in Elite Performance program.',
    emoji: '🔵',
    amazonUrl: 'https://www.amazon.com/s?k=soccer+resistance+bands',
    tiers: ['Pro', 'Elite']
  },
];

export const PRODUCT_CATEGORIES = ['All', 'Balls', 'Cones', 'Agility', 'Goals', 'GK', 'Conditioning'];
export const PRODUCT_TIERS = ['All', 'Starter', 'Pro', 'Elite'];
