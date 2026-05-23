export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5 stars
  text: string;
  timestamp: string;
}

export type RentalType = 'bachelor' | 'sublet' | 'flat';

export interface Listing {
  id: string;
  title: string;
  type: RentalType;
  rent: number;
  location: string;
  address: string;
  photo: string;
  contact: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  postedBy: string;
  postedByAvatar: string;
  postedTime: string;
  likes: number;
  likedByMe?: boolean;
  isFavorited?: boolean;
  comments: Comment[];
  reviews?: Review[];
  coordinates?: { x: number; y: number }; // Percentage position on our beautiful Dhaka micro interactive map
  genderPreference?: 'male' | 'female' | 'any';
  availableFrom: string;
  status: 'available' | 'rented';
  size?: number; // in sq ft
}

export interface FilterState {
  type: 'all' | RentalType;
  location: string;
  minPrice: number;
  maxPrice: number;
  gender: 'any' | 'male' | 'female';
  bedrooms: 'any' | 1 | 2 | 3 | 4;
  showFavoritesOnly?: boolean;
  minRating?: 'all' | 1 | 2 | 3 | 4 | 5;
}

export interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderEmail: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPhoto: string;
  landlordName: string;
  landlordAvatar: string;
  landlordContact: string;
  tenantEmail: string;
  messages: Message[];
  unread?: boolean;
}


