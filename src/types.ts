export interface MenuItem {
  id: string;
  name: string;
  tamilName?: string;
  category: string;
  price: number;
  description: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  isSpecial?: boolean;
  imageUrl: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  openingHours: string;
  breakfastHours: string;
  lunchHours: string;
  dinnerHours: string;
  googleMapsUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  source: string;
  isPlaceholderNotice?: boolean;
}

export interface ReservationData {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  serviceType: 'Dine-In Table' | 'Parcel Pre-Order' | 'Party / Bulk Catering';
  notes: string;
}
