import { CartItem } from './cart-item.model';

export interface PaymentMethod {
  name: string;
  code: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'confirmed';
  orderDate: Date;
}
