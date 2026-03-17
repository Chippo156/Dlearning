import { AdsStatus } from '@models/enum/ads-status.enum';

export interface AdsCreationResponse {
  id: number;
  courseId: number;
  title: string;
  description: string;
  image: string;
  location: string;
  link: string;
  contactEmail: string;
  contactPhone: string;
  startDate: string;
  endDate: string;
  priceAds: number;
  adsStatus: AdsStatus;
  createAt: string;
}
