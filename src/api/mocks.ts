import { Designer, Project } from '../types/models';

export const MOCK_DESIGNERS: Designer[] = [
  {
    id: "d1",
    name: "Elena Rodriguez",
    city: "Los Angeles, CA",
    styles: ["Minimalist", "Modern"],
    bio: "Specializing in serene, light-filled spaces that balance modern aesthetics with everyday comfort. Elena believes your home should be your sanctuary.",
    experienceYears: 8,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    portfolio: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviews: 32
  },
  {
    id: "d2",
    name: "Marcus Chen",
    city: "New York, NY",
    styles: ["Industrial", "Mid-Century"],
    bio: "Marcus brings a bold, architectural approach to interior design. He expertly blends raw materials with refined furnishings to create striking, memorable spaces.",
    experienceYears: 12,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    portfolio: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 5.0,
    reviews: 45
  },
  {
    id: "d3",
    name: "Sarah Jenkins",
    city: "Austin, TX",
    styles: ["Transitional", "Eclectic"],
    bio: "Sarah creates lived-in, soulful spaces by mixing vintage finds with contemporary pieces. Her designs are warm, approachable, and uniquely tailored.",
    experienceYears: 6,
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
    portfolio: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.8,
    reviews: 28
  },
  {
    id: "d4",
    name: "David Alby",
    city: "Chicago, IL",
    styles: ["Traditional", "Transitional"],
    bio: "Classic, timeless design that respects architectural heritage while accommodating modern lifestyles. David's work is characterized by elegance and quality.",
    experienceYears: 15,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    portfolio: [
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800"
    ],
    rating: 4.9,
    reviews: 61
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Serene Brentwood Villa",
    designerId: "d1",
    designerName: "Elena Rodriguez",
    roomType: "Living Room",
    style: "Minimalist",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p2",
    title: "Tribeca Loft",
    designerId: "d2",
    designerName: "Marcus Chen",
    roomType: "Kitchen",
    style: "Industrial",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p3",
    title: "Modern Hill Country",
    designerId: "d3",
    designerName: "Sarah Jenkins",
    roomType: "Bedroom",
    style: "Transitional",
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p4",
    title: "Lakehouse Retreat",
    designerId: "d1",
    designerName: "Elena Rodriguez",
    roomType: "Bathroom",
    style: "Modern",
    imageUrl: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80&w=1200"
  }
];
