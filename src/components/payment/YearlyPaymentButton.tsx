import React, { ReactNode, useState } from "react";
import { usePaymentFlowV2 } from "@/hooks/usePaymentFlowV2";

/* ---------------- CONFIG ---------------- */

const ENABLE_BLUR_PREVIEW = false;
const BUTTON_SIZE: "sm" | "md" | "lg" = "md";
const PRICE = "$29.99";
const MONEY_BACK_LABEL = [
    "30-Day Money-Back Guarantee",
    "100% Satisfaction Guaranteed",
    "100% money-back guarantee",
    "Love It or Your Money Back",
    "No Questions Asked Refunds"
]
/* ---------------------------------------- */

type YearlyPaymentButtonProps = {
    children?: ReactNode;
};

function YearlyPaymentButton({ children }: YearlyPaymentButtonProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { handlePremiumSubscription } = usePaymentFlowV2();

    const onConfirmPayment = async () => {
        setIsProcessing(true);
        try {
            await handlePremiumSubscription();
        } finally {
            setIsProcessing(false);
        }
    };

    const sizeClass = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    }[BUTTON_SIZE];

    return (
        <div className="flex flex-col items-center">

            {/* ---------- Blur Preview Section ---------- */}
            {ENABLE_BLUR_PREVIEW && (
                <div className="relative w-full max-w-xl mb-6">

                    <div className="text-gray-700 space-y-3">
                        <p>
                            ✨ Your energy is entering a period of transformation...
                        </p>

                        <p className="blur-sm select-none">
                            Financial opportunities may appear through unexpected channels.
                            Your decisions in the coming months will influence long-term
                            stability and growth.
                        </p>

                        <p className="blur-sm select-none">
                            Relationship dynamics are shifting, revealing deeper emotional
                            patterns that were previously hidden.
                        </p>
                    </div>

                    {/* fade overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
            )}

            {/* ---------- Button + Dropdown ---------- */}
            <div className="relative">

                <button
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className={`rounded-lg font-medium shadow-sm border border-purple-300/40 
          bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 
          transition backdrop-blur-sm ${sizeClass}`}
                >
                    {children ?? "🔮 Reveal Full Report"}
                </button>

                {showConfirm && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 mt-3 w-72
            rounded-xl bg-white shadow-lg border border-gray-200
            p-4 z-20 animate-fade-in"
                    >
                        <p className="text-sm text-gray-600 mb-2">
                            Get Your Full Reading
                        </p>

                        <div className="text-lg font-semibold text-gray-900 mb-2">
                            {PRICE}
                        </div>

                        <div className="flex items-center gap-1.5 text-green-600 mb-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <p className="text-xs font-medium">{MONEY_BACK_LABEL[0]}</p>
                        </div>

                        <button
                            onClick={onConfirmPayment}
                            disabled={isProcessing}
                            className="w-full rounded-md bg-purple-500 hover:bg-purple-500
              text-white py-2 text-sm transition disabled:opacity-50"
                        >
                            {isProcessing ? "Processing..." : "Continue to Payment"}
                        </button>

                        <button
                            onClick={() => setShowConfirm(false)}
                            className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default YearlyPaymentButton;