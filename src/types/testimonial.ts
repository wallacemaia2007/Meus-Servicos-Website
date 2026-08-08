import { StaticImageData } from "next/image";

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  avatarUrl: string | StaticImageData;
  imageUrl?: string | StaticImageData;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  projectName: string;
  projectUrl?: string;
  date?: string;
}
