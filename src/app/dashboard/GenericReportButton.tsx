import React from 'react';
import {Loader2, Sparkles} from "lucide-react";
import {motion} from "framer-motion";
import {DASHBOARD_FLAGS, getAnimationIntensity} from "./featureFlags";

type GenericReportButtonProps = {
    disabled: boolean;
    generateDailyReport: () => void;
    loading: boolean;
}

function GenericReportButton({disabled, generateDailyReport, loading}: GenericReportButtonProps) {
    const { ATTRACT_ANIMATION, SHOW_CONTINUOUS_ANIMATION, ANIMATION_INTENSITY } = DASHBOARD_FLAGS.GENERIC_REPORT_BUTTON;
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
        bounce: {
            y: [0, -4, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        },
        glow: {
            boxShadow: [
                "0 0 0 0 rgba(139, 92, 246, 0)",
                "0 0 20px 5px rgba(139, 92, 246, 0.3)",
                "0 0 0 0 rgba(139, 92, 246, 0)",
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        },
        shake: {
            x: [0, -2, 2, -2, 2, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut" as const,
            }
        },
        none: {},
    };

    // Sparkle animation for the icon
    const sparkleVariants = {
        animate: {
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
            }
        }
    };

    return (
        <motion.div
            animate={!disabled && !loading && SHOW_CONTINUOUS_ANIMATION ? attractVariants[ATTRACT_ANIMATION as keyof typeof attractVariants] : {}}
            className="inline-block"
        >
            <motion.button
                whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={generateDailyReport}
                disabled={disabled}
                className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-medium hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-lg overflow-hidden"
            >
                {/* Animated background shimmer */}
                {!loading && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                            x: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear" as const,
                        }}
                    />
                )}
                
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin relative z-10"/>
                        <div className="text-left relative z-10">
                            <div className="font-medium">
                                Generating Your Daily Report...
                            </div>
                            <div className="text-xs opacity-90">
                                This may take up to 1 minute
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <motion.div 
                            className="p-2 rounded-lg bg-white/20 relative z-10"
                            animate={SHOW_CONTINUOUS_ANIMATION ? sparkleVariants.animate : {}}
                        >
                            <Sparkles className="w-5 h-5"/>
                        </motion.div>
                        <div className="text-left relative z-10">
                            <div className="font-medium">
                                Reveal Your Fortune
                            </div>
                            <div className="text-xs opacity-90">
                                Get your comprehensive fortune analysis
                            </div>
                        </div>
                    </>
                )}
            </motion.button>
        </motion.div>
    );
}

export default GenericReportButton;
