export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  avatarUrl: string;
  imageUrl?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  projectName: string;
  projectUrl?: string;
  date?: string;
}
