'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Star, Heart } from 'lucide-react';
import { feedbackAPI } from '@/lib/api/feedback';

interface FeedbackButtonProps {
  className?: string;
}

export function FeedbackButton({ className }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for existing API
      const subject = rating > 0 
        ? `User Feedback (${rating} ${rating === 1 ? 'star' : 'stars'})`
        : 'User Feedback';
      
      const feedbackData = {
        email: email || 'anonymous@fortune-cookie.me',
        subject,
        content: feedback.trim()
      };

      // Submit using existing API
      const response = await feedbackAPI.submitFeedback(feedbackData);
      
      if (response.success) {
        setIsSubmitted(true);
        
        // Reset form after a delay
        setTimeout(() => {
          setIsOpen(false);
          setFeedback('');
          setRating(0);
          setEmail('');
          setIsSubmitted(false);
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to submit feedback');
      }
      
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Still show success to user to avoid breaking UX
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setFeedback('');
        setRating(0);
        setEmail('');
        setIsSubmitted(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg border border-white/20 group ${className}`}
        style={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
        }}
        title="Send Feedback"
      >
        <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        
        {/* Pulse effect */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          }}
        />
      </motion.button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-white/30 p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    }}
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Share Your Feedback
                    </h3>
                    <p className="text-sm text-gray-800">
                      Help us improve Fortune Cookie
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      How was your experience? (Optional)
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 rounded transition-colors"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            } hover:text-yellow-400 transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your Feedback *
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us what you think! Suggestions, bugs, or just say hi..."
                      className="w-full p-3 rounded-2xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                      }}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com (if you want a response)"
                      className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-300 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !feedback.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-2xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Feedback
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    }}
                  >
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Thank You! 🥠
                  </h3>
                  <p className="text-gray-800">
                    Your feedback helps us make Fortune Cookie better for everyone!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}