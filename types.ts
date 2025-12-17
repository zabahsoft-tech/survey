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
  imageUrl: string;
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