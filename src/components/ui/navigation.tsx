"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Settings,
  Menu,
  X,
  LogIn,
  Star,
  Crown,
  Package,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LogoSvg } from "./logo";
import { authAPI } from "@/lib/api/auth";
import { userAPI } from "@/lib/api/user";

const publicNavigation = [{ name: "Pricing", href: "/pricing", icon: Star }];

const privateNavigation = [
  { name: "Order History", href: "/orders", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize based on localStorage if available
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("authToken");
    }
    return false;
  });
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  // Check authentication state and user subscription status
  useEffect(() => {
    let lastToken: string | null = null;
    let planDataLoaded = false;

    const checkAuthState = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        const loggedIn = !!token;

        // Only update if token changed
        if (token !== lastToken) {
          lastToken = token;
          setIsLoggedIn(loggedIn);

          // If logged in and plan data not loaded yet
          if (loggedIn && !planDataLoaded && !isLoadingPlan) {
            planDataLoaded = true;
            setIsLoadingPlan(true);
            try {
              const planResponse = await userAPI.getPlan();
              setHasActiveSubscription(
                planResponse.data?.hasActiveSubscription || false
              );
            } catch (error) {
              console.error("Failed to load user plan in navigation:", error);
              setHasActiveSubscription(false);
            } finally {
              setIsLoadingPlan(false);
            }
          } else if (!loggedIn) {
            planDataLoaded = false;
            setHasActiveSubscription(false);
          }
        }
      }
      setIsAuthLoading(false);
    };

    checkAuthState();

    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener("storage", checkAuthState);

    // Listen for custom auth change events (login/logout in same tab)
    window.addEventListener("authStateChange", checkAuthState);

    return () => {
      window.removeEventListener("storage", checkAuthState);
      window.removeEventListener("authStateChange", checkAuthState);
    };
  }, []); // Empty dependency array - only run on mount

  // Handle logout
  const handleLogout = () => {
    authAPI.logout();
    router.push("/auth/login");
    setIsMobileMenuOpen(false);
  };

  // Filter navigation items based on subscription status
  const filteredPublicNavigation = publicNavigation.filter(
    (item) => !(item.name === "Pricing" && hasActiveSubscription)
  );

  // Add "Upgrade to Premium" to private navigation if user doesn't have active subscription
  const filteredPrivateNavigation = [
    ...privateNavigation,
    ...(!hasActiveSubscription
      ? [{ name: "Upgrade to Premium", href: "/pricing", icon: Crown }]
      : []),
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 border-b border-white/20"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <LogoSvg size="sm" />
            </Link>

            <div className="flex items-center space-x-2">
              {/* Public navigation (always visible) */}
              {filteredPublicNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <motion.div key={item.name} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
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
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                        }}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </motion.div>
                );
              })}

              {isLoggedIn
                ? // Show private navigation when logged in
                  filteredPrivateNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <motion.div key={item.name} className="relative">
                        <Link
                          href={item.href}
                          className={cn(
                            "relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive
                              ? "text-white"
                              : "text-gray-600 hover:text-gray-900"
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
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                            }}
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                      </motion.div>
                    );
                  })
                : null}

              {/* Logout button for desktop - only when logged in */}
              {isLoggedIn && (
                <motion.div className="relative">
                  <button
                    onClick={handleLogout}
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:scale-105"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}

              {!isLoggedIn && !isAuthLoading ? (
                // Show login button only when not logged in and not loading
                <motion.div className="relative">
                  <Link
                    href="/auth/login"
                    className="relative flex items-center space-x-2 px-6 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              ) : null}
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
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="px-4 h-16 flex items-center justify-between">
            <Link href="/">
              <LogoSvg size="sm" />
            </Link>

            <div className="flex items-center space-x-2">
              {!isLoggedIn && !isAuthLoading && (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
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
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-16 left-0 right-0 z-40 border-b border-white/20",
            isMobileMenuOpen ? "block" : "hidden"
          )}
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="px-4 py-6 space-y-2">
            {/* Navigation Links */}
            {[
              ...filteredPublicNavigation,
              ...(isLoggedIn
                ? filteredPrivateNavigation
                : !isAuthLoading
                ? [{ name: "Login", href: "/auth/login", icon: LogIn }]
                : []),
            ].map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: isActive
                      ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                      : "none",
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Logout Button - only for logged in users */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 text-gray-600 hover:text-gray-900"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </motion.div>
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
