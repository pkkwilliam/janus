"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

interface ContactInfoProps {
  className?: string;
  showPhone?: boolean;
  showEmail?: boolean;
  variant?: "default" | "compact" | "card";
}

export const CONTACT_EMAIL = "fcookie.me@gmail.com";
export const CONTACT_PHONE = "+1 (236) 234-8383";
export const CONTACT_PHONE_RAW = "+12362348383";

export function ContactInfo({
  className = "",
  showPhone = true,
  showEmail = true,
  variant = "default",
}: ContactInfoProps) {
  const formatPhoneForDisplay = (phone: string) => {
    // Format: +1 (236) 234-8383
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const formatPhoneForLink = (phone: string) => {
    return phone.replace(/\s/g, "");
  };

  if (variant === "compact") {
    return (
      <div className={`flex flex-col gap-1 text-sm ${className}`}>
        {showEmail && (
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            {CONTACT_EMAIL}
          </a>
        )}
        {showPhone && (
          <a
            href={`tel:${formatPhoneForLink(CONTACT_PHONE_RAW)}`}
            className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            {formatPhoneForDisplay(CONTACT_PHONE_RAW)}
          </a>
        )}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`space-y-3 ${className}`}>
        {showEmail && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>
        )}
        {showPhone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Phone</p>
              <a
                href={`tel:${formatPhoneForLink(CONTACT_PHONE_RAW)}`}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
              >
                {formatPhoneForDisplay(CONTACT_PHONE_RAW)}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`space-y-4 ${className}`}>
      {showEmail && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email Support</h3>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-purple-300 hover:text-white transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <p className="text-purple-200 text-sm">
            For general inquiries, technical support, and account assistance.
          </p>
        </motion.div>
      )}
      {showPhone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone Support</h3>
              <a
                href={`tel:${formatPhoneForLink(CONTACT_PHONE_RAW)}`}
                className="text-purple-300 hover:text-white transition-colors"
              >
                {formatPhoneForDisplay(CONTACT_PHONE_RAW)}
              </a>
            </div>
          </div>
          <p className="text-purple-200 text-sm">
            Available for urgent inquiries and premium support.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default ContactInfo;
