
import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string; // This will remain for backward compatibility (first image)
  images?: string[]; // Array of base64 images
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  path: string;
}

export enum ProjectType {
  RESIDENTIAL = 'مسکونی',
  COMMERCIAL = 'تجارتی',
  AGRICULTURAL = 'زراعتی',
  INDUSTRIAL = 'صنعتی',
  INFRASTRUCTURE = 'زیربنایی'
}
