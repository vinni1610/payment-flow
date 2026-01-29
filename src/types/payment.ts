export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: string;
}
export type FormErrors = Partial<Record<keyof PaymentFormData, string>>;

export interface TransactionReceipt {
  cardholderName: string;
  maskedCardNumber: string;
  expiryDate: string;
  amount: string;
  transactionId: string;
  status: 'Success' | 'Failed';
  timestamp: string;
}

export interface ValidationErrors {
  cardholderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  amount?: string;
}
