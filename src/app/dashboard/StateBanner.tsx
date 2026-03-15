import React from 'react'
import {Calendar, Star, TrendingUp} from "lucide-react";
import {motion} from "framer-motion";
import {UserProfileResponse} from "@/lib/api/auth";

type StateBannerProps = {
    averageScore: number
    totalReports: number;
    user: UserProfileResponse;
    maxVisible?: 2 | 3 | 4;
}

function StateBanner({averageScore, totalReports, user, maxVisible = 2}: StateBannerProps) {
    const daysJourney = Math.floor(
        (Date.now() - new Date(user.joinDate || user.createTime).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const allStats = [
        {
            key: 'totalReports',
            value: totalReports,
            label: 'Total Reports',
            icon: Calendar,
            gradient: 'from-blue-500 to-indigo-600',
            show: false,
        },
        {
            key: 'averageScore',
            value: `${averageScore}%`,
            label: 'Average Fortune',
            icon: TrendingUp,
            gradient: 'from-purple-500 to-pink-600',
            show: true,
        },
        {
            key: 'daysJourney',
            value: daysJourney,
            label: 'Days Journey',
            icon: Star,
            gradient: 'from-green-500 to-emerald-600',
            show: true,
        },
    ].filter(stat => stat.show);

    const needsScroll = allStats.length > maxVisible;
    
    const getMobileCardWidth = () => {
        if (maxVisible === 2) return 'min-w-[calc(50%-4px)]';
        if (maxVisible === 3) return 'min-w-[calc(33.333%-6px)]';
        return 'min-w-[calc(25%-6px)]';
    };

    const getGridCols = () => {
        const count = Math.min(allStats.length, maxVisible);
        if (count === 1) return 'md:grid-cols-1';
        if (count === 2) return 'md:grid-cols-2';
        if (count === 3) return 'md:grid-cols-3';
        return 'md:grid-cols-4';
    };

    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.1}}
        className="mb-6 md:mb-8"
    >
        {/* Mobile: Horizontal layout (icon left, content right) */}
        <div className="md:hidden">
            <div 
                className={`flex gap-2 ${needsScroll ? 'overflow-x-auto pb-2 snap-x snap-mandatory' : ''}`}
                style={needsScroll ? {} : { display: 'grid', gridTemplateColumns: `repeat(${allStats.length}, minmax(0, 1fr))` }}
            >
                {allStats.map((stat) => (
                    <div
                        key={stat.key}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border border-white/30 ${needsScroll ? `${getMobileCardWidth()} flex-shrink-0 snap-center` : ''}`}
                        style={{
                            background: "rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        {/* Icon - bigger now */}
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shrink-0`}>
                            <stat.icon className="w-5 h-5 text-white"/>
                        </div>
                        {/* Content - stacked vertically */}
                        <div className="flex flex-col min-w-0">
                            <span className="text-lg text-gray-900 leading-tight">{stat.value}</span>
                            <span className="text-xs text-gray-600 truncate">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop: Horizontal layout (icon left, content right) */}
        <div className={`hidden md:grid gap-4 ${getGridCols()}`}>
            {allStats.slice(0, maxVisible).map((stat) => (
                <div
                    key={stat.key}
                    className="flex items-center gap-3 px-4 py-4 rounded-2xl border border-white/30"
                    style={{
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Icon - bigger */}
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shrink-0`}>
                        <stat.icon className="w-6 h-6 text-white"/>
                    </div>
                    {/* Content */}
                    <div className="flex flex-col min-w-0">
                        <span className="text-2xl font-semibold text-gray-900 leading-tight">{stat.value}</span>
                        <span className="text-sm text-gray-600 truncate">{stat.label}</span>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
}

export default StateBanner;
