export interface DeliveryZone {
  id: string;
  name: string;
  deliveryFee: number;
  estimatedHours: string;
  isSameDayAvailable: boolean;
}

export const DHAKA_DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'gulshan', name: 'Gulshan 1 & 2', deliveryFee: 120, estimatedHours: '1-2 hours', isSameDayAvailable: true },
  { id: 'banani', name: 'Banani & Banani DOHS', deliveryFee: 120, estimatedHours: '1-2 hours', isSameDayAvailable: true },
  { id: 'dhanmondi', name: 'Dhanmondi & Lalmatia', deliveryFee: 150, estimatedHours: '2-3 hours', isSameDayAvailable: true },
  { id: 'uttara', name: 'Uttara (All Sectors)', deliveryFee: 180, estimatedHours: '2-3 hours', isSameDayAvailable: true },
  { id: 'bashundhara', name: 'Bashundhara R/A & Baridhara', deliveryFee: 130, estimatedHours: '1-2 hours', isSameDayAvailable: true },
  { id: 'mohakhali', name: 'Mohakhali & DOHS', deliveryFee: 130, estimatedHours: '1-2 hours', isSameDayAvailable: true },
  { id: 'mirpur', name: 'Mirpur (All Sections) & DOHS', deliveryFee: 160, estimatedHours: '2-4 hours', isSameDayAvailable: true },
  { id: 'badda', name: 'Badda, Rampura & Aftabnagar', deliveryFee: 150, estimatedHours: '2-3 hours', isSameDayAvailable: true },
  { id: 'mohammadpur', name: 'Mohammadpur & Shyamoli', deliveryFee: 160, estimatedHours: '2-3 hours', isSameDayAvailable: true },
  { id: 'old-dhaka', name: 'Old Dhaka & Motijheel', deliveryFee: 190, estimatedHours: '3-4 hours', isSameDayAvailable: true },
  { id: 'khilgaon', name: 'Khilgaon, Malibagh & Shantinagar', deliveryFee: 160, estimatedHours: '2-3 hours', isSameDayAvailable: true },
  { id: 'outside-dhaka', name: 'Greater Dhaka Suburbs / Savar / Gazipur', deliveryFee: 250, estimatedHours: 'Next Day Courier Boxed', isSameDayAvailable: false },
];

export const DELIVERY_TIME_SLOTS = [
  'Morning Fresh (10:00 AM - 01:00 PM)',
  'Afternoon Tea (01:00 PM - 04:00 PM)',
  'Evening Celebration (04:00 PM - 07:00 PM)',
  'Night Party (07:00 PM - 09:30 PM)',
];

export const OCCASIONS = [
  'Birthday Celebration',
  'Wedding & Reception',
  'Anniversary',
  'Baby Shower / Gender Reveal',
  'Corporate Milestone',
  'Graduation',
  'Eid / Festive Gathering',
  'Romantic Surprise',
  'Thank You / Appreciation',
];
