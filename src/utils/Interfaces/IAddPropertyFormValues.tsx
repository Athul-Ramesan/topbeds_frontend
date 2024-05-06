export interface IAddPropertyFormValues {
    title: string;
  description: string;
  address: string;
  location?: LocationOption;
  amenities?: string[];
  houseRules?: string;
  price?: number;
  images?: string[]
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  checkIn: string,
  checkOut: string,
}
export interface LocationOption{
    
    city: string;
    state: string;
    country: string;
}