import React from 'react';
import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";
import {UserProfileResponse} from "@/lib/api/auth";

type WelcomeBackSectionProps = {
    user: UserProfileResponse;
}

function WelcomeBackBanner({user}: WelcomeBackSectionProps) {
    return  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-8"
    >
        <div
            className="p-3 md:p-6 rounded-xl md:rounded-3xl border border-white/30"
            style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(20px)",
            }}
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 md:gap-4">
                    <div
                        className="p-2 md:p-4 rounded-xl md:rounded-2xl"
                        style={{
                            background: "rgba(255, 255, 255, 0.6)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-lg md:text-3xl font-light text-gray-900 mb-0.5 md:mb-1">
                            Welcome back,{" "}
                            {user.firstName ||
                                user.name?.split(" ")[0] ||
                                user.username?.split("@")[0] ||
                                "Friend"}
                        </h1>
                        <p className="text-sm md:text-base text-gray-600">
                            Your spiritual journey continues
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
}

export default WelcomeBackBanner;