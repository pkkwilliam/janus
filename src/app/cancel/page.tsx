'use client';

import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw, Crown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CancelPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div
            className="p-8 rounded-3xl border border-white/30 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              borderColor: '#ef4444',
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 w-fit mx-auto mb-6"
            >
              <XCircle className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Payment Cancelled
            </h1>
            <p className="text-gray-600 mb-8">
              Your subscription payment was cancelled or failed to process. No charges have been made to your account.
            </p>

            {/* Common reasons */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                Common reasons for payment failure:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/30 rounded-xl">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <strong>Insufficient funds</strong> - Check your account balance
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/30 rounded-xl">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <strong>Card expired</strong> - Update your payment method
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/30 rounded-xl">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <strong>Bank declined</strong> - Contact your bank or try a different card
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/30 rounded-xl">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    <strong>Incorrect details</strong> - Double-check card information
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <Link href="/pricing">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-medium transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again with Different Payment
                  <Crown className="w-5 h-5" />
                </motion.button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Dashboard
                  </motion.button>
                </Link>

                <Link href="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:border-gray-400 hover:bg-white/50 transition-colors"
                  >
                    <Crown className="w-4 h-4" />
                    View Plans
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>

          {/* Help section */}
          <div
            className="p-6 rounded-3xl border border-white/30"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If you continue to experience issues, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-colors text-sm">
                Contact Support
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm">
                FAQ
              </button>
            </div>
          </div>

          {transactionId && (
            <p className="text-xs text-gray-500 text-center mt-6">
              Transaction ID: {transactionId}
            </p>
          )}

          <p className="text-xs text-gray-500 text-center mt-2">
            You can continue using our free features while resolving payment issues.
          </p>
        </motion.div>
      </div>
    </div>
  );
}