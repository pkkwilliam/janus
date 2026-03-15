import React from 'react';
import {Crown, Package, User} from "lucide-react";
import Link from "next/link";
import {motion} from "framer-motion";

type QuickActionProps = {
    hasActiveSubscription: boolean;
    setShowBirthInfoForm: (show: boolean) => void;
    setShowSubscriptionSelector: (show: boolean) => void;
    showOrderHistory: boolean;
}

function QuickAction({
                         hasActiveSubscription,
                         setShowBirthInfoForm,
                         setShowSubscriptionSelector,
                         showOrderHistory
                     }: QuickActionProps) {
    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3}}
    >
        <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-4 md:mb-6">
            Quick Actions
        </h2>
        <div
            className={`grid ${
                hasActiveSubscription ? "md:grid-cols-2" : "md:grid-cols-3"
            } gap-4 md:gap-6`}
        >
            <div
                className="p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/30 text-center cursor-pointer group hover:scale-105 transition-transform"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)",
                    backdropFilter: "blur(20px)",
                }}
                onClick={() => setShowBirthInfoForm(true)}
            >
                <div
                    className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8 text-white"/>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Update Profile
                </h3>
                <p className="text-sm text-gray-600">
                    Personalize your spiritual journey
                </p>
            </div>

            {!hasActiveSubscription && (
                <div
                    className="p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/30 text-center cursor-pointer group hover:scale-105 transition-transform"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
                        backdropFilter: "blur(20px)",
                    }}
                    onClick={() => setShowSubscriptionSelector(true)}
                >
                    <div
                        className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Crown className="w-8 h-8 text-white"/>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upgrade to Premium
                    </h3>
                    <p className="text-sm text-gray-600">
                        Unlock unlimited reports & insights
                    </p>
                </div>
            )}

            {showOrderHistory && (
                <Link href="/orders">
                    <div
                        className="p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/30 text-center cursor-pointer group hover:scale-105 transition-transform"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <div
                            className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Package className="w-8 h-8 text-white"/>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Order History
                        </h3>
                        <p className="text-sm text-gray-600">
                            View your subscription orders
                        </p>
                    </div>
                </Link>
            )}
        </div>
    </motion.div>
}

export default QuickAction;