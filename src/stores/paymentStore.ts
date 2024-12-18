import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  PaymentStatus,
  PaymentTransaction
} from '../types/payment';

interface PaymentStore {
  transactions: Record<string, PaymentTransaction>;
  addTransaction: (
    transactionId: string, 
    data: Omit<PaymentTransaction, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ) => void;
  getTransaction: (transactionId: string) => PaymentTransaction | undefined;
  updateTransaction: (transactionId: string, status: PaymentStatus) => void;
  clearTransaction: (transactionId: string) => void;
  clearAllTransactions: () => void;
}

// Create the store with persistence
export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      transactions: {},

      addTransaction: (transactionId, data) => 
        set((state) => ({
          transactions: {
            ...state.transactions,
            [transactionId]: {
              id: transactionId,
              status: 'pending',
              ...data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          },
        })),

      getTransaction: (transactionId) => get().transactions[transactionId],

      updateTransaction: (transactionId, status) => 
        set((state) => {
          const transaction = state.transactions[transactionId];
          if (!transaction) return state;

          // Don't update if the status is already complete or cancelled
          if (transaction.status === 'complete' || transaction.status === 'cancelled') {
            return state;
          }

          return {
            transactions: {
              ...state.transactions,
              [transactionId]: {
                ...transaction,
                status,
                updatedAt: new Date().toISOString(),
              },
            },
          };
        }),

      clearTransaction: (transactionId) =>
        set((state) => {
          const { [transactionId]: _, ...rest } = state.transactions;
          return { transactions: rest };
        }),

      clearAllTransactions: () => set({ transactions: {} }),
    }),
    {
      name: 'payment-store',
      partialize: (state) => ({
        transactions: Object.fromEntries(
          Object.entries(state.transactions).filter(
            ([_, transaction]) => 
              transaction.status !== 'complete' && 
              transaction.status !== 'cancelled'
          )
        ),
      }),
    }
  )
);
