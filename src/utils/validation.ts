import type { PaymentFormData, FormErrors } from "@/types/payment";

/* ---------------- Validators ---------------- */

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return /^\d{16}$/.test(cleaned);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) return false;

  const [month, year] = expiryDate.split("/");
  const expiry = new Date(2000 + Number(year), Number(month) - 1);
  return expiry > new Date();
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateAmount = (amount: string): boolean => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};


/* ---------------- Form validation ---------------- */

export const validateForm = (data: PaymentFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.cardholderName.trim()) {
    errors.cardholderName = "Cardholder name is required";
  }

  if (!data.cardNumber) {
    errors.cardNumber = "Card number is required";
  } else if (!validateCardNumber(data.cardNumber)) {
    errors.cardNumber = "Invalid card number (must be 16 digits)";
  }

  if (!data.expiryDate) {
    errors.expiryDate = "Expiry date is required";
  } else if (!validateExpiryDate(data.expiryDate)) {
    errors.expiryDate = "Invalid or expired date (MM/YY)";
  }

  if (!data.cvv) {
    errors.cvv = "CVV is required";
  } else if (!validateCVV(data.cvv)) {
    errors.cvv = "Invalid CVV (3–4 digits)";
  }

  if (!validateAmount(data.amount)) {
    errors.amount = "Amount must be greater than 0";
  }

  return errors;
};

/* ---------------- Helpers ---------------- */

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, "");
  return `**** **** **** ${cleaned.slice(-4)}`;
};

export const generateTransactionId = (): string => {
  return `TXN-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 11)
    .toUpperCase()}`;
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "");
  return cleaned.match(/.{1,4}/g)?.join(" ") ?? cleaned;
};

export const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.length >= 2
    ? `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
    : cleaned;
};
