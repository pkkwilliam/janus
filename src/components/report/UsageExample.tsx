// Example: How to use YearlyReportSwipeCard in your dashboard
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { YearlyReportSwipeCard } from "@/components/report";
import { Zodiac } from "@/types/zodiac";
import { Report } from "@/lib/api/reports";

// In your dashboard component:
function DashboardContent() {
  const [reports, setReports] = useState<Report[]>([]);
  const router = useRouter();

  // Determine user's zodiac animal based on their birth year
  // You can calculate this from user.birthDate or pass it as a prop
  const userZodiacAnimal: Zodiac = Zodiac.DRAGON; // or Zodiac.TIGER, Zodiac.RABBIT, etc.

  const handleReportClick = (report: Report) => {
    router.push(`/report?id=${report.id}`);
  };

  return (
    <div className="min-h-screen px-4 py-4 md:py-8 max-w-7xl mx-auto">
      {/* ... other sections ... */}

      {/* Yearly Reports Section - Swipeable Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4 md:mb-8"
      >
        <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
          Your Fortune Reports
        </h2>

        {/* Use the new swipeable card for yearly reports */}
        <YearlyReportSwipeCard
          reports={reports}
          zodiacAnimal={userZodiacAnimal}
          onReportClick={handleReportClick}
          animationEnabled={true} // Can toggle this off by default if needed
        />
      </motion.div>

      {/* ... rest of dashboard ... */}
    </div>
  );
}

// Available zodiac animals (use Zodiac enum):
// Zodiac.RAT | Zodiac.OX | Zodiac.TIGER | Zodiac.RABBIT | Zodiac.DRAGON | Zodiac.SNAKE 
// | Zodiac.HORSE | Zodiac.GOAT | Zodiac.MONKEY | Zodiac.ROOSTER | Zodiac.DOG | Zodiac.PIG
