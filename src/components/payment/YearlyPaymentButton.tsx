import React, { ReactNode, useState } from "react";
import { usePaymentFlowV2 } from "@/hooks/usePaymentFlowV2";

/* ---------------- CONFIG ---------------- */

const ENABLE_BLUR_PREVIEW = false;
const BUTTON_SIZE: "sm" | "md" | "lg" = "md";
const PRICE = "$29.99";

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
                            Unlock your complete personalized reading.
                        </p>

                        <div className="text-lg font-semibold text-gray-900 mb-3">
                            {PRICE}
                        </div>

                        <button
                            onClick={onConfirmPayment}
                            disabled={isProcessing}
                            className="w-full rounded-md bg-purple-500/80 hover:bg-purple-500
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