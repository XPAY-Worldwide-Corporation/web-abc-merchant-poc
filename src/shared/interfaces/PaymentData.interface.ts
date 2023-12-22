import { Merchant } from '../data/Merchants';

export interface PaymentData {
  amount: number;
  card: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
  };
  currency: string;
  email: string;
  merchant?: Merchant;
  message?: string;
  name: string;
}
