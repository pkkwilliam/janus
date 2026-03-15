'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Package, Calendar, DollarSign, CheckCircle, Clock, XCircle, RefreshCw, Crown, X, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAppInit } from '@/hooks/useAppInit';
import { subscriptionApi, Order, OrdersPaginationResponse } from '@/lib/api/subscription';

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 50 }}
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ${
        type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
      }`}
    >
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// Refund Modal Component
function RefundModal({ 
  order, 
  isOpen, 
  onClose, 
  onSubmit, 
  isProcessing 
}: { 
  order: Order | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (reason: string, amount: string, keepFee: boolean) => void;
  isProcessing: boolean;
}) {
  const [reason, setReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [keepFee, setKeepFee] = useState(true);

  useEffect(() => {
    if (order) {
      const maxAmount = order.totalAmount;
      setRefundAmount(keepFee ? Math.max(0, maxAmount - 3).toFixed(2) : maxAmount.toFixed(2));
    }
  }, [order, keepFee]);

  useEffect(() => {
    if (!isOpen) {
      setReason('');
      setKeepFee(true);
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const maxRefund = order.totalAmount;
  const minFee = 3;

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setRefundAmount('');
      return;
    }
    if (numValue > maxRefund) {
      setRefundAmount(maxRefund.toFixed(2));
    } else if (numValue < 0) {
      setRefundAmount('0');
    } else {
      setRefundAmount(value);
    }
  };

  const actualRefund = keepFee ? Math.max(0, parseFloat(refundAmount || '0') - minFee).toFixed(2) : refundAmount;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Request Refund</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Order #{order.id.slice(-8)} • ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-gray-700">
              We&apos;re sorry to see you go. To help us improve, could you let us know why you&apos;re requesting a refund?
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for refund (optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us what went wrong..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none text-sm"
                rows={3}
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepFee}
                  onChange={(e) => setKeepFee(e.target.checked)}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <div className="text-sm">
                  <span className="font-medium text-amber-900">Support our small team?</span>
                  <p className="text-amber-800 mt-1">
                    Would you be okay leaving ${minFee} to help cover transaction fees and processing costs? 
                    This helps us keep the lights on and continue improving our service.
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund amount (max: ${maxRefund.toFixed(2)})
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  max={maxRefund}
                  min={0}
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                />
              </div>
              {keepFee && parseFloat(refundAmount || '0') > 0 && (
                <p className="text-xs text-amber-700 mt-2">
                  You&apos;ll receive ${actualRefund} after the ${minFee} processing fee.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSubmit(reason, refundAmount, keepFee)}
              disabled={isProcessing || !refundAmount || parseFloat(refundAmount) <= 0}
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </>
              ) : (
                'Submit Refund'
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function OrdersPage() {
  const { isAuthenticated } = useAppInit({ requireAuth: true });
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);  
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  const [processingRefund, setProcessingRefund] = useState<string | null>(null);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
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

      window.location.href = response.data.requestUrl;
      
    } catch (error) {
      console.error('Payment process failed:', error);
      setToast({ message: 'Payment process failed. Please try again.', type: 'error' });
      setProcessingPayment(null);
    }
  };

  const openRefundModal = (order: Order) => {
    setSelectedOrder(order);
    setRefundModalOpen(true);
  };

  const handleRequestRefund = async (reason: string, amount: string, keepFee: boolean) => {
    if (!selectedOrder) return;
    
    setProcessingRefund(selectedOrder.id);
    
    try {
      const finalAmount = keepFee 
        ? (parseFloat(amount) - 3).toFixed(2) 
        : amount;
      
      const response = await subscriptionApi.requestRefund(
        selectedOrder.id,
        finalAmount,
        selectedOrder.internalTransactionId || ''
      );
      
      if (response.error) {
        throw new Error(response.error.message);
      }

      if (!response.data) {
        throw new Error('Failed to process refund request');
      }

      setRefundModalOpen(false);
      setToast({ message: 'Refund request submitted successfully', type: 'success' });
      fetchOrders(currentPage);
      
    } catch (error) {
      console.error('Refund request failed:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to submit refund request', type: 'error' });
    } finally {
      setProcessingRefund(null);
      setSelectedOrder(null);
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
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* Refund Modal */}
      <AnimatePresence>
        {refundModalOpen && (
          <RefundModal
            order={selectedOrder}
            isOpen={refundModalOpen}
            onClose={() => {
              setRefundModalOpen(false);
              setSelectedOrder(null);
            }}
            onSubmit={handleRequestRefund}
            isProcessing={processingRefund !== null}
          />
        )}
      </AnimatePresence>

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
              <p className="text-gray-600 mb-6">You haven&apos;t made any orders yet. Start by subscribing to Premium!</p>
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
                      {order.status === 'PAID' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openRefundModal(order)}
                          disabled={processingRefund === order.id}
                          className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors text-sm flex items-center gap-2 border border-transparent hover:border-gray-200"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Request Refund
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
