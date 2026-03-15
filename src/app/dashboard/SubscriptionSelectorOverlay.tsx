import React from 'react'
import {ChevronRight, Crown} from "lucide-react";
import {SubscriptionSelector} from "@/components/subscription/SubscriptionSelector";

type SubscriptionSelectorOverlayProps = {
    setShowSubscriptionSelector: (show: boolean) => void;
}

function SubscriptionSelectorOverlay({setShowSubscriptionSelector}: SubscriptionSelectorOverlayProps) {
    return (
        <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <button
                    onClick={() => setShowSubscriptionSelector(false)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back to Dashboard
                </button>
            </div>

            <div
                className="p-8 rounded-3xl border border-white/30"
                style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="text-center mb-8">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 w-fit mx-auto mb-4">
                        <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-light text-gray-900 mb-2">
                        Upgrade to Premium
                    </h1>
                    <p className="text-gray-600">
                        Unlock advanced insights and personalized guidance
                    </p>
                </div>

                <SubscriptionSelector
                    onSubscriptionStart={() => console.log("Subscription started")}
                />
            </div>
        </div>
    );
}

export default SubscriptionSelectorOverlay;