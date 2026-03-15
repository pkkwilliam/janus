import React from 'react'
import {Calendar, Star, TrendingUp} from "lucide-react";
import {motion} from "framer-motion";
import {UserProfileResponse} from "@/lib/api/auth";

type StateBannerProps = {
    averageScore: number
    totalReports: number;
    user: UserProfileResponse;
}

function StateBanner({averageScore, totalReports, user}: StateBannerProps) {
    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="mb-6 md:mb-8"
    >
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 px-1 -mx-1 snap-x snap-mandatory">
                <div
                    className="flex-shrink-0 px-3 py-2 rounded-xl border border-white/30 text-center min-w-[100px] snap-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <div className="p-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600">
                            <Calendar className="w-3 h-3 text-white"/>
                        </div>
                        <span className="text-base font-medium text-gray-900">{totalReports}</span>
                    </div>
                    <div className="text-[10px] text-gray-600">Total Reports</div>
                </div>

                <div
                    className="flex-shrink-0 px-3 py-2 rounded-xl border border-white/30 text-center min-w-[100px] snap-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <div className="p-1 rounded-md bg-gradient-to-r from-purple-500 to-pink-600">
                            <TrendingUp className="w-3 h-3 text-white"/>
                        </div>
                        <span className="text-base font-medium text-gray-900">{averageScore}%</span>
                    </div>
                    <div className="text-[10px] text-gray-600">Avg Fortune</div>
                </div>

                <div
                    className="flex-shrink-0 px-3 py-2 rounded-xl border border-white/30 text-center min-w-[100px] snap-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                        <div className="p-1 rounded-md bg-gradient-to-r from-green-500 to-emerald-600">
                            <Star className="w-3 h-3 text-white"/>
                        </div>
                        <span className="text-base font-medium text-gray-900">
                  {Math.floor(
                      (Date.now() -
                          new Date(user.joinDate || user.createTime).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </span>
                    </div>
                    <div className="text-[10px] text-gray-600">Days Journey</div>
                </div>
            </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
            <div
                className="p-6 rounded-3xl border border-white/30 text-center"
                style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 w-fit mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-white"/>
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">
                    {totalReports}
                </div>
                <div className="text-sm text-gray-600">Total Reports</div>
            </div>

            <div
                className="p-6 rounded-3xl border border-white/30 text-center"
                style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 w-fit mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-white"/>
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">
                    {averageScore}%
                </div>
                <div className="text-sm text-gray-600">Average Fortune</div>
            </div>

            <div
                className="p-6 rounded-3xl border border-white/30 text-center"
                style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 w-fit mx-auto mb-4">
                    <Star className="w-6 h-6 text-white"/>
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">
                    {Math.floor(
                        (Date.now() -
                            new Date(user.joinDate || user.createTime).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}
                </div>
                <div className="text-sm text-gray-600">Days Journey</div>
            </div>
        </div>
    </motion.div>
}

export default StateBanner;