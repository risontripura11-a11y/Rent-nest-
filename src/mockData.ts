import { Listing } from './types';

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Single Room for Male Bachelor near University Campus',
    type: 'bachelor',
    rent: 6500,
    location: 'Mirpur-2, Dhaka',
    address: 'House 24, Road 4, Block-B, Mirpur-2 (Near Stadium)',
    photo: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    contact: '01712345678',
    description: 'A cozy, well-ventilated single bedroom is available for a male student or executive bachelor. Spotless tiled floor, high-speed Wi-Fi included. Shared bathroom and dining space with two other university students. Quiet study environment.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Generator Back-up', 'Filtered Water', 'Attached Balcony', '24/7 Security'],
    postedBy: 'Sajid Ahmed',
    postedByAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    postedTime: '2 hours ago',
    likes: 12,
    genderPreference: 'male',
    availableFrom: 'June 2026',
    status: 'available',
    size: 140,
    coordinates: { x: 28, y: 38 },
    isFavorited: false,
    comments: [
      {
        id: 'c1',
        userName: 'Tanveer Ahmed',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        text: 'Brother, is electricity bill included in the rent?',
        timestamp: '1 hour ago'
      },
      {
        id: 'c2',
        userName: 'Sajid Ahmed',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
        text: 'Yes! Electricity and water bills are flat, including wi-fi. No extra hidden costs.',
        timestamp: '45 mins ago'
      }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Ahsan Habib',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 4,
        text: 'Lived here for 6 months. Very supportive roommate network, and the internet speeds are superb.',
        timestamp: '1 week ago'
      }
    ]
  },
  {
    id: '2',
    title: 'Stunning Double Bed Sublet for Couple or Working Female',
    type: 'sublet',
    rent: 12000,
    location: 'Dhanmondi, Dhaka',
    address: 'Flat 4B, Sheltech Tower, Road 15-A, Dhanmondi',
    photo: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    contact: '01988776655',
    description: 'Single large master bedroom with attached bathroom and attached private balcony available for sublet starting next month. Located in a secured high-rise family apartment. You will have dynamic shared access to the kitchen, drawing room, and dining table. Prefers a quiet couple or working female bachelor.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Attached Washroom', 'Private Balcony', 'Elevator', 'Fridge Access', 'Gas (LPG)', 'Daily Cleaning Service'],
    postedBy: 'Nusrat Jahan',
    postedByAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    postedTime: '5 hours ago',
    likes: 24,
    genderPreference: 'female',
    availableFrom: 'July 2026',
    status: 'available',
    size: 280,
    coordinates: { x: 32, y: 62 },
    isFavorited: true,
    comments: [
      {
        id: 'c3',
        userName: 'Sadia Rahman',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        text: 'I am interested! Can I come to visit tomorrow evening, sis?',
        timestamp: '3 hours ago'
      },
      {
        id: 'c4',
        userName: 'Nusrat Jahan',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        text: 'Sure, Sadia. Please call my number after 4 PM to schedule.',
        timestamp: '2 hours ago'
      }
    ],
    reviews: [
      {
        id: 'r2',
        userName: 'Maliha Chowdhury',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        text: 'The house is beautifully kept, highly secure, and Nusrat apu is extremely welcoming. The attached balcony has beautiful green view!',
        timestamp: '3 days ago'
      }
    ]
  },
  {
    id: '3',
    title: 'Premium 3 BHK Modern Family Flat with Dynamic Views',
    type: 'flat',
    rent: 28000,
    location: 'Bashundhara R/A, Dhaka',
    address: 'Sector-B, Block-D, Bashundhara Residential Area',
    photo: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80',
    contact: '01822334455',
    description: 'Executive 3-Bedroom independent apartment available for full flat rental. Offers absolute privacy, 3 modern washrooms (2 attached, 1 common), spacious drawing & dining room, kitchen with premium fittings, and 2 south-facing balconies offering rich breeze and sunshine. Fitted with gas pipeline connection, secure generator backup, and parking space.',
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['Gas Pipeline', 'Lift', 'Parking Space', '2 Balconies', '24/7 Guards', 'CCTV Monitoring', 'Intercom'],
    postedBy: 'Adnan Karim',
    postedByAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    postedTime: 'Yesterday',
    likes: 45,
    genderPreference: 'any',
    availableFrom: 'June 2026',
    status: 'available',
    size: 1450,
    coordinates: { x: 78, y: 31 },
    isFavorited: false,
    comments: [],
    reviews: [
      {
        id: 'r3',
        userName: 'Zahid Hasan',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        text: 'Excellent construction quality and prompt support from the landlord. Bashundhara safety is top notch.',
        timestamp: '1 month ago'
      }
    ]
  },
  {
    id: '4',
    title: 'Cozy Budget Sublet near Tech Hub',
    type: 'sublet',
    rent: 8500,
    location: 'Mohakhali, Dhaka',
    address: 'Near Wireless Gate, Mohakhali (Facing Main Road Link)',
    photo: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    contact: '01511223344',
    description: 'Perfect short-term sublease single room for corporate professionals or interns. Just a 5-minute walk from Mohakhali flyover and core tech offices. Furnished with a study table, chair, and small wardrobe. Clean common washroom. No restriction on entry hours.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Furnished Room', 'High Speed Net', 'Filtered Drinking Water', 'Self Service Laundry'],
    postedBy: 'Tanveer Hossain',
    postedByAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    postedTime: '1 day ago',
    likes: 18,
    genderPreference: 'any',
    availableFrom: 'June 2026',
    status: 'available',
    size: 120,
    coordinates: { x: 52, y: 48 },
    isFavorited: false,
    comments: [],
    reviews: []
  },
  {
    id: '5',
    title: 'Comfortable Single Room for Female Student',
    type: 'bachelor',
    rent: 5500,
    location: 'Farmgate, Dhaka',
    address: 'Tejkunipara, Farmgate (Behind Holy Cross School & College)',
    photo: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    contact: '01799887766',
    description: 'Very secure single room inside an all-female shared apartment. Located key-distance from major coaching centers, metro rail, and colleges. The room is light, airy, and freshly painted. Cook available with minimal extra sharing cost.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['CCTV Secured Gate', 'Chef Available (Optional)', 'Water Purifier', 'Washing Machine'],
    postedBy: 'Ayesha Siddiqua',
    postedByAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    postedTime: '2 days ago',
    likes: 31,
    genderPreference: 'female',
    availableFrom: 'June 2026',
    status: 'available',
    size: 110,
    coordinates: { x: 42, y: 58 },
    isFavorited: false,
    comments: [
      {
        id: 'c5',
        userName: 'Tasnim Ahmed',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        text: 'Apu, is the chef price included in the 5500? Or separate?',
        timestamp: '1 day ago'
      },
      {
        id: 'c6',
        userName: 'Ayesha Siddiqua',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        text: 'Separate apu! The chef fee is 1500 per month shared among roommates.',
        timestamp: '1 day ago'
      }
    ],
    reviews: [
      {
        id: 'r4',
        userName: 'Nabila Karim',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 3,
        text: 'Very good safety and close proximity to the farmgate metro station, though the surrounding area is noisy during daytime.',
        timestamp: '5 days ago'
      }
    ]
  },
  {
    id: '6',
    title: 'Compact 2 Bedroom Flat near Metro Station',
    type: 'flat',
    rent: 18000,
    location: 'Uttara Sector 11, Dhaka',
    address: 'Road 12, Sector 11, Uttara (2 Mins walk to Metro Station)',
    photo: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    contact: '01655667788',
    description: 'Brand new 2 Bedroom independent flat ideal for small family or working bachelors who value transportation speeds. Includes 2 washrooms, open dining-concept kitchen, and full security. Directly opposite park layout.',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['Close to Metro Rail', 'Prepaid Electricity Meter', 'Modern Lift', 'Secure Parking'],
    postedBy: 'Tanveer Hossain',
    postedByAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    postedTime: '3 days ago',
    likes: 15,
    genderPreference: 'any',
    availableFrom: 'June 2026',
    status: 'available',
    size: 850,
    coordinates: { x: 45, y: 18 },
    isFavorited: false,
    comments: [],
    reviews: []
  },
  {
    id: 'c-1',
    title: 'Top-Floor Bachelor Seat with Hill Views in GEC Circle',
    type: 'bachelor',
    rent: 5500,
    location: 'GEC Circle, Chattogram',
    address: 'Hill View Tower, GEC Circle (Opposite Peninsula Hotel), Chattogram',
    photo: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    contact: '01833445566',
    description: 'Looking for a male bachelor to share a well-decorated double bedroom. High floor with refreshing sea breeze and sweet Chattogram hill views. Quiet, secured flat with fiber Wi-Fi networks.',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Attached Washroom', 'Secured Parking', 'Roof Access', 'Elevator'],
    postedBy: 'Mohammad Faisal',
    postedByAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    postedTime: '3 hours ago',
    likes: 19,
    genderPreference: 'male',
    availableFrom: 'June 2026',
    status: 'available',
    size: 150,
    coordinates: { x: 72, y: 55 },
    isFavorited: false,
    comments: [],
    reviews: []
  },
  {
    id: 'c-2',
    title: 'Premium 2 BHK Apartment in Khulshi VIP Residential',
    type: 'flat',
    rent: 22000,
    location: 'Khulshi, Chattogram',
    address: 'Road 3, VIP Khulshi Residential Area, Chattogram',
    photo: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80',
    contact: '01711223399',
    description: 'Beautiful 2 BHK luxury apartment in the most sought-after VIP residential area of Khulshi. Spacious open dining and living layout. 24/7 water supply, gas cylinders, and round-the-clock patrol security. Perfect for families or working professionals.',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['Gas Cylinder Available', 'Heavy Duty Elevator', 'CCTV System', 'South Facing Balcony', 'Car Parking'],
    postedBy: 'Sabin Mustafiz',
    postedByAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    postedTime: 'Today',
    likes: 11,
    genderPreference: 'any',
    availableFrom: 'June 2026',
    status: 'available',
    size: 980,
    coordinates: { x: 81, y: 49 },
    isFavorited: true,
    comments: [],
    reviews: [
      {
        id: 'cr1',
        userName: 'Sayed Karim',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        text: 'A truly peaceful environment with premium security parameters in Chattogram. Landlord behaves wonderfully.',
        timestamp: '2 days ago'
      }
    ]
  }
];

export const AVAILABLE_LOCATIONS = [
  'All Locations',
  'Mirpur-2, Dhaka',
  'Dhanmondi, Dhaka',
  'Bashundhara R/A, Dhaka',
  'Mohakhali, Dhaka',
  'Farmgate, Dhaka',
  'Uttara Sector 11, Dhaka',
  'Banani, Dhaka',
  'Gulshan, Dhaka',
  'Tejgaon, Dhaka',
  'Khilgaon, Dhaka',
  'Mohammadpur, Dhaka',
  'GEC Circle, Chattogram',
  'Nasirabad, Chattogram',
  'Halishahar, Chattogram',
  'Khulshi, Chattogram',
  'Agrabad, Chattogram',
  'Panchlaish, Chattogram',
  'Chawkbazar, Chattogram'
];

export const DEFAULT_POST_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

export const PHOTO_PRESETS = [
  {
    name: 'Cozy Single Bed (Bachelor)',
    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bright Desk & Bed (Bachelor/Sublet)',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Elegant Studio setup (Sublet)',
    url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Comfortable Bedroom (Sublet/Flat)',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Large Kitchen & Living Room (Flat)',
    url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Luxury Sitting Lounge (Flat)',
    url: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80'
  }
];
