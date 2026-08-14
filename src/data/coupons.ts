import { Coupon } from '../types';

export const COUPONS: Coupon[] = [
  {
    code: 'VELVET15',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 1000,
    description: '15% off on orders above ৳1,000',
  },
  {
    code: 'SWEET500',
    discountType: 'fixed',
    discountValue: 500,
    minSpend: 2500,
    description: 'Flat ৳500 off on gourmet orders above ৳2,500',
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 150,
    minSpend: 1200,
    description: 'Free standard delivery across Dhaka',
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 500,
    description: '10% off welcome treat for your first bake',
  }
];
