/**
 * Centralized Chinese Zodiac Types and Constants
 * Single source of truth for all zodiac-related types and data
 */

export enum Zodiac {
  RAT = "RAT",
  OX = "OX",
  TIGER = "TIGER",
  RABBIT = "RABBIT",
  DRAGON = "DRAGON",
  SNAKE = "SNAKE",
  HORSE = "HORSE",
  GOAT = "GOAT",
  MONKEY = "MONKEY",
  ROOSTER = "ROOSTER",
  DOG = "DOG",
  PIG = "PIG",
}

// Array of all zodiacs for iteration
export const ZODIAC_ORDER: Zodiac[] = [
  Zodiac.RAT,
  Zodiac.OX,
  Zodiac.TIGER,
  Zodiac.RABBIT,
  Zodiac.DRAGON,
  Zodiac.SNAKE,
  Zodiac.HORSE,
  Zodiac.GOAT,
  Zodiac.MONKEY,
  Zodiac.ROOSTER,
  Zodiac.DOG,
  Zodiac.PIG,
];

// Type for zodiac readings structure
export interface ZodiacReadingSection {
  header: string;
  readings: string[];
}

export interface ZodiacInfo {
  title: string;
  sections: ZodiacReadingSection[];
}

// Visual configuration for each zodiac
export interface ZodiacVisualConfig {
  emoji: string;
  character: string;
  english: string;
  gradient: string;
  shadowColor: string;
  bgGradient: string;
  accentColor: string;
  element: "Water" | "Earth" | "Wood" | "Fire" | "Metal";
  yinYang: "Yin" | "Yang";
}

// Complete zodiac data mapping
export const ZODIAC_CONFIG: Record<Zodiac, ZodiacVisualConfig> = {
  [Zodiac.RAT]: {
    emoji: "🐀",
    character: "鼠",
    english: "Rat",
    gradient: "from-slate-600 via-gray-600 to-zinc-700",
    shadowColor: "rgba(100, 116, 139, 0.4)",
    bgGradient: "from-slate-100 via-gray-50 to-zinc-100",
    accentColor: "text-slate-700",
    element: "Water",
    yinYang: "Yang",
  },
  [Zodiac.OX]: {
    emoji: "🐂",
    character: "牛",
    english: "Ox",
    gradient: "from-stone-600 via-amber-800 to-yellow-900",
    shadowColor: "rgba(146, 64, 14, 0.4)",
    bgGradient: "from-stone-100 via-amber-50 to-yellow-50",
    accentColor: "text-amber-900",
    element: "Earth",
    yinYang: "Yin",
  },
  [Zodiac.TIGER]: {
    emoji: "🐅",
    character: "虎",
    english: "Tiger",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadowColor: "rgba(251, 146, 60, 0.5)",
    bgGradient: "from-orange-50 via-amber-50 to-yellow-50",
    accentColor: "text-orange-700",
    element: "Wood",
    yinYang: "Yang",
  },
  [Zodiac.RABBIT]: {
    emoji: "🐇",
    character: "兔",
    english: "Rabbit",
    gradient: "from-pink-400 via-rose-400 to-fuchsia-400",
    shadowColor: "rgba(244, 114, 182, 0.5)",
    bgGradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    accentColor: "text-pink-700",
    element: "Wood",
    yinYang: "Yin",
  },
  [Zodiac.DRAGON]: {
    emoji: "🐉",
    character: "龍",
    english: "Dragon",
    gradient: "from-amber-400 via-yellow-400 to-orange-400",
    shadowColor: "rgba(251, 191, 36, 0.5)",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
    accentColor: "text-amber-700",
    element: "Earth",
    yinYang: "Yang",
  },
  [Zodiac.SNAKE]: {
    emoji: "🐍",
    character: "蛇",
    english: "Snake",
    gradient: "from-emerald-600 via-green-600 to-teal-600",
    shadowColor: "rgba(16, 185, 129, 0.4)",
    bgGradient: "from-emerald-50 via-green-50 to-teal-50",
    accentColor: "text-emerald-800",
    element: "Fire",
    yinYang: "Yin",
  },
  [Zodiac.HORSE]: {
    emoji: "🐎",
    character: "馬",
    english: "Horse",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    shadowColor: "rgba(239, 68, 68, 0.4)",
    bgGradient: "from-red-50 via-rose-50 to-pink-50",
    accentColor: "text-red-700",
    element: "Fire",
    yinYang: "Yang",
  },
  [Zodiac.GOAT]: {
    emoji: "🐐",
    character: "羊",
    english: "Goat",
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    shadowColor: "rgba(132, 204, 22, 0.4)",
    bgGradient: "from-lime-50 via-green-50 to-emerald-50",
    accentColor: "text-lime-800",
    element: "Earth",
    yinYang: "Yin",
  },
  [Zodiac.MONKEY]: {
    emoji: "🐒",
    character: "猴",
    english: "Monkey",
    gradient: "from-yellow-500 via-amber-500 to-orange-500",
    shadowColor: "rgba(234, 179, 8, 0.5)",
    bgGradient: "from-yellow-50 via-amber-50 to-orange-50",
    accentColor: "text-yellow-800",
    element: "Metal",
    yinYang: "Yang",
  },
  [Zodiac.ROOSTER]: {
    emoji: "🐓",
    character: "雞",
    english: "Rooster",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    shadowColor: "rgba(99, 102, 241, 0.4)",
    bgGradient: "from-blue-50 via-indigo-50 to-violet-50",
    accentColor: "text-indigo-700",
    element: "Metal",
    yinYang: "Yin",
  },
  [Zodiac.DOG]: {
    emoji: "🐕",
    character: "狗",
    english: "Dog",
    gradient: "from-amber-700 via-yellow-700 to-orange-700",
    shadowColor: "rgba(180, 83, 9, 0.4)",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50",
    accentColor: "text-amber-900",
    element: "Earth",
    yinYang: "Yang",
  },
  [Zodiac.PIG]: {
    emoji: "🐖",
    character: "豬",
    english: "Pig",
    gradient: "from-pink-500 via-rose-400 to-red-400",
    shadowColor: "rgba(236, 72, 153, 0.4)",
    bgGradient: "from-pink-50 via-rose-50 to-red-50",
    accentColor: "text-pink-700",
    element: "Water",
    yinYang: "Yin",
  },
};

// Zodiac information content for detail pages
export const ZODIAC_INFO: Record<Zodiac, ZodiacInfo> = {
  [Zodiac.RAT]: {
    title: "The Rat - Clever and Quick-Witted",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Quick-witted, resourceful, versatile, and kind",
          "Strong intuition and quick response to challenges",
          "Optimistic and energetic, popular among friends",
          "Meticulous and careful with finances and planning",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Excellent problem-solving abilities",
          "Adaptable to new environments and situations",
          "Charming and sociable with strong communication skills",
          "Thrifty and good at accumulating wealth",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Ox - Complementary strengths create harmony",
          "Dragon - Mutual respect and shared ambitions",
          "Monkey - Fun-loving partnership full of adventure",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Gold, blue, green",
          "Lucky Numbers: 2, 3",
          "Lucky Flowers: Lily, African violet",
          "Lucky Directions: Southeast, northeast",
        ],
      },
    ],
  },
  [Zodiac.OX]: {
    title: "The Ox - Diligent and Dependable",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Diligent, dependable, strong, and determined",
          "Honest and earnest with strong moral principles",
          "Patient and methodical in approach to life",
          "Reliable friend and devoted family member",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Strong sense of responsibility and duty",
          "Excellent organizational and planning skills",
          "Persistent and determined to achieve goals",
          "Trustworthy and loyal in relationships",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Rat - Harmonious partnership with mutual benefits",
          "Snake - Deep understanding and shared values",
          "Rooster - Complementary skills and mutual support",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: White, yellow, green",
          "Lucky Numbers: 1, 4",
          "Lucky Flowers: Tulip, evergreen, peach blossom",
          "Lucky Directions: Southeast, south, north",
        ],
      },
    ],
  },
  [Zodiac.TIGER]: {
    title: "The Tiger - Brave and Confident",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Brave, confident, competitive, and charming",
          "Natural leaders with magnetic personalities",
          "Passionate and enthusiastic about life",
          "Independent and unafraid of challenges",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Courageous and willing to take risks",
          "Charismatic and inspiring to others",
          "Decisive and action-oriented",
          "Generous and protective of loved ones",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Dragon - Powerful alliance of two strong signs",
          "Horse - Shared energy and adventurous spirit",
          "Pig - Complementary balance and mutual respect",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Blue, gray, orange",
          "Lucky Numbers: 1, 3, 4",
          "Lucky Flowers: Cineraria, lily",
          "Lucky Directions: East, north, south",
        ],
      },
    ],
  },
  [Zodiac.RABBIT]: {
    title: "The Rabbit - Gentle and Elegant",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Gentle, quiet, elegant, and alert",
          "Quick-witted with a keen eye for detail",
          "Patient and considerate of others",
          "Responsible and conscientious in all endeavors",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Diplomatic and skilled at conflict resolution",
          "Creative with refined artistic sensibilities",
          "Compassionate and empathetic towards others",
          "Cautious and wise in decision-making",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Sheep/Goat - Gentle harmony and mutual understanding",
          "Dog - Loyal companionship and shared values",
          "Pig - Peaceful and supportive relationship",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Red, pink, purple, blue",
          "Lucky Numbers: 3, 4, 9",
          "Lucky Flowers: Lily, nerve plant",
          "Lucky Directions: East, southeast, south",
        ],
      },
    ],
  },
  [Zodiac.DRAGON]: {
    title: "The Dragon - Powerful and Charismatic",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Confident, intelligent, enthusiastic, and charismatic",
          "Natural born leaders with strong ambitions",
          "Energetic and unafraid of challenges",
          "Lucky and often successful in endeavors",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Exceptional leadership abilities",
          "Innovative and forward-thinking mindset",
          "Courageous and determined to succeed",
          "Inspiring and influential to others",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Rat - Dynamic partnership with shared ambitions",
          "Monkey - Creative collaboration full of energy",
          "Rooster - Mutual admiration and respect",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Gold, silver, grayish white",
          "Lucky Numbers: 1, 6, 7",
          "Lucky Flowers: Bleeding heart vine, larkspur",
          "Lucky Directions: East, north, south",
        ],
      },
    ],
  },
  [Zodiac.SNAKE]: {
    title: "The Snake - Wise and Mysterious",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Enigmatic, intelligent, and wise",
          "Graceful and elegant in manner and appearance",
          "Determined and persistent in achieving goals",
          "Intuitive with deep understanding of others",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Excellent analytical and problem-solving skills",
          "Calm and composed under pressure",
          "Resourceful and adaptable to change",
          "Perceptive with keen insight into situations",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Ox - Stable and supportive partnership",
          "Rooster - Intellectual connection and mutual respect",
          "Monkey - Stimulating and dynamic relationship",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Black, red, yellow",
          "Lucky Numbers: 2, 8, 9",
          "Lucky Flowers: Orchid, cactus",
          "Lucky Directions: East, west, southwest",
        ],
      },
    ],
  },
  [Zodiac.HORSE]: {
    title: "The Horse - Energetic and Independent",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Animated, active, and energetic",
          "Independent and freedom-loving",
          "Quick-witted with a great sense of humor",
          "Warm-hearted and enthusiastic about life",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Excellent communication and social skills",
          "Adaptable and flexible in changing situations",
          "Cheerful and positive attitude",
          "Strong determination to achieve freedom and success",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Tiger - Dynamic and energetic partnership",
          "Sheep/Goat - Gentle understanding and support",
          "Dog - Loyal friendship and mutual trust",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Yellow, green",
          "Lucky Numbers: 2, 3, 7",
          "Lucky Flowers: Jasmine, sunflower",
          "Lucky Directions: East, west, south",
        ],
      },
    ],
  },
  [Zodiac.GOAT]: {
    title: "The Goat - Gentle and Compassionate",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Gentle, mild-mannered, and compassionate",
          "Creative and artistic with refined tastes",
          "Persistent and determined despite gentle appearance",
          "Strong inner resilience and quiet strength",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Strong creative and artistic abilities",
          "Compassionate and caring towards others",
          "Patient and persistent in pursuing goals",
          "Diplomatic and skilled at maintaining harmony",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Rabbit - Gentle harmony and shared sensibilities",
          "Horse - Complementary energies and mutual support",
          "Pig - Peaceful and nurturing relationship",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Green, red, purple",
          "Lucky Numbers: 2, 7",
          "Lucky Flowers: Carnation, primrose",
          "Lucky Directions: East, southeast, south",        ],
      },
    ],
  },
  [Zodiac.MONKEY]: {
    title: "The Monkey - Clever and Versatile",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Sharp, smart, curious, and mischievous",
          "Quick-witted with excellent problem-solving skills",
          "Versatile and adaptable to any situation",
          "Energetic and always ready for new challenges",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Exceptional intelligence and quick learning ability",
          "Creative and innovative thinking",
          "Excellent social skills and sense of humor",
          "Resourceful and able to find solutions quickly",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Rat - Clever partnership with shared wit",
          "Dragon - Dynamic and powerful alliance",
          "Snake - Intellectual stimulation and mutual respect",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: White, blue, gold",
          "Lucky Numbers: 4, 9",
          "Lucky Flowers: Chrysanthemum, crape myrtle",
          "Lucky Directions: North, northwest, west",
        ],
      },
    ],
  },
  [Zodiac.ROOSTER]: {
    title: "The Rooster - Observant and Hardworking",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Observant, hardworking, courageous, and talented",
          "Confident and unafraid to speak their mind",
          "Meticulous and detail-oriented in all endeavors",
          "Honest and straightforward in communication",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Strong organizational and planning abilities",
          "Excellent attention to detail",
          "Courageous and willing to take on challenges",
          "Reliable and responsible in fulfilling duties",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Ox - Stable and complementary partnership",
          "Snake - Intellectual connection and mutual understanding",
          "Dragon - Mutual respect and shared ambitions",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Gold, brown, yellow",
          "Lucky Numbers: 5, 7, 8",
          "Lucky Flowers: Gladiola, cockscomb",
          "Lucky Directions: South, southeast",
        ],
      },
    ],
  },
  [Zodiac.DOG]: {
    title: "The Dog - Loyal and Honest",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Loyal, honest, cautious, and kind",
          "Strong sense of justice and fairness",
          "Reliable and trustworthy in all relationships",
          "Caring and protective of loved ones",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Unwavering loyalty and devotion",
          "Strong moral compass and integrity",
          "Excellent judgment and intuition",
          "Reliable and responsible nature",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Rabbit - Gentle harmony and mutual understanding",
          "Tiger - Loyal friendship with shared values",
          "Horse - Energetic partnership with mutual respect",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Red, green, purple",
          "Lucky Numbers: 3, 4, 9",
          "Lucky Flowers: Rose, orchid",
          "Lucky Directions: East, southeast, south",
        ],
      },
    ],
  },
  [Zodiac.PIG]: {
    title: "The Pig - Compassionate and Generous",
    sections: [
      {
        header: "Personality Traits",
        readings: [
          "Compassionate, generous, and diligent",
          "Peace-loving and harmonious nature",
          "Sincere and honest in all dealings",
          "Optimistic and able to see the good in others",
        ],
      },
      {
        header: "Strengths",
        readings: [
          "Genuine kindness and generosity",
          "Strong work ethic and determination",
          "Ability to maintain peace and harmony",
          "Loyal and devoted to family and friends",
        ],
      },
      {
        header: "Best Matches",
        readings: [
          "Tiger - Complementary balance of strength and gentleness",
          "Rabbit - Peaceful and harmonious partnership",
          "Sheep/Goat - Gentle understanding and mutual support",
        ],
      },
      {
        header: "Lucky Elements",
        readings: [
          "Lucky Colors: Yellow, gray, brown",
          "Lucky Numbers: 2, 5, 8",
          "Lucky Flowers: Hydrangea, daisy",
          "Lucky Directions: Southeast, northeast",
        ],
      },
    ],
  },
};

// Helper functions

/**
 * Normalize a string to Zodiac enum
 * Handles various input formats (uppercase, lowercase, mixed case)
 */
export function normalizeZodiac(input: string): Zodiac | null {
  if (!input) return null;
  const normalized = input.toUpperCase().trim();
  if (normalized in Zodiac) {
    return Zodiac[normalized as keyof typeof Zodiac];
  }
  // Try to match by English name
  for (const [key, config] of Object.entries(ZODIAC_CONFIG)) {
    if (config.english.toUpperCase() === normalized) {
      return key as Zodiac;
    }
  }
  return null;
}

/**
 * Get zodiac by birth year
 * Chinese zodiac cycles every 12 years, starting from Rat (1924, 1936, etc.)
 */
export function getZodiacByYear(year: number): Zodiac {
  const zodiacIndex = (year - 1924) % 12;
  return ZODIAC_ORDER[zodiacIndex];
}

/**
 * Get all years for a specific zodiac
 * Returns array of years in the 20th and 21st century
 */
export function getYearsForZodiac(zodiac: Zodiac): number[] {
  const baseYear = 1924 + ZODIAC_ORDER.indexOf(zodiac);
  const years: number[] = [];
  for (let year = baseYear; year <= 2036; year += 12) {
    years.push(year);
  }
  return years;
}

/**
 * Check if two zodiacs are compatible
 * Returns compatibility level: 'best', 'good', 'neutral', 'challenging'
 */
export function getZodiacCompatibility(zodiac1: Zodiac, zodiac2: Zodiac): 'best' | 'good' | 'neutral' | 'challenging' {
  if (zodiac1 === zodiac2) return 'good';
  
  // Same element is generally good
  if (ZODIAC_CONFIG[zodiac1].element === ZODIAC_CONFIG[zodiac2].element) return 'good';
  
  // Yin-Yang balance is good
  if (ZODIAC_CONFIG[zodiac1].yinYang !== ZODIAC_CONFIG[zodiac2].yinYang) return 'good';
  
  return 'neutral';
}

/**
 * Get previous zodiac in the cycle
 */
export function getPreviousZodiac(zodiac: Zodiac): Zodiac {
  const index = ZODIAC_ORDER.indexOf(zodiac);
  return ZODIAC_ORDER[(index - 1 + 12) % 12];
}

/**
 * Get next zodiac in the cycle
 */
export function getNextZodiac(zodiac: Zodiac): Zodiac {
  const index = ZODIAC_ORDER.indexOf(zodiac);
  return ZODIAC_ORDER[(index + 1) % 12];
}
