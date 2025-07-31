'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, CheckCircle, X, User } from 'lucide-react';
import { userAPI, GENDER_OPTIONS, UpdateUserProfileRequest } from '@/lib/api/user';

type ProfileFormData = UpdateUserProfileRequest;

interface ProfileFormProps {
  onComplete: (profileData: ProfileFormData) => void;
  onSkip?: () => void;
  showSkip?: boolean;
  initialData?: Partial<ProfileFormData>;
  isSettingsMode?: boolean;
}

export function BirthInfoForm({ onComplete, onSkip, showSkip = false, initialData, isSettingsMode = false }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    gender: initialData?.gender || undefined,
    birthDate: initialData?.birthDate || '',
    birthTime: initialData?.birthTime || '',
    birthCity: initialData?.birthCity || '',
    birthCountry: initialData?.birthCountry || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Partial<ProfileFormData> = {};
    
    // Birth information validation (required for accurate readings)
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required for accurate readings';
    }
    
    if (!formData.birthTime) {
      newErrors.birthTime = 'Birth time is required for accurate readings';
    }
    
    if (!formData.birthCity?.trim()) {
      newErrors.birthCity = 'Birth city is required for accurate readings';
    }
    
    if (!formData.birthCountry?.trim()) {
      newErrors.birthCountry = 'Birth country is required for accurate readings';
    }
    
    // Personal information validation (optional but recommended)
    // Note: Personal info is not required for profile completion

    // Validate date format
    if (formData.birthDate) {
      const date = new Date(formData.birthDate);
      if (isNaN(date.getTime()) || date > new Date()) {
        newErrors.birthDate = 'Please enter a valid birth date';
      }
    }

    // Validate time format
    if (formData.birthTime) {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.birthTime)) {
        newErrors.birthTime = 'Please enter time in HH:MM format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError(null); // Clear previous errors
    
    // Format the data for the API call
    const apiData: UpdateUserProfileRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      birthDate: formData.birthDate || undefined, // Keep YYYY-MM-DD format
      birthTime: formData.birthTime,
      birthCity: formData.birthCity,
      birthCountry: formData.birthCountry,
    };

    // Use the new centralized API
    const response = await userAPI.updateProfile(apiData);
    
    if (response.error) {
      // Set error state
      console.error('Profile update failed:', response.error.message);
      setApiError(response.error.message || 'Failed to update profile. Please try again.');
      setIsLoading(false);
      return;
    }

    // Success case
    if (response.data) {
      console.log('✅ Profile updated successfully');
      
      // Show success message
      setShowSuccess(true);
      
      // Profile data is automatically cached by userAPI.updateProfile
      if (isSettingsMode) {
        // In settings mode, show success and delay callback
        setTimeout(() => {
          onComplete(formData);
        }, 1500);
      } else {
        // In other modes, call immediately
        onComplete(formData);
      }
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className="p-6 md:p-8 rounded-3xl border border-white/30"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Star className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
            {isSettingsMode ? 'Update Your Profile' : 'Complete Your Cosmic Profile'}
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Your birth information is <span className="font-medium text-indigo-600">essential</span> for accurate personalized readings and cosmic insights
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div
              className="p-4 rounded-2xl border border-green-200/50 text-center"
              style={{
                background: "rgba(34, 197, 94, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Profile updated successfully!</span>
              </div>
              {isSettingsMode && (
                <p className="text-sm text-green-600 mt-1">
                  Returning to dashboard...
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div
              className="p-4 rounded-2xl border border-red-200/50 text-center"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center justify-center gap-2 text-red-700">
                <X className="w-5 h-5" />
                <span className="font-medium">{apiError}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <fieldset disabled={showSuccess} className={showSuccess ? 'opacity-75' : ''}>
          {/* Birth Information Section - Priority */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-indigo-900 border-b-2 border-indigo-300 pb-2">
                Birth Information
              </h3>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Required
              </span>
            </div>
            
          {/* Birth Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              Birth Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
              }}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-xs">{errors.birthDate}</p>
            )}
          </div>

          {/* Birth Time */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock className="w-4 h-4" />
              Birth Time
              <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500">(24-hour format)</span>
            </label>
            <input
              type="time"
              value={formData.birthTime}
              onChange={(e) => handleInputChange('birthTime', e.target.value)}
              className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
              }}
              placeholder="14:30"
            />
            {errors.birthTime && (
              <p className="text-red-500 text-xs">{errors.birthTime}</p>
            )}
            <p className="text-xs text-gray-500">
              💡 Don&rsquo;t know your exact birth time? Check your birth certificate or ask family members
            </p>
          </div>

          {/* Birth City & Country */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4" />
                Birth City
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.birthCity}
                onChange={(e) => handleInputChange('birthCity', e.target.value)}
                placeholder="San Francisco"
                className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                }}
              />
              {errors.birthCity && (
                <p className="text-red-500 text-xs">{errors.birthCity}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="w-4 h-4" />
                Birth Country
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.birthCountry}
                onChange={(e) => handleInputChange('birthCountry', e.target.value)}
                placeholder="United States"
                className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                }}
              />
              {errors.birthCountry && (
                <p className="text-red-500 text-xs">{errors.birthCountry}</p>
              )}
            </div>
          </div>
          </div>

          {/* Personal Information Section - Optional */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-medium text-gray-700 border-b border-gray-200/50 pb-2">
                Personal Information
              </h3>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                Optional
              </span>
            </div>
            
            {/* First Name & Last Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <User className="w-4 h-4" />
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                  }}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <User className="w-4 h-4" />
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Doe"
                  className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                  }}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User className="w-4 h-4" />
                Gender
              </label>
              <select
                value={formData.gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value as "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY")}
                className="w-full px-4 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all touch-manipulation"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <option value="">Select your gender</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>
          </div>


          {/* Info Box */}
          <div
            className="p-4 rounded-2xl border border-indigo-200/50"
            style={{
              background: "rgba(99, 102, 241, 0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">Why birth information is essential:</p>
                <ul className="space-y-1 text-xs">
                  <li>• <span className="font-medium">Birth date:</span> Required for astrological chart calculations</li>
                  <li>• <span className="font-medium">Birth time:</span> Essential for accurate house placements and rising sign</li>
                  <li>• <span className="font-medium">Birth location:</span> Critical for precise celestial positioning</li>
                  <li className="text-gray-500 mt-2">Personal information helps personalize your experience but is optional</li>
                </ul>
              </div>
            </div>
          </div>
          </fieldset>

          {/* Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
            {showSkip && (
              <motion.button
                type="button"
                onClick={onSkip}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-2xl border border-gray-200/50 text-gray-600 font-medium transition-all hover:bg-gray-50 touch-manipulation"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <X className="w-4 h-4" />
                {isSettingsMode ? 'Cancel' : 'Skip for now'}
              </motion.button>
            )}
            
            <motion.button
              type="submit"
              disabled={isLoading || showSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 py-3 md:py-4 rounded-2xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              style={{
                background: showSuccess 
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: showSuccess 
                  ? "0 8px 24px rgba(16, 185, 129, 0.3)" 
                  : "0 8px 24px rgba(102, 126, 234, 0.3)",
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {isSettingsMode ? 'Save Changes' : 'Complete Profile'}
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}