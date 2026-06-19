import {images} from '../assets/images';
import type {
  ClimateSettings,
  FanSpeed,
  MenuCategory,
  MenuItem,
  Offer,
  QuickRequest,
  QuickRequestState,
  RequestStatus,
  Venue,
} from '../types/app';

export const onboardingSlides = [
  {
    image: images.onboardingWelcome,
    title: 'Welcome',
    subtitle: 'Manage your stay from one place.',
    buttonLabel: 'Continue',
  },
  {
    image: images.onboardingServices,
    title: 'Request Services',
    subtitle: 'Order amenities in seconds.',
    buttonLabel: 'Continue',
  },
  {
    image: images.onboardingDining,
    title: 'Dining & Venues',
    subtitle: 'Discover restaurants and resort facilities.',
    buttonLabel: 'Continue',
  },
  {
    image: images.onboardingComfort,
    title: 'Stay Comfortable',
    subtitle: 'Control room settings and special offers.',
    buttonLabel: 'Get Started',
  },
];

export const quickRequests: QuickRequest[] = [
  {
    id: 'extra_towels',
    title: 'Extra Towels',
    description: 'Fresh bath towels delivered',
    image: images.requestTowels,
  },
  {
    id: 'extra_pillows',
    title: 'Extra Pillows',
    description: 'Additional pillows for comfort',
    image: images.requestPillows,
  },
  {
    id: 'bottled_water',
    title: 'Bottled Water',
    description: 'Fresh drinking water supply',
    image: images.requestWater,
  },
  {
    id: 'extra_blanket',
    title: 'Extra Blanket',
    description: 'Additional blanket for warmth',
    image: images.requestBlanket,
  },
  {
    id: 'room_cleaning',
    title: 'Room Cleaning',
    description: 'Request housekeeping service',
    image: images.requestCleaning,
  },
  {
    id: 'toiletries_kit',
    title: 'Toiletries Kit',
    description: 'Essential bathroom amenities pack',
    image: images.requestToiletries,
  },
  {
    id: 'coffee_tea_refill',
    title: 'Coffee & Tea Refill',
    description: 'Restock in-room beverages',
    image: images.requestCoffeeTea,
  },
  {
    id: 'laundry_pickup',
    title: 'Laundry Pickup',
    description: 'Schedule garment collection',
    image: images.requestLaundry,
  },
];

export const statusLabels: Record<RequestStatus, string> = {
  not_sent: 'Not Sent',
  sent: 'Request Sent',
  received: 'Request Received',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const statusColors: Record<RequestStatus, string> = {
  not_sent: '#465786',
  sent: '#3869d9',
  received: '#278bd6',
  in_progress: '#6858d8',
  completed: '#247d62',
};

export const statusFlow: RequestStatus[] = [
  'not_sent',
  'sent',
  'received',
  'in_progress',
  'completed',
];

export const defaultQuickRequestState = quickRequests.reduce<
  Record<string, QuickRequestState>
>((state, request) => {
  state[request.id] = {
    quantity: 1,
    status: 'not_sent',
  };

  return state;
}, {});

export const menuCategories: MenuCategory[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Drinks',
];

export const menuItems: MenuItem[] = [
  {
    id: 'classic_breakfast',
    category: 'Breakfast',
    title: 'Classic Breakfast',
    ingredients: 'Eggs, bacon, toast',
    description: 'Traditional morning favorite',
    price: 12,
    image: images.azureGrill,
  },
  {
    id: 'avocado_toast',
    category: 'Breakfast',
    title: 'Avocado Toast',
    ingredients: 'Avocado, sourdough, herbs',
    description: 'Fresh and nutritious choice',
    price: 11,
    image: images.offerSunday,
  },
  {
    id: 'pancake_stack',
    category: 'Breakfast',
    title: 'Pancake Stack',
    ingredients: 'Pancakes, berries, syrup',
    description: 'Sweet breakfast selection',
    price: 10,
    image: images.gardenCafe,
  },
  {
    id: 'omelette_deluxe',
    category: 'Breakfast',
    title: 'Omelette Deluxe',
    ingredients: 'Eggs, cheese, vegetables',
    description: 'Protein-rich morning meal',
    price: 13,
    image: images.offerMonday,
  },
  {
    id: 'fruit_bowl',
    category: 'Breakfast',
    title: 'Fruit Bowl',
    ingredients: 'Seasonal fresh fruits',
    description: 'Light and refreshing option',
    price: 9,
    image: images.diamondEvents,
  },
  {
    id: 'caesar_salad',
    category: 'Lunch',
    title: 'Caesar Salad',
    ingredients: 'Chicken, lettuce, parmesan',
    description: 'Classic salad with chicken',
    price: 14,
    image: images.sapphirePool,
  },
  {
    id: 'club_sandwich',
    category: 'Lunch',
    title: 'Club Sandwich',
    ingredients: 'Turkey, bacon, tomato',
    description: 'Popular lunch favorite',
    price: 15,
    image: images.skylineTerrace,
  },
  {
    id: 'margherita_pizza',
    category: 'Lunch',
    title: 'Margherita Pizza',
    ingredients: 'Mozzarella, tomato, basil',
    description: 'Authentic Italian flavor',
    price: 16,
    image: images.emeraldLounge,
  },
  {
    id: 'beef_burger',
    category: 'Lunch',
    title: 'Beef Burger',
    ingredients: 'Beef, cheese, lettuce',
    description: 'Juicy grilled beef burger',
    price: 18,
    image: images.prestigeClub,
  },
  {
    id: 'grilled_chicken',
    category: 'Lunch',
    title: 'Grilled Chicken',
    ingredients: 'Chicken, vegetables, herbs',
    description: 'Healthy grilled selection',
    price: 17,
    image: images.offerThursday,
  },
  {
    id: 'grilled_salmon',
    category: 'Dinner',
    title: 'Grilled Salmon',
    ingredients: 'Salmon, lemon, herbs',
    description: 'Fresh seafood experience',
    price: 24,
    image: images.offerFriday,
  },
  {
    id: 'ribeye_steak',
    category: 'Dinner',
    title: 'Ribeye Steak',
    ingredients: 'Beef steak, vegetables',
    description: 'Premium steakhouse classic',
    price: 32,
    image: images.offerMonday,
  },
  {
    id: 'seafood_pasta',
    category: 'Dinner',
    title: 'Seafood Pasta',
    ingredients: 'Shrimp, mussels, pasta',
    description: 'Rich Mediterranean flavors',
    price: 23,
    image: images.azureGrill,
  },
  {
    id: 'chicken_alfredo',
    category: 'Dinner',
    title: 'Chicken Alfredo',
    ingredients: 'Chicken, cream sauce',
    description: 'Comforting pasta favorite',
    price: 21,
    image: images.skylineTerrace,
  },
  {
    id: 'vegetable_risotto',
    category: 'Dinner',
    title: 'Vegetable Risotto',
    ingredients: 'Rice, vegetables, parmesan',
    description: 'Creamy vegetarian choice',
    price: 19,
    image: images.gardenCafe,
  },
  {
    id: 'espresso',
    category: 'Drinks',
    title: 'Espresso',
    ingredients: 'Premium coffee beans',
    description: 'Rich and intense flavor',
    price: 4,
    image: images.gardenCafe,
  },
  {
    id: 'cappuccino',
    category: 'Drinks',
    title: 'Cappuccino',
    ingredients: 'Espresso, steamed milk',
    description: 'Smooth coffee experience',
    price: 5,
    image: images.offerSunday,
  },
  {
    id: 'fresh_orange_juice',
    category: 'Drinks',
    title: 'Fresh Orange Juice',
    ingredients: 'Fresh squeezed oranges',
    description: 'Refreshing citrus beverage',
    price: 6,
    image: images.offerTuesday,
  },
  {
    id: 'sparkling_water',
    category: 'Drinks',
    title: 'Sparkling Water',
    ingredients: 'Premium mineral water',
    description: 'Perfect dining companion',
    price: 3,
    image: images.requestWater,
  },
  {
    id: 'signature_mocktail',
    category: 'Drinks',
    title: 'Signature Mocktail',
    ingredients: 'Seasonal fruits, mint',
    description: 'Refreshing alcohol-free drink',
    price: 7,
    image: images.offerThursday,
  },
];

export const venues: Venue[] = [
  {
    id: 'azure_grill',
    title: 'Azure Grill',
    hours: '07:00 AM - 11:00 PM',
    phone: '+1 (555) 201-1001',
    shortDescription: 'Premium international dining experience.',
    expandedDescription: [
      'Azure Grill offers a refined selection of international cuisine prepared with fresh seasonal ingredients. Guests can enjoy breakfast, lunch, and dinner in an elegant atmosphere overlooking the resort grounds.',
      'The venue combines modern culinary techniques with classic favorites, creating a memorable dining experience for every guest. Indoor and outdoor seating options are available throughout the day.',
    ],
    image: images.azureGrill,
    coordinate: {latitude: 51.5074, longitude: -0.1278},
  },
  {
    id: 'emerald_lounge',
    title: 'Emerald Lounge',
    hours: '10:00 AM - 01:00 AM',
    phone: '+1 (555) 201-1002',
    shortDescription: 'Signature cocktails and live music.',
    expandedDescription: [
      'Emerald Lounge is a sophisticated social venue designed for guests seeking premium beverages and relaxed entertainment. The lounge features handcrafted cocktails, premium spirits, and an extensive wine selection.',
      'Live performances and evening entertainment create a vibrant atmosphere ideal for meeting friends or unwinding after a busy day. Comfortable seating and attentive service complete the experience.',
    ],
    image: images.emeraldLounge,
    coordinate: {latitude: 51.5077, longitude: -0.1268},
  },
  {
    id: 'horizon_spa',
    title: 'Horizon Spa',
    hours: '08:00 AM - 09:00 PM',
    phone: '+1 (555) 201-1003',
    shortDescription: 'Luxury wellness and relaxation center.',
    expandedDescription: [
      'Horizon Spa provides a complete wellness experience with massages, body treatments, and beauty services. Professional therapists offer personalized treatments designed to restore balance and relaxation.',
      'Guests can enjoy private treatment rooms, wellness programs, and premium spa facilities. The tranquil environment creates the perfect escape from daily stress.',
    ],
    image: images.horizonSpa,
    coordinate: {latitude: 51.5069, longitude: -0.1286},
  },
  {
    id: 'sapphire_pool',
    title: 'Sapphire Pool',
    hours: '08:00 AM - 08:00 PM',
    phone: '+1 (555) 201-1004',
    shortDescription: 'Resort pool with premium service.',
    expandedDescription: [
      'Sapphire Pool offers a spacious outdoor swimming area surrounded by comfortable loungers and cabanas. Guests can relax poolside while enjoying refreshments and attentive service throughout the day.',
      'The area is ideal for both leisure and family-friendly activities. Dedicated staff ensure a comfortable and enjoyable experience for all visitors.',
    ],
    image: images.sapphirePool,
    coordinate: {latitude: 51.5065, longitude: -0.1272},
  },
  {
    id: 'skyline_terrace',
    title: 'Skyline Terrace',
    hours: '05:00 PM - 12:00 AM',
    phone: '+1 (555) 201-1005',
    shortDescription: 'Rooftop venue with scenic views.',
    expandedDescription: [
      'Skyline Terrace provides panoramic views of the surrounding area in a stylish rooftop setting. Guests can enjoy light dining options, premium drinks, and a sophisticated atmosphere.',
      'The venue is particularly popular during sunset and evening hours. Comfortable seating and ambient lighting create an exceptional social experience.',
    ],
    image: images.skylineTerrace,
    coordinate: {latitude: 51.507, longitude: -0.1265},
  },
  {
    id: 'prestige_club',
    title: 'Prestige Club',
    hours: '06:00 PM - 02:00 AM',
    phone: '+1 (555) 201-1006',
    shortDescription: 'Exclusive entertainment and nightlife.',
    expandedDescription: [
      'Prestige Club delivers a premium nightlife experience with music, entertainment, and a vibrant atmosphere. The venue offers VIP seating areas and dedicated guest services.',
      'Professional entertainment programs and carefully curated events ensure an exciting evening for resort guests. Advanced reservations are recommended during peak periods.',
    ],
    image: images.prestigeClub,
    coordinate: {latitude: 51.5072, longitude: -0.129},
  },
  {
    id: 'garden_cafe',
    title: 'Garden Cafe',
    hours: '06:30 AM - 08:00 PM',
    phone: '+1 (555) 201-1007',
    shortDescription: 'Fresh coffee and light meals.',
    expandedDescription: [
      'Garden Cafe serves specialty coffee, pastries, sandwiches, and healthy snacks throughout the day. The relaxed atmosphere makes it an ideal location for casual meetings or quick refreshments.',
      'Guests can enjoy indoor seating or outdoor terrace tables surrounded by landscaped gardens. Fresh ingredients and friendly service define the cafe experience.',
    ],
    image: images.gardenCafe,
    coordinate: {latitude: 51.5078, longitude: -0.128},
  },
  {
    id: 'diamond_events',
    title: 'Diamond Events',
    hours: '09:00 AM - 10:00 PM',
    phone: '+1 (555) 201-1008',
    shortDescription: 'Private events and celebrations.',
    expandedDescription: [
      'Diamond Events specializes in hosting private gatherings, celebrations, and corporate functions within the resort. Flexible event spaces accommodate a variety of guest requirements and group sizes.',
      'Dedicated event coordinators assist with planning, catering, and venue arrangements. Every event is tailored to deliver a seamless and memorable experience.',
    ],
    image: images.diamondEvents,
    coordinate: {latitude: 51.508, longitude: -0.127},
  },
];

export const offers: Offer[] = [
  {
    id: 'monday_azure_grill_steak',
    dayIndex: 1,
    day: 'Monday',
    venue: 'Azure Grill',
    title: 'Steak Night Special',
    conditions: '20% off all premium steaks from 6 PM to 10 PM.',
    image: images.offerMonday,
  },
  {
    id: 'tuesday_emerald_lounge_cocktail',
    dayIndex: 2,
    day: 'Tuesday',
    venue: 'Emerald Lounge',
    title: 'Signature Cocktail Evening',
    conditions: 'Buy one signature cocktail and receive the second at 50% off.',
    image: images.offerTuesday,
  },
  {
    id: 'wednesday_horizon_spa_relax',
    dayIndex: 3,
    day: 'Wednesday',
    venue: 'Horizon Spa',
    title: 'Relaxation Package',
    conditions: 'Book any massage and receive complimentary sauna access.',
    image: images.offerWednesday,
  },
  {
    id: 'thursday_sapphire_pool_refresh',
    dayIndex: 4,
    day: 'Thursday',
    venue: 'Sapphire Pool',
    title: 'Poolside Refreshments',
    conditions: 'Complimentary mocktail with every poolside food order.',
    image: images.offerThursday,
  },
  {
    id: 'friday_skyline_terrace_sunset',
    dayIndex: 5,
    day: 'Friday',
    venue: 'Skyline Terrace',
    title: 'Sunset Dining Experience',
    conditions: 'Free dessert with every dinner reservation after 7 PM.',
    image: images.offerFriday,
  },
  {
    id: 'saturday_prestige_club_vip',
    dayIndex: 6,
    day: 'Saturday',
    venue: 'Prestige Club',
    title: 'VIP Night Access',
    conditions: 'Complimentary welcome drink for all guests before 9 PM.',
    image: images.offerSaturday,
  },
  {
    id: 'sunday_garden_cafe_pastry',
    dayIndex: 0,
    day: 'Sunday',
    venue: 'Garden Cafe',
    title: 'Coffee & Pastry Morning',
    conditions: 'Receive a free pastry with every specialty coffee purchase.',
    image: images.offerSunday,
  },
];

export const defaultClimate: ClimateSettings = {
  targetTemperature: 21,
  mode: 'Auto',
  fanSpeed: 'Medium',
};

export const climateModes: ClimateSettings['mode'][] = [
  'Cooling',
  'Heating',
  'Auto',
  'Fan',
];

export const fanSpeeds: FanSpeed[] = ['Low', 'Medium', 'High', 'Auto'];
