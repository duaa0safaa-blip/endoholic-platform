'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type PaymentMethod = 'zain_cash' | 'switch_card';

type SubscriptionContextValue = {
  isSubscribed: boolean;
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (value: boolean) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : sessionStorage.getItem('endoholic:book-access-token'),
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('zain_cash');

  useEffect(() => {
    if (accessToken) sessionStorage.setItem('endoholic:book-access-token', accessToken);
    else sessionStorage.removeItem('endoholic:book-access-token');
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let cancelled = false;
    const checkStatus = async () => {
      const response = await fetch(`/api/orders/status?token=${encodeURIComponent(accessToken)}`);
      if (response.ok) {
        const result = await response.json();
        if (!cancelled) setIsSubscribed(result.status === 'verified');
      }
    };

    void checkStatus();
    const interval = window.setInterval(checkStatus, 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [accessToken]);

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, accessToken, setAccessToken, showPaymentModal, setShowPaymentModal, paymentMethod, setPaymentMethod }}
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
