export interface Designer {
  id: string;
  name: string;
  city: string;
  styles: string[];
  bio: string;
  experienceYears: number;
  imageUrl: string;
  portfolio: string[];
  rating: number;
  reviews: number;
}

export interface Project {
  id: string;
  title: string;
  designerId: string;
  designerName: string;
  roomType: string;
  style: string;
  imageUrl: string;
}
