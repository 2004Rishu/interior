export interface RoomCategory {
  id: string;
  category: 'Living' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Other';
  name: string;
  description: string;
  startingPrice: string;
  completionTime: string;
  popularStyle: string;
  imageUrl: string;
}

export const ROOM_CATEGORIES: RoomCategory[] = [
  // LIVING
  {
    id: 'living-1',
    category: 'Living',
    name: 'Living Room',
    description: 'The heart of your home, designed for comfort and connection.',
    startingPrice: '₹1.5L',
    completionTime: '3 Weeks',
    popularStyle: 'Modern Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-2',
    category: 'Living',
    name: 'Luxury Living Room',
    description: 'Premium materials and bespoke furniture for an elite lifestyle.',
    startingPrice: '₹4.5L',
    completionTime: '5 Weeks',
    popularStyle: 'Ultra Luxury',
    imageUrl: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-3',
    category: 'Living',
    name: 'Modern Living Room',
    description: 'Clean lines, smart technology, and contemporary elegance.',
    startingPrice: '₹2.2L',
    completionTime: '4 Weeks',
    popularStyle: 'Contemporary',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-4',
    category: 'Living',
    name: 'Family Lounge',
    description: 'A cozy, relaxed space for movie nights and family bonding.',
    startingPrice: '₹1.8L',
    completionTime: '3 Weeks',
    popularStyle: 'Cozy Bohemian',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-5',
    category: 'Living',
    name: 'TV Lounge',
    description: 'Optimized acoustics and lighting for the perfect viewing experience.',
    startingPrice: '₹1.2L',
    completionTime: '2 Weeks',
    popularStyle: 'Modern Tech',
    imageUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-6',
    category: 'Living',
    name: 'Entertainment Room',
    description: 'Billiards, bar, and gaming wrapped in a sophisticated aesthetic.',
    startingPrice: '₹3.5L',
    completionTime: '4 Weeks',
    popularStyle: 'Industrial Chic',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-7',
    category: 'Living',
    name: 'Drawing Room',
    description: 'A formal space to entertain guests with classic charm.',
    startingPrice: '₹2.8L',
    completionTime: '4 Weeks',
    popularStyle: 'Classic Traditional',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'living-8',
    category: 'Living',
    name: 'Formal Living Area',
    description: 'Sophisticated seating arrangements for important conversations.',
    startingPrice: '₹3.0L',
    completionTime: '4 Weeks',
    popularStyle: 'Neo-Classical',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'
  },

  // KITCHEN
  {
    id: 'kitchen-1',
    category: 'Kitchen',
    name: 'Kitchen',
    description: 'Functional, beautiful, and the true engine of your home.',
    startingPrice: '₹2.0L',
    completionTime: '4 Weeks',
    popularStyle: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1556909211-36987150f047?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kitchen-2',
    category: 'Kitchen',
    name: 'Open Kitchen',
    description: 'Seamlessly blending cooking and living spaces.',
    startingPrice: '₹2.5L',
    completionTime: '4 Weeks',
    popularStyle: 'Scandinavian',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kitchen-3',
    category: 'Kitchen',
    name: 'Island Kitchen',
    description: 'Featuring a central island for prep, dining, and gathering.',
    startingPrice: '₹3.5L',
    completionTime: '5 Weeks',
    popularStyle: 'Luxury Modern',
    imageUrl: 'https://images.unsplash.com/photo-1556156653-e5a7c69cc263?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kitchen-4',
    category: 'Kitchen',
    name: 'Parallel Kitchen',
    description: 'Optimized for efficiency with two facing workspaces.',
    startingPrice: '₹1.8L',
    completionTime: '3 Weeks',
    popularStyle: 'Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kitchen-5',
    category: 'Kitchen',
    name: 'L-Shaped Kitchen',
    description: 'The most popular layout, perfect for corner spaces.',
    startingPrice: '₹2.2L',
    completionTime: '4 Weeks',
    popularStyle: 'Transitional',
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kitchen-6',
    category: 'Kitchen',
    name: 'U-Shaped Kitchen',
    description: 'Maximum storage and counter space for avid cooks.',
    startingPrice: '₹2.8L',
    completionTime: '5 Weeks',
    popularStyle: 'Contemporary',
    imageUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'kitchen-7',
    category: 'Kitchen',
    name: 'Modular Kitchen',
    description: 'Pre-fabricated units customized perfectly to your space.',
    startingPrice: '₹1.5L',
    completionTime: '2 Weeks',
    popularStyle: 'High-Gloss Modern',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  },

  // BEDROOM
  {
    id: 'bedroom-1',
    category: 'Bedroom',
    name: 'Bedroom',
    description: 'A personal sanctuary designed for rest and rejuvenation.',
    startingPrice: '₹1.2L',
    completionTime: '3 Weeks',
    popularStyle: 'Cozy Modern',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bedroom-2',
    category: 'Bedroom',
    name: 'Master Bedroom',
    description: 'Spacious, elegant, featuring custom wardrobes and en-suite design.',
    startingPrice: '₹2.5L',
    completionTime: '4 Weeks',
    popularStyle: 'Luxury Contemporary',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bedroom-3',
    category: 'Bedroom',
    name: 'Luxury Bedroom',
    description: 'Five-star hotel vibes in the comfort of your own home.',
    startingPrice: '₹4.0L',
    completionTime: '5 Weeks',
    popularStyle: 'Boutique Hotel',
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bedroom-4',
    category: 'Bedroom',
    name: 'Kids Bedroom',
    description: 'Playful, safe, and adaptable designs that grow with your child.',
    startingPrice: '₹1.5L',
    completionTime: '3 Weeks',
    popularStyle: 'Playful & Bright',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200' // kids room
  },
  {
    id: 'bedroom-5',
    category: 'Bedroom',
    name: 'Guest Bedroom',
    description: 'Welcoming and comfortable spaces for your visitors.',
    startingPrice: '₹1.0L',
    completionTime: '2 Weeks',
    popularStyle: 'Neutral Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bedroom-6',
    category: 'Bedroom',
    name: 'Walk-in Wardrobe',
    description: 'A dedicated dressing room with bespoke storage solutions.',
    startingPrice: '₹2.0L',
    completionTime: '3 Weeks',
    popularStyle: 'Premium Organized',
    imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bedroom-7',
    category: 'Bedroom',
    name: 'Wardrobe',
    description: 'Custom floor-to-ceiling closets optimized for your lifestyle.',
    startingPrice: '₹0.8L',
    completionTime: '2 Weeks',
    popularStyle: 'Modern Handle-less',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1200'
  },

  // BATHROOM
  {
    id: 'bathroom-1',
    category: 'Bathroom',
    name: 'Bathroom',
    description: 'Clean, functional, and beautifully tiled spaces.',
    startingPrice: '₹1.0L',
    completionTime: '2 Weeks',
    popularStyle: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bathroom-2',
    category: 'Bathroom',
    name: 'Luxury Bathroom',
    description: 'Spa-like sanctuaries featuring premium fixtures and stone finishes.',
    startingPrice: '₹2.5L',
    completionTime: '4 Weeks',
    popularStyle: 'Spa Retreat',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200'
  },

  // OTHER ROOMS
  {
    id: 'other-1',
    category: 'Other',
    name: 'Dining Room',
    description: 'Elegant spaces designed for memorable family meals.',
    startingPrice: '₹1.5L',
    completionTime: '3 Weeks',
    popularStyle: 'Classic Contemporary',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-2',
    category: 'Other',
    name: 'Home Office',
    description: 'Productivity-focused environments for remote work.',
    startingPrice: '₹1.2L',
    completionTime: '3 Weeks',
    popularStyle: 'Ergonomic Modern',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-3',
    category: 'Other',
    name: 'Study Room',
    description: 'Quiet, well-lit spaces for learning and deep focus.',
    startingPrice: '₹1.0L',
    completionTime: '2 Weeks',
    popularStyle: 'Minimalist',
    imageUrl: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-4',
    category: 'Other',
    name: 'Gaming Room',
    description: 'Immersive lighting and custom setups for passionate gamers.',
    startingPrice: '₹1.8L',
    completionTime: '3 Weeks',
    popularStyle: 'Neon Cyber',
    imageUrl: 'https://images.unsplash.com/photo-1606820847053-1fbe34ba5a46?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-5',
    category: 'Other',
    name: 'Library',
    description: 'Classic floor-to-ceiling bookshelves and reading nooks.',
    startingPrice: '₹2.2L',
    completionTime: '4 Weeks',
    popularStyle: 'Dark Academia',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-6',
    category: 'Other',
    name: 'Prayer Room',
    description: 'Serene, spiritual spaces designed for peace and reflection.',
    startingPrice: '₹0.8L',
    completionTime: '2 Weeks',
    popularStyle: 'Traditional Serene',
    imageUrl: 'https://images.unsplash.com/photo-1542668595-fa9394e5b686?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-7',
    category: 'Other',
    name: 'Balcony',
    description: 'Transform your outdoor nook with vertical gardens and seating.',
    startingPrice: '₹0.6L',
    completionTime: '1 Week',
    popularStyle: 'Urban Garden',
    imageUrl: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-8',
    category: 'Other',
    name: 'Terrace',
    description: 'Expansive rooftop designs with pergolas and lounges.',
    startingPrice: '₹2.5L',
    completionTime: '4 Weeks',
    popularStyle: 'Luxury Outdoor',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-9',
    category: 'Other',
    name: 'Home Theatre',
    description: 'Cinematic experiences brought to your basement or spare room.',
    startingPrice: '₹4.0L',
    completionTime: '5 Weeks',
    popularStyle: 'Acoustic Premium',
    imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-10',
    category: 'Other',
    name: 'Gym',
    description: 'Mirrored walls, shock-absorbent flooring, and custom racks.',
    startingPrice: '₹1.5L',
    completionTime: '3 Weeks',
    popularStyle: 'Industrial Active',
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-11',
    category: 'Other',
    name: 'Laundry',
    description: 'Smart storage and integrated appliances for utility spaces.',
    startingPrice: '₹0.8L',
    completionTime: '2 Weeks',
    popularStyle: 'Bright Utility',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-12',
    category: 'Other',
    name: 'Garage',
    description: 'Epoxy flooring and modular cabinets for the ultimate man cave.',
    startingPrice: '₹1.2L',
    completionTime: '2 Weeks',
    popularStyle: 'Sleek Auto',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-13',
    category: 'Other',
    name: 'Swimming Pool',
    description: 'Custom mosaic tiling and deck designs.',
    startingPrice: '₹5.0L',
    completionTime: '6 Weeks',
    popularStyle: 'Resort Style',
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-14',
    category: 'Other',
    name: 'Outdoor Sitting Area',
    description: 'Weather-resistant furniture, fire pits, and ambient lighting.',
    startingPrice: '₹1.8L',
    completionTime: '3 Weeks',
    popularStyle: 'Cozy Patio',
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'other-15',
    category: 'Other',
    name: 'Garden',
    description: 'Landscape design seamlessly integrating with your interior.',
    startingPrice: '₹2.0L',
    completionTime: '4 Weeks',
    popularStyle: 'Lush Botanical',
    imageUrl: 'https://images.pexels.com/photos/158028/benches-park-resting-place-nature-158028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];
