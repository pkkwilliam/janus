'use client';

import { motion } from 'framer-motion';
import { Check, Star, Sparkles, Crown, ArrowRight, Gift, Shield } from 'lucide-react';
import Link from 'next/link';
import { useAppInit } from '@/hooks/useAppInit';
import { Footer } from '@/components/ui/footer';
import { subscriptionApi, CreateOrderRequest } from '@/lib/api/subscription';
import { useState } from 'react';

export function PricingClient() {
  const { isAuthenticated } = useAppInit({ requireAuth: false });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isYearly, setIsYearly] = useState(true);

  const handlePremiumSubscription = async (isYearly: boolean = true) => {
    // This function is only called for authenticated users
    setIsProcessing(true);
    
    try {
      // Step 1: Create order
      const createOrderRequest: CreateOrderRequest = {
        buyerSubscription: {
          productId: isYearly ? "p-1" : "p-2" // p-1 = YEARLY, p-2 = MONTHLY
        }
      };

      const orderResponse = await subscriptionApi.createOrder(createOrderRequest);
      
      if (orderResponse.error) {
        throw new Error(orderResponse.error.message);
      }

      if (!orderResponse.data) {
        throw new Error('Failed to create order');
      }

      // Step 2: Request subscription payment
      const paymentResponse = await subscriptionApi.requestSubscriptionPayment(orderResponse.data.id);
      
      if (paymentResponse.error) {
        throw new Error(paymentResponse.error.message);
      }

      if (!paymentResponse.data) {
        throw new Error('Failed to get payment URL');
      }

      // Redirect to Stripe checkout
      window.location.href = paymentResponse.data.requestUrl;
      
    } catch (error) {
      console.error('Payment process failed:', error);
      alert('Payment process failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-gradient-radial from-blue-100/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute -top-12 right-1/4 w-64 h-64 bg-gradient-radial from-purple-100/30 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div
                className="relative p-6 rounded-3xl"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Crown className="w-12 h-12 text-amber-500" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Choose Your Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unlock the full power of personalized fortune telling with premium insights and guidance
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div
                  className="p-8 rounded-3xl border border-gray-200 h-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">Free Journey</h3>
                    <div className="text-4xl font-light text-gray-900 mb-1">$0</div>
                    <div className="text-gray-600">Forever free</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {freeFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={isAuthenticated ? "/dashboard" : "/auth/login"}
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-2xl font-medium text-gray-700 transition-all border border-gray-300 hover:border-gray-400"
                      style={{
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {isAuthenticated ? "Access Dashboard" : "Get Started Free"}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className="px-6 py-2 rounded-full text-sm font-medium text-white"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    Most Popular
                  </div>
                </div>

                <div
                  className="p-8 rounded-3xl border-2 h-full relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                    backdropFilter: "blur(20px)",
                    borderColor: "#667eea",
                    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.2)",
                  }}
                >
                  {/* Floating sparkles */}
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-6 h-6 text-amber-400 opacity-50" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Gift className="w-5 h-5 text-purple-400 opacity-30" />
                  </div>

                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-medium text-gray-900 mb-2">Premium Journey</h3>
                    
                    {/* Pricing Toggle */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-gray-100 rounded-xl p-1 flex">
                        <button
                          onClick={() => setIsYearly(true)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            isYearly 
                              ? 'bg-white text-gray-900 shadow-sm' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Yearly
                        </button>
                        <button
                          onClick={() => setIsYearly(false)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            !isYearly 
                              ? 'bg-white text-gray-900 shadow-sm' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="text-4xl font-light text-gray-900">
                        ${isYearly ? '1.6' : '3'}
                      </div>
                      <div className="text-gray-600">/month</div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {isYearly ? 'Save 47% vs monthly • $19.20/year' : '$3/month • No commitment'}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {premiumFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {!isAuthenticated ? (
                    <div className="space-y-3">
                      <Link href="/auth/login">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-medium transition-all"
                          style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                          }}
                        >
                          <Crown className="w-5 h-5" />
                          Sign In to Get Premium
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                      <p className="text-xs text-center text-gray-500">
                        🔒 Login required before payment processing
                      </p>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePremiumSubscription(isYearly)}
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                      }}
                    >
                      <Crown className="w-5 h-5" />
                      {isProcessing ? 'Processing Payment...' : 'Upgrade to Premium'}
                      {!isProcessing && <ArrowRight className="w-5 h-5" />}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Premium Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the advanced insights and guidance available with your Premium Journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {premiumFeatureDetails.map((feature, index) => (
              <PremiumFeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <div className="font-medium text-gray-900">Secure Payments</div>
                  <div className="text-sm text-gray-600">SSL encrypted & PCI compliant</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-medium text-gray-900">Cancel Anytime</div>
                  <div className="text-sm text-gray-600">No long-term commitments</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-purple-500" />
                <div>
                  <div className="font-medium text-gray-900">7-Day Free Trial</div>
                  <div className="text-sm text-gray-600">Try premium risk-free</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const freeFeatures = [
  "Basic weekly fortune readings",
  "General lucky colors & numbers",
  "Basic spiritual guidance",
  "Profile completion tracking",
  "Mobile-friendly access"
];

const premiumFeatures = [
  "Everything in Free Journey",
  "Detailed lucky element recommendations",
  "Personalized wearing advice",
  "Advanced gemstone guidance",
  "Specific timing recommendations",
  "Priority customer support",
  "Ad-free experience",
  "Export readings to PDF"
];

const premiumFeatureDetails = [
  {
    icon: Sparkles,
    title: "Lucky Element Guidance",
    description: "Discover specific elements, colors, and materials that enhance your fortune based on your birth chart and current cosmic alignment.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Crown,
    title: "Personalized Wearing Advice", 
    description: "Get detailed recommendations on what jewelry, clothing colors, and accessories to wear for maximum luck and positive energy.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: Star,
    title: "Advanced Timing",
    description: "Receive precise timing guidance for important decisions, meetings, and life events based on your personal fortune cycles.",
    color: "from-blue-500 to-cyan-600"
  }
];

const faqs = [
  {
    question: "What makes Premium different from Free?",
    answer: "Premium provides detailed lucky element guidance, specific wearing advice, advanced timing recommendations, and personalized insights that go far beyond basic readings."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your Premium subscription at any time. Your premium features will remain active until the end of your current billing period."
  },
  {
    question: "Is there a free trial for Premium?",
    answer: "Yes, we offer a 7-day free trial for new Premium subscribers. You can explore all premium features risk-free before deciding."
  },
  {
    question: "How accurate are the lucky element recommendations?",
    answer: "Our recommendations are based on traditional Chinese metaphysics combined with AI analysis of your personal birth chart and current cosmic influences for maximum accuracy."
  }
];

function PremiumFeatureCard({ feature, index }: { feature: typeof premiumFeatureDetails[0]; index: number }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="p-6 rounded-3xl"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="p-6 rounded-3xl"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
    </motion.div>
  );
}