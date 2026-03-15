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
    const actions = [
        {
            key: 'profile',
            icon: User,
            title: 'Update Profile',
            subtitle: 'Personalize your spiritual journey',
            gradient: 'from-pink-500 to-red-500',
            bgGradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
            onClick: () => setShowBirthInfoForm(true),
            href: null,
        },
        ...(!hasActiveSubscription ? [{
            key: 'upgrade',
            icon: Crown,
            title: 'Upgrade to Premium',
            subtitle: 'Unlock unlimited reports & insights',
            gradient: 'from-purple-500 to-indigo-600',
            bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
            onClick: () => setShowSubscriptionSelector(true),
            href: null,
        }] : []),
        ...(showOrderHistory ? [{
            key: 'orders',
            icon: Package,
            title: 'Order History',
            subtitle: 'View your subscription orders',
            gradient: 'from-green-500 to-blue-500',
            bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            onClick: null,
            href: '/orders',
        }] : []),
    ];

    const actionCount = actions.length;
    const getGridCols = () => {
        if (actionCount === 1) return 'grid-cols-1';
        if (actionCount === 2) return 'grid-cols-1 md:grid-cols-2';
        return 'grid-cols-1 md:grid-cols-3';
    };

    const renderActionCard = (action: typeof actions[0]) => {
        const cardContent = (
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/30 cursor-pointer group hover:scale-[1.02] transition-transform"
                style={{
                    background: action.bgGradient,
                    backdropFilter: "blur(20px)",
                }}
            >
                {/* Icon */}
                <div className={`p-2.5 rounded-xl bg-gradient-to-r ${action.gradient} shrink-0 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white"/>
                </div>
                {/* Content */}
                <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                        {action.title}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                        {action.subtitle}
                    </p>
                </div>
            </div>
        );

        if (action.href) {
            return (
                <Link key={action.key} href={action.href}>
                    {cardContent}
                </Link>
            );
        }

        return (
            <div key={action.key} onClick={action.onClick || undefined}>
                {cardContent}
            </div>
        );
    };

    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3}}
    >
        <h2 className="text-lg md:text-2xl font-light text-gray-900 mb-3 md:mb-4">
            Quick Actions
        </h2>
        <div className={`grid ${getGridCols()} gap-2 md:gap-4`}>
            {actions.map(renderActionCard)}
        </div>
    </motion.div>;
}

export default QuickAction;
