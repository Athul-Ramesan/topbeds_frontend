import { IUserSignupData } from "./IUserSignup";

export interface IProperty {
    _id:string;
  title: string;
  description: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  hostId?: IUserSignupData
  reviews?: string[];
  availability?: {
    startDate: Date;
    endDate: Date;
    available: boolean;
  }[];
  active?: boolean;
  address: string;
  amenities: string[];
  houseRules: string[];
  price: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  createdAt: Date;
  updatedAt: Date;
}