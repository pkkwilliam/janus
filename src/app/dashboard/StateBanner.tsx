import React from 'react'
import {Calendar, Star, TrendingUp} from "lucide-react";
import {motion} from "framer-motion";
import {UserProfileResponse} from "@/lib/api/auth";

type StateBannerProps = {
    averageScore: number
    totalReports: number;
    user: UserProfileResponse;
    maxItems?: 2 | 3 | 4; // Control how many stats to show (default: show all 3)
}

function StateBanner({averageScore, totalReports, user, maxItems = 2}: StateBannerProps) {
    const daysJourney = Math.floor(
        (Date.now() - new Date(user.joinDate || user.createTime).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // Define all possible stats
    const allStats = [
        {
            key: 'totalReports',
            value: totalReports,
            label: 'Total Reports',
            shortLabel: 'Reports',
            icon: Calendar,
            gradient: 'from-blue-500 to-indigo-600',
        },
        {
            key: 'averageScore',
            value: `${averageScore}%`,
            label: 'Average Fortune',
            shortLabel: 'Avg Fortune',
            icon: TrendingUp,
            gradient: 'from-purple-500 to-pink-600',
        },
        {
            key: 'daysJourney',
            value: daysJourney,
            label: 'Days Journey',
            shortLabel: 'Days',
            icon: Star,
            gradient: 'from-green-500 to-emerald-600',
        },
    ];

    // Slice to maxItems if specified
    const stats = maxItems ? allStats.slice(0, maxItems) : allStats;
    const itemCount = stats.length;

    // Calculate grid columns based on item count
    // Mobile: flex scroll, Desktop: fit to width with max 4 cols
    const getGridCols = () => {
        if (itemCount === 1) return 'md:grid-cols-1';
        if (itemCount === 2) return 'md:grid-cols-2';
        if (itemCount === 3) return 'md:grid-cols-3';
        return 'md:grid-cols-4';
    };

    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="mb-6 md:mb-8"
    >
        {/* Mobile: Horizontal Scroll - cards shrink to fit */}
        <div className="md:hidden">
            <div
                className="grid gap-2 px-1"
                style={{
                    gridTemplateColumns: `repeat(${itemCount}, minmax(0, 1fr))`,
                }}
            >
                {stats.map((stat) => (
                    <div
                        key={stat.key}
                        className="px-2 py-2 rounded-xl border border-white/30 text-center"
                        style={{
                            background: "rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <div className={`p-1 rounded-md bg-gradient-to-r ${stat.gradient}`}>
                                <stat.icon className="w-3 h-3 text-white"/>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                        </div>
                        <div className="text-[10px] text-gray-600 truncate">{stat.shortLabel}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop: Grid Layout - fits to width */}
        <div className={`hidden md:grid gap-4 ${getGridCols()}`}>
            {stats.map((stat) => (
                <div
                    key={stat.key}
                    className="p-4 lg:p-5 rounded-2xl border border-white/30 text-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <div className={`p-2.5 rounded-xl bg-gradient-to-r ${stat.gradient} w-fit mx-auto mb-3`}>
                        <stat.icon className="w-5 h-5 text-white"/>
                    </div>
                    <div className="text-xl lg:text-2xl font-light text-gray-900 mb-0.5">
                        {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
                </div>
            ))}
        </div>
    </motion.div>
}

export default StateBanner;
