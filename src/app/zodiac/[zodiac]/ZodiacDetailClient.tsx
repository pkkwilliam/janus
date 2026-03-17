"use client";

import {motion} from "framer-motion";
import {useState, useRef, useEffect} from "react";
import {
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Heart,
    Star,
    Palette,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from "lucide-react";
import Link from "next/link";
import {
    Zodiac,
    ZODIAC_CONFIG,
    getPreviousZodiac,
    getNextZodiac,
    ZODIAC_INFO
} from "@/types/zodiac";
import {BirthYearsSection, ExploreZodiacsSection} from "@/components/zodiac";

interface ZodiacDetailClientProps {
    zodiac: Zodiac;
}

export default function ZodiacDetailClient({zodiac}: ZodiacDetailClientProps) {
    const config = ZODIAC_CONFIG[zodiac];
    const info = ZODIAC_INFO[zodiac];
    const prevZodiac = getPreviousZodiac(zodiac);
    const nextZodiac = getNextZodiac(zodiac);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const getSectionIcon = (header: string) => {
        switch (header) {
            case "Personality Traits":
                return <Sparkles className="w-5 h-5"/>;
            case "Strengths":
                return <Star className="w-5 h-5"/>;
            case "Best Matches":
                return <Heart className="w-5 h-5"/>;
            case "Lucky Elements":
                return <Palette className="w-5 h-5"/>;
            default:
                return <Sparkles className="w-5 h-5"/>;
        }
    };

    // Handle scroll to update active index
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = container.offsetWidth * 0.85;
            const gap = 16;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            setActiveIndex(Math.min(Math.max(newIndex, 0), info.sections.length - 1));
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, [info.sections.length]);

    const scrollToCard = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const cardWidth = container.offsetWidth * 0.85;
        const gap = 16;
        container.scrollTo({
            left: index * (cardWidth + gap),
            behavior: "smooth"
        });
    };

    const handlePrev = () => {
        const newIndex = Math.max(activeIndex - 1, 0);
        scrollToCard(newIndex);
    };

    const handleNext = () => {
        const newIndex = Math.min(activeIndex + 1, info.sections.length - 1);
        scrollToCard(newIndex);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Hero Section */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${config.bgGradient}`}>
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 bg-gradient-to-br ${config.gradient} blur-3xl`}/>
                    <div
                        className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-20 bg-gradient-to-tr ${config.gradient} blur-3xl`}/>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 py-12">
                    {/* Navigation */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{x: -4}}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5"/>
                                Back to Dashboard
                            </motion.button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link href={`/zodiac/${prevZodiac.toLowerCase()}`}>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5"/>
                                </motion.button>
                            </Link>
                            <Link href={`/zodiac/${nextZodiac.toLowerCase()}`}>
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5"/>
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Zodiac Header */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="text-center"
                    >
                        <motion.div
                            initial={{scale: 0.8, rotate: -10}}
                            animate={{scale: 1, rotate: 0}}
                            transition={{delay: 0.2, type: "spring"}}
                            className="inline-block mb-6"
                        >
                            <div
                                className={`w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br ${config.gradient} shadow-2xl`}
                                style={{boxShadow: `0 20px 60px ${config.shadowColor}`}}
                            >
                                <span className="text-5xl">{config.emoji}</span>
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            {config.english}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-lg">
                            <span className={`text-3xl font-bold ${config.accentColor}`}>
                                {config.character}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className={config.accentColor}>{config.element}</span>
                            <span className="text-gray-400">•</span>
                            <span className={config.accentColor}>{config.yinYang}</span>
                        </div>
                        {/* Birth Years Section - Using Component */}
                        <BirthYearsSection zodiac={zodiac}/>
                    </motion.div>
                </div>
            </div>

            {/* Content Sections - Swipeable Cards */}
            <div className="py-12">
                {/* Section Header with Navigation */}
                <div className="max-w-4xl mx-auto px-4 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            About {config.english}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                                className="p-2 rounded-full bg-white shadow-sm border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
                            </button>
                            <span className="text-sm text-gray-500 min-w-[3rem] text-center">
                                {activeIndex + 1} / {info.sections.length}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={activeIndex === info.sections.length - 1}
                                className="p-2 rounded-full bg-white shadow-sm border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                            >
                                <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4"
                    style={{
                        scrollPaddingLeft: "1rem",
                        scrollPaddingRight: "1rem",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none"
                    }}
                >
                    {info.sections.map((section, index: number) => (
                        <motion.div
                            key={section.header}
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: index * 0.08}}
                            className="snap-center shrink-0 first:pl-0 last:pr-4"
                            style={{ width: "85vw", maxWidth: "400px" }}
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${config.bgGradient}`}>
                                        <div className={config.accentColor}>
                                            {getSectionIcon(section.header)}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {section.header}
                                    </h2>
                                </div>

                                <ul className="space-y-3">
                                    {section.readings.map((reading: string, i: number) => (
                                        <motion.li
                                            key={i}
                                            initial={{opacity: 0, x: -10}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: index * 0.08 + i * 0.04}}
                                            className="flex items-start gap-3"
                                        >
                                            <span
                                                className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r ${config.gradient}`}/>
                                            <span className="text-gray-700 leading-relaxed text-sm">{reading}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {info.sections.map((section, index) => (
                        <button
                            key={section.header}
                            onClick={() => scrollToCard(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? `w-6 ${config.accentColor.replace('text-', 'bg-')}`
                                    : "w-2 bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to ${section.header}`}
                        />
                    ))}
                </div>

                {/* Explore Other Zodiacs Section - Using Component */}
                <div className="max-w-4xl mx-auto px-4 mt-12">
                    <ExploreZodiacsSection currentZodiac={zodiac}/>
                </div>
            </div>
        </div>
    );
}
