'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animate?: boolean;
}

export function Logo({ className, size = 'md', showText = true, animate = true }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const LogoIcon = () => (
    <div className={cn("relative", sizeClasses[size])}>
      {/* Fortune Cookie Shape */}
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cookie gradient background */}
        <defs>
          <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Fortune Cookie Main Shape */}
        <path
          d="M32 8 C16 8, 8 20, 8 32 C8 44, 16 56, 32 56 C48 56, 56 44, 56 32 C56 20, 48 8, 32 8 Z"
          fill="url(#cookieGradient)"
          className="drop-shadow-md"
        />
        
        {/* Cookie Fold/Crease */}
        <path
          d="M20 32 Q32 20, 44 32 Q32 44, 20 32"
          fill="none"
          stroke="#92400E"
          strokeWidth="1.5"
          opacity="0.6"
        />
        
        {/* Inner Cookie Details */}
        <ellipse
          cx="32"
          cy="32"
          rx="18"
          ry="20"
          fill="none"
          stroke="#92400E"
          strokeWidth="1"
          opacity="0.4"
        />
        
        {/* Mystical Sparkles */}
        <circle cx="26" cy="24" r="1.5" fill="url(#sparkleGradient)" filter="url(#glow)" opacity="0.8" />
        <circle cx="38" cy="28" r="1" fill="url(#sparkleGradient)" filter="url(#glow)" opacity="0.6" />
        <circle cx="30" cy="40" r="1.2" fill="url(#sparkleGradient)" filter="url(#glow)" opacity="0.7" />
        <circle cx="42" cy="38" r="0.8" fill="url(#sparkleGradient)" filter="url(#glow)" opacity="0.5" />
        
        {/* Paper Fortune Slip */}
        <rect
          x="28"
          y="30"
          width="8"
          height="3"
          rx="0.5"
          fill="#FBBF24"
          opacity="0.9"
        />
      </svg>
    </div>
  );

  const MotionLogo = animate ? motion.div : 'div';

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <MotionLogo
        {...(animate && {
          whileHover: { 
            scale: 1.05,
            rotate: 5,
            transition: { duration: 0.2 }
          },
          whileTap: { scale: 0.95 }
        })}
      >
        <LogoIcon />
      </MotionLogo>
      
      {showText && (
        <div className="flex flex-col">
          <motion.span 
            className={cn(
              "font-light tracking-tight text-gray-900",
              textSizeClasses[size]
            )}
            {...(animate && {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.1, duration: 0.3 }
            })}
          >
            Fortune-Cookie
          </motion.span>
          <motion.span 
            className="text-xs text-gray-500 font-light tracking-wider -mt-1"
            {...(animate && {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.2, duration: 0.3 }
            })}
          >
            .me
          </motion.span>
        </div>
      )}
    </div>
  );
}

// Icon-only version for smaller spaces
export function LogoIcon({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return <Logo className={className} size={size} showText={false} animate={false} />;
}