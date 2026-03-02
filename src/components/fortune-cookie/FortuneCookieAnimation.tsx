"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronRight } from "lucide-react";

interface FortuneCookieAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  reportType?: string;
  luckyNumbers: number[];
  fortuneScore: number;
  fortuneText?: string;
}

const SHOW_FORTUNE_SCORE_BADGE = false; // NEED FIX PROPS not able to come in
const SHOW_LUCKY_NUBMERS = false; // NEED FIX PROPS not able to come in

// Particle component for the cracking effect
function CrumbParticle({
  delay,
  x,
  y,
  size = 2,
}: {
  delay: number;
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: Math.random() > 0.5 ? "#E5A836" : "#C9891C",
        left: "50%",
        top: "50%",
      }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: 0,
        x: x * (80 + Math.random() * 60),
        y: y * (80 + Math.random() * 60) + 50,
      }}
      transition={{
        duration: 1 + Math.random() * 0.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

// Sparkle particle
function SparkleParticle({
  delay,
  x,
  y,
}: {
  delay: number;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
      style={{
        left: "50%",
        top: "50%",
        boxShadow: "0 0 6px 2px rgba(255,215,0,0.8)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: x * 100,
        y: y * 100,
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export function FortuneCookieAnimation({
  isOpen,
  onClose,
  onComplete,
  reportType = "WEEKLY",
  fortuneScore = 100,
  fortuneText = "Your destiny awaits...",
  luckyNumbers = [],
}: FortuneCookieAnimationProps) {
  const [stage, setStage] = useState<
    "idle" | "shaking" | "cracking" | "revealing" | "revealed"
  >("idle");
  const [showFortune, setShowFortune] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  // Reset state when animation opens
  useEffect(() => {
    if (isOpen) {
      setStage("idle");
      setShowFortune(false);
      setCanContinue(false);
    }
  }, [isOpen]);

  // Handle cookie click/tap
  const handleCookieClick = useCallback(() => {
    if (stage === "idle") {
      setStage("shaking");
      // Longer shake time for more fun
      setTimeout(() => {
        setStage("cracking");
        // Show fortune paper after crack starts
        setTimeout(() => {
          setShowFortune(true);
          setStage("revealing");
          // Allow continue after reveal animation
          setTimeout(() => {
            setStage("revealed");
            setCanContinue(true);
          }, 2000);
        }, 600);
      }, 1200);
    }
  }, [stage]);

  // Handle continue to report
  const handleContinue = useCallback(() => {
    if (canContinue) {
      onComplete();
    }
  }, [canContinue, onComplete]);

  // Generate crumbs
  const crumbs = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.4,
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    size: 2 + Math.random() * 3,
  }));

  // Generate sparkles
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: 0.3 + Math.random() * 0.8,
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
  }));

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-600";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-600";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={stage === "revealed" ? handleContinue : undefined}
          />

          {/* Close button */}
          <motion.button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Status text */}
            <motion.h2
              className="text-white text-xl md:text-2xl font-light mb-8 text-center px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              {stage === "idle" && "✨ Tap the fortune cookie ✨"}
              {stage === "shaking" && "🔮 The spirits are awakening..."}
              {stage === "cracking" && "💫 Revealing your destiny..."}
              {stage === "revealing" && "🌟 Your fortune awaits..."}
              {stage === "revealed" && "✨ Your Fortune ✨"}
            </motion.h2>

            {/* Cookie container */}
            <div className="relative w-80 h-72 md:w-96 md:h-80 flex items-center justify-center">
              {/* Particles layer */}
              {(stage === "cracking" || stage === "revealing") && (
                <div className="absolute inset-0 pointer-events-none">
                  {crumbs.map((crumb) => (
                    <CrumbParticle key={crumb.id} {...crumb} />
                  ))}
                  {sparkles.map((sparkle) => (
                    <SparkleParticle key={sparkle.id} {...sparkle} />
                  ))}
                </div>
              )}

              {/* FORTUNE PAPER - Classic white with blue text */}
              <AnimatePresence>
                {showFortune && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20"
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <div className="relative">
                      {/* Classic Fortune Paper */}
                      <motion.div
                        className="bg-white rounded-sm shadow-2xl overflow-hidden cursor-pointer relative"
                        style={{
                          width: "320px",
                          minHeight: "120px",
                          boxShadow:
                            "0 25px 80px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.2)",
                          border: "1px solid #E5E7EB",
                        }}
                        initial={{ height: "30px", rotateX: -30 }}
                        animate={{ height: "auto", rotateX: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                        onClick={handleContinue}
                      >
                        {/* Decorative corner accents */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-red-500/30" />
                        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-red-500/30" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-red-500/30" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-red-500/30" />

                        {/* Content */}
                        <div className="p-8 pt-10 pb-10 text-center">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                          >
                            {/* Lucky numbers row */}
                            {SHOW_LUCKY_NUBMERS && (
                              <div className="flex justify-center gap-2 mb-4">
                                {luckyNumbers.map((num, i) => (
                                  <motion.span
                                    key={i}
                                    className="w-7 h-7 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1.2 + i * 0.1 }}
                                  >
                                    {num}
                                  </motion.span>
                                ))}
                              </div>
                            )}

                            {/* Fortune text - classic blue color */}
                            <p className="text-blue-900 font-serif text-lg leading-relaxed tracking-wide">
                              {fortuneText}
                            </p>

                            {/* Fortune Score badge */}
                            {SHOW_FORTUNE_SCORE_BADGE && (
                              <div
                                className={`inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-gradient-to-r ${getScoreColor(fortuneScore)} text-white text-sm font-medium shadow-lg`}
                              >
                                <Sparkles className="w-4 h-4" />
                                <span>Fortune Score: {fortuneScore}%</span>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Click to continue hint */}
                      {stage === "revealed" && (
                        <motion.div
                          className="flex justify-center mt-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <button
                            onClick={handleContinue}
                            className="flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-white text-gray-800 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
                          >
                            <span>View Full Report</span>
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BETTER FORTUNE COOKIE SVG */}
              {stage !== "revealing" && stage !== "revealed" && (
                <motion.div
                  className="relative cursor-pointer z-30"
                  onClick={handleCookieClick}
                  animate={{
                    rotate:
                      stage === "shaking"
                        ? [0, -8, 8, -8, 8, -6, 6, -4, 4, 0]
                        : 0,
                    scale:
                      stage === "shaking"
                        ? [1, 1.08, 1.05, 1.08, 1.05, 1.03, 1]
                        : 1,
                  }}
                  transition={{
                    rotate: {
                      repeat: stage === "shaking" ? Infinity : 0,
                      duration: 0.5,
                    },
                    scale: {
                      repeat: stage === "shaking" ? Infinity : 0,
                      duration: 0.5,
                    },
                  }}
                  whileHover={
                    stage === "idle" ? { scale: 1.08, rotate: 2 } : {}
                  }
                  whileTap={stage === "idle" ? { scale: 0.95 } : {}}
                >
                  <svg
                    viewBox="0 0 240 180"
                    className="w-64 h-52 md:w-72 md:h-56 drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
                    }}
                  >
                    <defs>
                      {/* Realistic cookie gradient */}
                      <radialGradient id="cookieBody" cx="50%" cy="45%" r="55%">
                        <stop offset="0%" stopColor="#F5DEB3" /> {/* Wheat */}
                        <stop offset="30%" stopColor="#E5A836" /> {/* Golden */}
                        <stop offset="60%" stopColor="#D49320" />{" "}
                        {/* Darker gold */}
                        <stop offset="100%" stopColor="#B87333" />{" "}
                        {/* Bronze */}
                      </radialGradient>

                      {/* Highlight */}
                      <radialGradient id="shine" cx="40%" cy="35%" r="35%">
                        <stop
                          offset="0%"
                          stopColor="#FFF8DC"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="100%"
                          stopColor="#F5DEB3"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      {/* Shadow for depth */}
                      <filter
                        id="softShadow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="4"
                          stdDeviation="6"
                          floodOpacity="0.3"
                        />
                      </filter>
                    </defs>

                    {/* LEFT HALF - More realistic curved shape */}
                    <motion.g
                      animate={{
                        x: stage === "cracking" ? -45 : 0,
                        rotate: stage === "cracking" ? -25 : 0,
                        y: stage === "cracking" ? 10 : 0,
                        opacity: stage === "cracking" ? 0 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                    >
                      {/* Main cookie body - smooth folded curve */}
                      <path
                        d="M120 90
                           C 115 88, 108 82, 102 74
                           C 96 66, 90 58, 82 50
                           C 72 40, 58 32, 44 30
                           C 28 28, 14 36, 8 50
                           C 2 64, 4 82, 14 96
                           C 24 110, 42 118, 60 116
                           C 78 114, 94 106, 108 98
                           C 114 94, 118 91, 120 90
                           Z"
                        fill="url(#cookieBody)"
                        stroke="#A0522D"
                        strokeWidth="1.5"
                        filter="url(#softShadow)"
                      />

                      {/* Inner fold line */}
                      <path
                        d="M108 98 Q 85 85, 60 82 Q 40 80, 25 85"
                        fill="none"
                        stroke="#8B4513"
                        strokeWidth="2"
                        opacity="0.4"
                        strokeLinecap="round"
                      />

                      {/* Surface texture/bake marks */}
                      <ellipse
                        cx="45"
                        cy="55"
                        rx="18"
                        ry="12"
                        fill="url(#shine)"
                      />
                      <path
                        d="M30 65 Q 45 72, 62 78"
                        fill="none"
                        stroke="#CD853F"
                        strokeWidth="1.5"
                        opacity="0.3"
                      />
                      <path
                        d="M25 85 Q 42 90, 58 92"
                        fill="none"
                        stroke="#CD853F"
                        strokeWidth="1.5"
                        opacity="0.3"
                      />
                    </motion.g>

                    {/* RIGHT HALF - Mirror of left */}
                    <motion.g
                      animate={{
                        x: stage === "cracking" ? 45 : 0,
                        rotate: stage === "cracking" ? 25 : 0,
                        y: stage === "cracking" ? 10 : 0,
                        opacity: stage === "cracking" ? 0 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                    >
                      {/* Main cookie body */}
                      <path
                        d="M120 90
                           C 125 88, 132 82, 138 74
                           C 144 66, 150 58, 158 50
                           C 168 40, 182 32, 196 30
                           C 212 28, 226 36, 232 50
                           C 238 64, 236 82, 226 96
                           C 216 110, 198 118, 180 116
                           C 162 114, 146 106, 132 98
                           C 126 94, 122 91, 120 90
                           Z"
                        fill="url(#cookieBody)"
                        stroke="#A0522D"
                        strokeWidth="1.5"
                        filter="url(#softShadow)"
                      />

                      {/* Inner fold line */}
                      <path
                        d="M132 98 Q 155 85, 180 82 Q 200 80, 215 85"
                        fill="none"
                        stroke="#8B4513"
                        strokeWidth="2"
                        opacity="0.4"
                        strokeLinecap="round"
                      />

                      {/* Surface texture */}
                      <ellipse
                        cx="195"
                        cy="55"
                        rx="18"
                        ry="12"
                        fill="url(#shine)"
                      />
                      <path
                        d="M210 65 Q 195 72, 178 78"
                        fill="none"
                        stroke="#CD853F"
                        strokeWidth="1.5"
                        opacity="0.3"
                      />
                      <path
                        d="M215 85 Q 198 90, 182 92"
                        fill="none"
                        stroke="#CD853F"
                        strokeWidth="1.5"
                        opacity="0.3"
                      />
                    </motion.g>

                    {/* CENTER CREASE - where cookie folds */}
                    <motion.path
                      d="M105 85
                           Q 120 95, 135 85
                           Q 120 80, 105 85"
                      fill="#C9891C"
                      stroke="#A0522D"
                      strokeWidth="1"
                      animate={{
                        opacity: stage === "cracking" ? 0 : 0.8,
                      }}
                    />

                    {/* WHITE PAPER STRIPE - Classic fortune paper */}
                    <motion.g
                      animate={{
                        y: stage === "shaking" ? [-3, 3, -3] : 0,
                        opacity: stage === "cracking" ? 0 : 1,
                      }}
                      transition={{
                        y: {
                          repeat: stage === "shaking" ? Infinity : 0,
                          duration: 0.15,
                        },
                      }}
                    >
                      {/* Paper rectangle sticking out */}
                      <rect
                        x="112"
                        y="48"
                        width="16"
                        height="32"
                        rx="1"
                        fill="#FFFFFF"
                        stroke="#D1D5DB"
                        strokeWidth="0.5"
                      />

                      {/* Paper shadow */}
                      <rect
                        x="113"
                        y="49"
                        width="16"
                        height="32"
                        rx="1"
                        fill="#000000"
                        opacity="0.08"
                      />

                      {/* Blue fortune text lines (classic look) */}
                      <g opacity="0.5">
                        <rect
                          x="115"
                          y="54"
                          width="10"
                          height="1.5"
                          rx="0.5"
                          fill="#1E40AF"
                        />
                        <rect
                          x="115"
                          y="59"
                          width="8"
                          height="1.5"
                          rx="0.5"
                          fill="#1E40AF"
                        />
                        <rect
                          x="115"
                          y="64"
                          width="9"
                          height="1.5"
                          rx="0.5"
                          fill="#1E40AF"
                        />
                        <rect
                          x="115"
                          y="69"
                          width="7"
                          height="1.5"
                          rx="0.5"
                          fill="#1E40AF"
                        />
                      </g>

                      {/* Red lucky numbers on paper edge */}
                      <circle cx="118" cy="76" r="2" fill="#DC2626" />
                      <circle cx="123" cy="76" r="2" fill="#DC2626" />
                    </motion.g>
                  </svg>

                  {/* Fun tap hint */}
                  {stage === "idle" && (
                    <motion.div
                      className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.span
                        className="text-white/80 text-sm flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        Tap to crack open!
                      </motion.span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Skip button */}
            {stage !== "idle" && stage !== "revealed" && (
              <motion.button
                className="mt-14 text-white/40 hover:text-white/70 text-sm underline transition-colors"
                onClick={onComplete}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Skip animation
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
