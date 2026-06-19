import type {ImageSourcePropType} from 'react-native';

export type TabKey =
  | 'home'
  | 'requests'
  | 'dining'
  | 'venues'
  | 'offers'
  | 'climate';

export type RequestStatus =
  | 'not_sent'
  | 'sent'
  | 'received'
  | 'in_progress'
  | 'completed';

export type QuickRequest = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export type QuickRequestState = {
  quantity: number;
  status: RequestStatus;
};

export type MenuCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Drinks';

export type MenuItem = {
  id: string;
  category: MenuCategory;
  title: string;
  ingredients: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
};

export type CartItem = {
  itemId: string;
  quantity: number;
};

export type Venue = {
  id: string;
  title: string;
  hours: string;
  phone: string;
  shortDescription: string;
  expandedDescription: [string, string];
  image: ImageSourcePropType;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type Offer = {
  id: string;
  dayIndex: number;
  day: string;
  venue: string;
  title: string;
  conditions: string;
  image: ImageSourcePropType;
};

export type ClimateMode = 'Cooling' | 'Heating' | 'Auto' | 'Fan';

export type FanSpeed = 'Low' | 'Medium' | 'High' | 'Auto';

export type ClimateSettings = {
  targetTemperature: number;
  mode: ClimateMode;
  fanSpeed: FanSpeed;
};
