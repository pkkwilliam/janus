'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Home, User, Settings, Menu, X, LogIn, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from './logo';

const publicNavigation = [
  { name: 'Pricing', href: '/pricing', icon: Star },
];

const privateNavigation = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state based on JWT token presence
  useEffect(() => {
    const checkAuthState = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
      }
    };

    checkAuthState();

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuthState);
    
    return () => {
      window.removeEventListener('storage', checkAuthState);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 border-b border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            
            <div className="flex items-center space-x-2">
              {/* Public navigation (always visible) */}
              {publicNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <motion.div key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl -z-10"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                        }}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                );
              })}

              {isLoggedIn ? (
                // Show private navigation when logged in
                privateNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div key={item.name} className="relative">
                      <Link
                        href={item.href}
                        className={cn(
                          'relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive 
                            ? 'text-white' 
                            : 'text-gray-600 hover:text-gray-900'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl -z-10"
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                          }}
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </motion.div>
                  );
                })
              ) : (
                // Show login button when not logged in
                <motion.div className="relative">
                  <Link
                    href="/auth/login"
                    className="relative flex items-center space-x-2 px-6 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header 
          className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="px-4 h-16 flex items-center justify-between">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            
            <div className="flex items-center space-x-2">
              {!isLoggedIn && (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed top-16 left-0 right-0 z-40 border-b border-white/20',
            isMobileMenuOpen ? 'block' : 'hidden'
          )}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="px-4 py-6 space-y-2">
            {[
              ...publicNavigation,
              ...(isLoggedIn ? privateNavigation : [{ name: 'Login', href: '/auth/login', icon: LogIn }])
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200',
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: isActive ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <nav 
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className={cn(
            "grid h-16",
            isLoggedIn ? "grid-cols-4" : "grid-cols-3"
          )}>
            {[
              { name: 'Home', href: '/', icon: Home },
              ...publicNavigation,
              ...(isLoggedIn ? privateNavigation : [{ name: 'Login', href: '/auth/login', icon: LogIn }])
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative flex flex-col items-center justify-center space-y-1 transition-all duration-200',
                    isActive 
                      ? 'text-indigo-600' 
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-xs font-medium">{item.name}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="bottomActiveTab"
                      className="absolute top-2 left-1/2 w-6 h-1 rounded-full -translate-x-1/2"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}