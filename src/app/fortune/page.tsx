'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { getZodiac, ZODIAC_CHINESE, ZODIAC_EMOJI } from '@/lib/zodiacCalculator';

// Default date: 1998-08-18
const DEFAULT_DATE = '1998-08-18';

export default function FortunePage() {
  const [birthDate, setBirthDate] = useState(DEFAULT_DATE);
  const [zodiacPreview, setZodiacPreview] = useState<string>('');
  const router = useRouter();

  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];

  // Calculate and display zodiac preview when date changes
  useEffect(() => {
    if (birthDate) {
      const date = new Date(birthDate);
      const zodiac = getZodiac(date);
      setZodiacPreview(`${zodiac} (${ZODIAC_CHINESE[zodiac]}) ${ZODIAC_EMOJI[zodiac]}`);
    }
  }, [birthDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) {
      // Validate date is not in the future
      const selectedDate = new Date(birthDate);
      const now = new Date();
      if (selectedDate > now) {
        alert('Please select a date in the past');
        return;
      }
      router.push(`/report?birthDate=${birthDate}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-amber-100"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            2026 Zodiac Fortune
          </h1>
          <p className="text-gray-600">
            Enter your birth date to reveal your personalized fortune
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Birth Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                max={today}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-gray-50"
                required
              />
            </div>
            {zodiacPreview && (
              <p className="mt-3 text-center text-amber-600">
                <span className="text-sm font-medium text-gray-500">Your Zodiac</span>
                <br />
                <span className="text-lg font-semibold">{zodiacPreview}</span>
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 shadow-lg hover:shadow-xl"
          >
            Reveal My Fortune
          </motion.button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Free personalized fortune based on ancient Chinese wisdom
        </p>
      </motion.div>
    </div>
  );
}
