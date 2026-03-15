import React from 'react';
import {ChevronRight, Star} from "lucide-react";
import {motion} from "framer-motion";

type ProfileCompletionBannerProps = {
    setShowBirthInfoForm: (show: boolean) => void;
}

function ProfileCompletionBanner({setShowBirthInfoForm}: ProfileCompletionBannerProps) {
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 md:mb-8"
    >
        <div
            className="p-3 md:p-6 rounded-xl md:rounded-3xl border border-orange-200/50 cursor-pointer group"
            style={{
                background:
                    "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                backdropFilter: "blur(20px)",
            }}
            onClick={() => setShowBirthInfoForm(true)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600">
                        <Star className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
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
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </div>
        </div>
    </motion.div>
}

export default ProfileCompletionBanner;