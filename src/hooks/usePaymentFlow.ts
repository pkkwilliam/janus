"use client";

import { useState, useCallback } from "react";
import { subscriptionApi, CreateOrderRequest } from "@/lib/api/subscription";
import { PRODUCT_IDS } from "@/lib/constants/pricing";

interface PaymentState {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
}

interface UsePaymentFlowReturn {
  paymentState: PaymentState;
  initiatePayment: (isYearly: boolean) => Promise<void>;
  clearError: () => void;
  resetState: () => void;
}

export function usePaymentFlow(): UsePaymentFlowReturn {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isProcessing: false,
    error: null,
    success: false,
  });

  const clearError = useCallback(() => {
    setPaymentState(prev => ({ ...prev, error: null }));
  }, []);

  const resetState = useCallback(() => {
    setPaymentState({
      isProcessing: false,
      error: null,
      success: false,
    });
  }, []);

  const initiatePayment = useCallback(async (isYearly: boolean = true) => {
    setPaymentState({
      isProcessing: true,
      error: null,
      success: false,
    });

    try {
      // Step 1: Create order
      const createOrderRequest: CreateOrderRequest = {
        buyerSubscription: {
          productId: isYearly ? PRODUCT_IDS.YEARLY : PRODUCT_IDS.MONTHLY,
        },
      };

      const orderResponse = await subscriptionApi.createOrder(createOrderRequest);

      if (orderResponse.error) {
        throw new Error(orderResponse.error.message);
      }

      if (!orderResponse.data) {
        throw new Error("Failed to create order - no data received");
      }

      // Step 2: Request subscription payment
      const paymentResponse = await subscriptionApi.requestSubscriptionPayment(
        orderResponse.data.id
      );

      if (paymentResponse.error) {
        throw new Error(paymentResponse.error.message);
      }

      if (!paymentResponse.data?.requestUrl) {
        throw new Error("Failed to get payment URL");
      }

      // Success - redirect to Stripe checkout
      setPaymentState({
        isProcessing: false,
        error: null,
        success: true,
      });

      // Use a secure redirect method
      if (typeof window !== 'undefined') {
        window.location.href = paymentResponse.data.requestUrl;
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred during payment processing";
      
      console.error("Payment process failed:", error);
      
      setPaymentState({
        isProcessing: false,
        error: errorMessage,
        success: false,
      });
    }
  }, []);

  return {
    paymentState,
    initiatePayment,
    clearError,
    resetState,
  };
}