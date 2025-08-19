"use client";

import { motion } from "framer-motion";
import { FAQS, GLASS_MORPHISM_STYLES, ANIMATION_VARIANTS } from "@/lib/constants/pricing";

interface FAQItemProps {
  faq: typeof FAQS[0];
  index: number;
}

function FAQItem({ faq, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 rounded-3xl"
      style={GLASS_MORPHISM_STYLES.light}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
    </motion.div>
  );
}

interface FAQSectionProps {
  className?: string;
}

export function FAQSection({ className = "" }: FAQSectionProps) {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          {...ANIMATION_VARIANTS.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}