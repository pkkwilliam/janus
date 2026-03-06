import {CreateOrderRequest, subscriptionApi} from "@/lib/api/subscription";

export function usePaymentFlowV2() {
    const handlePremiumSubscription = async (isYearly: boolean = true) => {
        // This function is only called for authenticated users
        // setIsProcessing(true);

        try {
            // Step 1: Create order
            const createOrderRequest: CreateOrderRequest = {
                buyerSubscription: {
                    productId: isYearly ? "p-1" : "p-2", // p-1 = YEARLY, p-2 = MONTHLY
                },
            };

            const orderResponse = await subscriptionApi.createOrder(
                createOrderRequest
            );

            if (orderResponse.error) {
                throw new Error(orderResponse.error.message);
            }

            if (!orderResponse.data) {
                throw new Error("Failed to create order");
            }

            // Step 2: Request subscription payment
            const paymentResponse = await subscriptionApi.requestSubscriptionPayment(
                orderResponse.data.id
            );

            if (paymentResponse.error) {
                throw new Error(paymentResponse.error.message);
            }

            if (!paymentResponse.data) {
                throw new Error("Failed to get payment URL");
            }

            // Redirect to Stripe checkout
            window.location.href = paymentResponse.data.requestUrl;
        } catch (error) {
            console.error("Payment process failed:", error);
            alert("Payment process failed. Please try again.");
        } finally {
            // setIsProcessing(false);
        }
    };
    return {handlePremiumSubscription};
}