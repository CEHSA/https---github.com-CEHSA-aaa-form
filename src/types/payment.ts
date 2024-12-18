// Common payment status types
export type OzowStatus = 'Complete' | 'Cancelled' | 'Error' | 'Pending' | 'Processing' | 'Failed' | 'Unknown';
export type PaymentStatus = 'pending' | 'complete' | 'cancelled' | 'error' | 'failed' | 'processing';
export type PaymentDisplayStatus = 'Pending' | 'Complete' | 'Cancelled' | 'Error' | 'success' | 'cancel' | 'notify' | OzowStatus;

// Supported currency and country codes
export const SUPPORTED_CURRENCIES = ['ZAR'] as const;
export const SUPPORTED_COUNTRIES = ['ZAF'] as const;
export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];
export type SupportedCountry = typeof SUPPORTED_COUNTRIES[number];

// Ozow API types
export interface OzowPaymentData {
  SiteCode: string;
  CountryCode: SupportedCountry;
  CurrencyCode: SupportedCurrency;
  Amount: string;
  TransactionReference: string;
  BankReference: string;
  Optional1?: string;
  Optional2?: string;
  Optional3?: string;
  Optional4?: string;
  Optional5?: string;
  CancelUrl: string;
  SuccessUrl: string;
  NotifyUrl: string;
  IsTest: string;
  HashCheck?: string;
  ApiKey?: string;
}

export interface OzowNotification {
  TransactionId: string;
  TransactionReference: string;
  Amount: string;
  Status: OzowStatus;
  CurrencyCode: SupportedCurrency;
  BankReference: string;
  IsTest: string;
  Optional1?: string;
  Optional2?: string;
  Optional3?: string;
  Optional4?: string;
  Optional5?: string;
  HashCheck: string;
}

export interface OzowTransactionStatus {
  transactionId: string;
  transactionReference: string;
  amount: string;
  status: OzowStatus;
  currencyCode: SupportedCurrency;
  bankReference: string;
  isTest: boolean;
  optional1?: string;
  optional2?: string;
  optional3?: string;
  optional4?: string;
  optional5?: string;
}

export interface PaymentResponse {
  status: 'success' | 'error';
  paymentUrl?: string;
  error?: string;
  transactionId?: string;
  message?: string;
  code?: string;
}

// Status mapping helper
export const mapOzowStatusToInternal = (status: OzowStatus): PaymentStatus => {
  switch (status.toLowerCase()) {
    case 'complete':
      return 'complete';
    case 'cancelled':
      return 'cancelled';
    case 'error':
    case 'failed':
      return 'error';
    case 'processing':
      return 'processing';
    default:
      return 'pending';
  }
};

// Store types
export interface PaymentStoreType {
  transactions: Record<string, PaymentTransaction>;
  addTransaction: (transactionId: string, data: Omit<PaymentTransaction, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateTransaction: (transactionId: string, status: PaymentStatus) => void;
  getTransaction: (transactionId: string) => PaymentTransaction | undefined;
  getState: () => PaymentStoreType;
}

export interface PaymentTransaction {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    bankRef: string;
    transactionRef: string;
    [key: string]: string;
  };
}

export interface PaymentState {
  status: PaymentDisplayStatus;
  transactionId: string | null;
  error: string | null;
}

export interface PaymentFormData {
  amount: number;
  currency: string;
  reference: string;
}
