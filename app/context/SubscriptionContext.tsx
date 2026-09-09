'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type PaymentMethod = 'zain_cash' | 'switch_card';
export type OrderIdentity = { orderNumber: string; email: string };

type SubscriptionContextValue = {
  isSubscribed: boolean;
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  orderIdentity: OrderIdentity | null;
  setOrderIdentity: (value: OrderIdentity | null) => void;
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
  const [orderIdentity, setOrderIdentity] = useState<OrderIdentity | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('endoholic:book-order');
    if (!stored) return null;
    try {
      const parsed: unknown = JSON.parse(stored);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'orderNumber' in parsed &&
        'email' in parsed &&
        typeof parsed.orderNumber === 'string' &&
        typeof parsed.email === 'string'
      ) {
        return parsed as OrderIdentity;
      }
    } catch {
      sessionStorage.removeItem('endoholic:book-order');
    }
    return null;
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('zain_cash');

  useEffect(() => {
    if (accessToken) sessionStorage.setItem('endoholic:book-access-token', accessToken);
    else sessionStorage.removeItem('endoholic:book-access-token');
  }, [accessToken]);

  useEffect(() => {
    if (orderIdentity) sessionStorage.setItem('endoholic:book-order', JSON.stringify(orderIdentity));
    else sessionStorage.removeItem('endoholic:book-order');
  }, [orderIdentity]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let cancelled = false;
    const checkStatus = async () => {
      const response = await fetch(`/api/orders/status?token=${encodeURIComponent(accessToken)}`);
      if (response.ok) {
        const result = await response.json();
        if (!cancelled) {
          setIsSubscribed(result.status === 'verified');
          if (result.orderNumber && result.email) {
            setOrderIdentity({ orderNumber: result.orderNumber, email: result.email });
          }
        }
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
      value={{ isSubscribed, accessToken, setAccessToken, orderIdentity, setOrderIdentity, showPaymentModal, setShowPaymentModal, paymentMethod, setPaymentMethod }}
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
