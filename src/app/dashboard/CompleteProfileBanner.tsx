import React from 'react';
import {ChevronRight, Star} from "lucide-react";
import {motion} from "framer-motion";
import {DASHBOARD_FLAGS, getAnimationIntensity} from "./featureFlags";

type ProfileCompletionBannerProps = {
    setShowBirthInfoForm: (show: boolean) => void;
}

function CompleteProfileBanner({setShowBirthInfoForm}: ProfileCompletionBannerProps) {
    const { ATTRACT_ANIMATION, SHOW_CONTINUOUS_ANIMATION, ANIMATION_INTENSITY, SHOW_BORDER_ANIMATION } = DASHBOARD_FLAGS.COMPLETE_PROFILE_BANNER;
    const intensity = getAnimationIntensity(ANIMATION_INTENSITY);

    // Continuous attention animation variants
    const attractVariants = {
        pulse: {
            scale: [1, intensity.scale, 1],
            transition: {
                duration: intensity.duration,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        },
        slide: {
            x: [0, 4, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        },
        glow: {
            boxShadow: [
                "0 0 0 0 rgba(251, 146, 60, 0)",
                "0 0 30px 8px rgba(251, 146, 60, 0.2)",
                "0 0 0 0 rgba(251, 146, 60, 0)",
            ],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        },
        shake: {
            x: [0, -3, 3, -3, 3, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut" as const,
            }
        },
        none: {},
    };

    // Star icon animation
    const starVariants = {
        animate: {
            rotate: [0, 20, -20, 0],
            scale: [1, 1.3, 1],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        }
    };

    const borderAnimation = {
        background: [
            "linear-gradient(135deg, rgba(251, 146, 60, 0.3) 0%, rgba(249, 115, 22, 0.3) 100%)",
            "linear-gradient(135deg, rgba(251, 146, 60, 0.6) 0%, rgba(249, 115, 22, 0.6) 100%)",
            "linear-gradient(135deg, rgba(251, 146, 60, 0.3) 0%, rgba(249, 115, 22, 0.3) 100%)",
        ],
    };

    const borderTransition = {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 md:mb-8"
        >
            <motion.div
                animate={SHOW_CONTINUOUS_ANIMATION ? attractVariants[ATTRACT_ANIMATION as keyof typeof attractVariants] : {}}
                className="relative"
            >
                {/* Animated border background */}
                {SHOW_BORDER_ANIMATION && (
                    <motion.div
                        className="absolute -inset-[1px] rounded-xl md:rounded-3xl"
                        animate={borderAnimation}
                        transition={borderTransition}
                    />
                )}
                
                <div
                    className="relative p-3 md:p-6 rounded-xl md:rounded-3xl border border-orange-200/50 cursor-pointer group"
                    style={{
                        background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                        backdropFilter: "blur(20px)",
                    }}
                    onClick={() => setShowBirthInfoForm(true)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-4">
                            <motion.div 
                                className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600"
                                animate={SHOW_CONTINUOUS_ANIMATION ? starVariants.animate : {}}
                            >
                                <Star className="w-4 h-4 md:w-6 md:h-6 text-white" />
                            </motion.div>
                            <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-0.5 md:mb-1">
                                    Complete Your Cosmic Profile
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600">
                                    Add your personal and birth information for more accurate
                                    readings
                                </p>
                            </div>
                        </div>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default CompleteProfileBanner;
