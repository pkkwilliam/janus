"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ErrorNotificationProps {
  error: string | null;
  onDismiss: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  className?: string;
}

export function ErrorNotification({
  error,
  onDismiss,
  autoHide = true,
  autoHideDelay = 5000,
  className = "",
}: ErrorNotificationProps) {
  useEffect(() => {
    if (error && autoHide) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [error, autoHide, autoHideDelay, onDismiss]);

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-4 right-4 z-50 max-w-md ${className}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-red-800 mb-1">
                  Payment Error
                </h3>
                <p className="text-sm text-red-700 leading-relaxed">
                  {error}
                </p>
              </div>
              <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Dismiss error notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SuccessNotificationProps {
  message: string | null;
  onDismiss: () => void;
  autoHide?: boolean;
  autoHideDelay?: number;
  className?: string;
}

export function SuccessNotification({
  message,
  onDismiss,
  autoHide = true,
  autoHideDelay = 3000,
  className = "",
}: SuccessNotificationProps) {
  useEffect(() => {
    if (message && autoHide) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [message, autoHide, autoHideDelay, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-4 right-4 z-50 max-w-md ${className}`}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="bg-green-50 border border-green-200 rounded-2xl shadow-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-green-700 leading-relaxed">
                  {message}
                </p>
              </div>
              <button
                onClick={onDismiss}
                className="flex-shrink-0 p-1 rounded-lg text-green-500 hover:text-green-700 hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                aria-label="Dismiss success notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}