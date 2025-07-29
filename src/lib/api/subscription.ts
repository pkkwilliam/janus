import { apiClient, ApiResponse } from "./client";
import { API_ENDPOINTS } from "./config";

export interface SubscriptionRequest {
  autoRenew: boolean;
  subscribeType: "MONTH" | "YEAR";
}

export interface SubscriptionResponse {
  sessionId: string;
  requestUrl: string;
}

export interface SubscriptionStatusResponse {
  result: "SUCCESS" | "FAIL" | "REPEAT_QUERY";
  nextQueryInterval: string;
}

// New interfaces for the two-step payment process
export interface CreateOrderRequest {
  buyerSubscription: {
    productId: "p-1" | "p-2"; // p-1 = YEARLY, p-2 = MONTHLY
  };
}

export interface OrderItem {
  productId: string;
  totalPrice: number;
  subscriptionInfo: {
    message: string | null;
    productId: string;
    recipientEmail: string | null;
    gift: boolean;
  };
}

export interface CreateOrderResponse {
  id: string;
  createTime: string;
  items: OrderItem[];
  status: "PAYMENT_PENDING";
  totalAmount: number;
  updateTime: string | null;
  userId: string;
}

export interface RequestSubscriptionPaymentResponse {
  requestUrl: string;
  transactionId: string;
}

// Orders pagination interfaces
export interface OrdersPaginationRequest {
  pageRequest: number;
  pageSize: number;
}

export interface Order {
  id: string;
  createTime: string;
  items: OrderItem[];
  status: "PAID" | "PAYMENT_PENDING" | "CANCELLED" | "REFUNDED";
  totalAmount: number;
  updateTime: string | null;
  userId: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface OrdersPaginationResponse {
  content: Order[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export const subscriptionApi = {
  async createSubscription(
    request: SubscriptionRequest
  ): Promise<ApiResponse<SubscriptionResponse>> {
    return apiClient.post<SubscriptionResponse>(
      API_ENDPOINTS.PAYMENT.CREATE_SUBSCRIPTION,
      request
    );
  },

  async getSubscriptionStatus(
    transactionId: string
  ): Promise<ApiResponse<SubscriptionStatusResponse>> {
    const endpoint = API_ENDPOINTS.PAYMENT.SUBSCRIPTION_STATUS.replace(
      ":transactionId",
      transactionId
    );
    return apiClient.get<SubscriptionStatusResponse>(endpoint);
  },

  // New two-step payment methods
  async createOrder(
    request: CreateOrderRequest
  ): Promise<ApiResponse<CreateOrderResponse>> {
    return apiClient.post<CreateOrderResponse>(
      API_ENDPOINTS.PAYMENT.CREATE_ORDER,
      request
    );
  },

  async requestSubscriptionPayment(
    orderId: string
  ): Promise<ApiResponse<RequestSubscriptionPaymentResponse>> {
    const endpoint = API_ENDPOINTS.PAYMENT.REQUEST_SUBSCRIPTION_PAYMENT.replace(
      ":orderId",
      orderId
    );
    return apiClient.get<RequestSubscriptionPaymentResponse>(endpoint);
  },

  // Orders pagination
  async getOrdersPagination(
    pageRequest: number = 0,
    pageSize: number = 20
  ): Promise<ApiResponse<OrdersPaginationResponse>> {
    const endpoint = `${API_ENDPOINTS.PAYMENT.ORDER_PAGINATION}?pageRequest=${pageRequest}&pageSize=${pageSize}`;
    return apiClient.get<OrdersPaginationResponse>(endpoint);
  },
};
