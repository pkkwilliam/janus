import React from 'react'
import {ChevronRight, Crown} from "lucide-react";
import {motion} from "framer-motion";

type SubscriptionUpgradeBannerProps = {
    setShowSubscriptionSelector: (show: boolean) => void;
}

function SubscriptionUpgradeBanner({setShowSubscriptionSelector}: SubscriptionUpgradeBannerProps) {
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-4 md:mb-8"
    >
        <div
            className="p-4 md:p-6 rounded-2xl md:rounded-3xl border border-purple-200/50 cursor-pointer group"
            style={{
                background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                backdropFilter: "blur(20px)",
            }}
            onClick={() => setShowSubscriptionSelector(true)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600">
                        <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            Unlock Premium Features
                        </h3>
                        <p className="text-sm text-gray-600">
                            Get unlimited reports, advanced insights, and personalized
                            guidance
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-sm font-medium text-purple-600">
                            Starting at $2.00/month
                        </div>
                        <div className="text-xs text-gray-500">
                            Affordable premium features
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        </div>
    </motion.div>
}

export default SubscriptionUpgradeBanner;