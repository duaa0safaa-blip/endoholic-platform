'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PaymentMethod = 'iq' | 'int';

type SubscriptionContextValue = {
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (value: boolean) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('iq');

  // Persist subscription in localStorage so access survives refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem('endoholic:isSubscribed');
      if (stored === 'true') setIsSubscribed(true);
    } catch (e) {
      // ignore (SSR safety)
    }
  }, []);

  useEffect(() => {
    try {
      if (isSubscribed) localStorage.setItem('endoholic:isSubscribed', 'true');
      else localStorage.removeItem('endoholic:isSubscribed');
    } catch (e) {}
  }, [isSubscribed]);

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, setIsSubscribed, showPaymentModal, setShowPaymentModal, paymentMethod, setPaymentMethod }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within a SubscriptionProvider');
  return ctx;
}
