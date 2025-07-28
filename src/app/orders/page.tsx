'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Package, Calendar, DollarSign, CheckCircle, Clock, XCircle, RefreshCw, Crown } from 'lucide-react';
import Link from 'next/link';
import { useAppInit } from '@/hooks/useAppInit';
import { subscriptionApi, Order, OrdersPaginationResponse } from '@/lib/api/subscription';

export default function OrdersPage() {
  const { isAuthenticated } = useAppInit({ requireAuth: true });
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);  
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  
  const pageSize = 10;

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders(currentPage);
    }
  }, [isAuthenticated, currentPage]);

  const fetchOrders = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await subscriptionApi.getOrdersPagination(page, pageSize);
      
      if (response.error) {
        setError(response.error.message);
        return;
      }

      if (response.data) {
        setOrders(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      }
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Orders fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePayment = async (orderId: string) => {
    setProcessingPayment(orderId);
    
    try {
      const response = await subscriptionApi.requestSubscriptionPayment(orderId);
      
      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data) {
        throw new Error('Failed to get payment URL');
      }

      // Redirect to Stripe checkout
      window.location.href = response.data.requestUrl;
      
    } catch (error) {
      console.error('Payment process failed:', error);
      alert('Payment process failed. Please try again.');
      setProcessingPayment(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'PAYMENT_PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'REFUNDED':
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-600 bg-green-50';
      case 'PAYMENT_PENDING':
        return 'text-yellow-600 bg-yellow-50';
      case 'CANCELLED':
        return 'text-red-600 bg-red-50';
      case 'REFUNDED':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getProductName = (productId: string) => {
    switch (productId) {
      case 'p-1':
        return 'Premium Annual Subscription';
      case 'p-2':
        return 'Premium Monthly Subscription';
      default:
        return 'Premium Subscription';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (!isAuthenticated) {
    return null; // useAppInit will handle redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-3xl font-light text-gray-900">Order History</h1>
              <p className="text-gray-600">View and manage your subscription orders</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-indigo-500" />
                <div>
                  <div className="text-2xl font-semibold text-gray-900">{totalElements}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
              </div>
            </div>
            
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {orders.filter(order => order.status === 'PAID').length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {orders.filter(order => order.status === 'PAYMENT_PENDING').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600">Loading orders...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Orders</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fetchOrders(currentPage)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </motion.button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-6">You haven't made any orders yet. Start by subscribing to Premium!</p>
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Crown className="w-5 h-5" />
                  View Pricing Plans
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Order #{order.id.slice(-8)}</span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {order.items.map(item => getProductName(item.productId)).join(', ')}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createTime)}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${order.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {order.status === 'PAYMENT_PENDING' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCompletePayment(order.id)}
                          disabled={processingPayment === order.id}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {processingPayment === order.id ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              Processing...
                            </>
                          ) : (
                            'Complete Payment'
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                      currentPage === i
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-xl bg-white shadow-sm border border-gray-200 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}