// Encoded Lunar New Year dates for 1900-2030 (Format: Month * 100 + Day)
const LUNAR_DATA = [
  131, 219, 208, 129, 216, 204, 125, 213, 202, 122, 210, 130, 218, 206, 126, 214, 203, 123, 211, 201,
  220, 208, 128, 216, 205, 124, 213, 202, 123, 210, 130, 217, 206, 126, 214, 204, 124, 211, 131, 219,
  208, 127, 215, 205, 125, 213, 202, 122, 210, 129, 217, 206, 127, 214, 203, 124, 212, 131, 218, 208,
  128, 215, 205, 125, 213, 202, 121, 209, 130, 217, 206, 127, 215, 203, 123, 211, 131, 218, 207, 128,
  216, 205, 125, 213, 202, 220, 209, 129, 217, 206, 127, 215, 204, 123, 210, 131, 219, 207, 128, 216,
  205, 124, 212, 201, 122, 209, 129, 218, 207, 126, 214, 203, 123, 210, 131, 219, 208, 128, 216, 205,
  125, 212, 201, 122, 210, 129, 217, 206, 126, 213, 203
];

// Zodiac enum matching Java version
export enum Zodiac {
  RAT = 'RAT',
  OX = 'OX',
  TIGER = 'TIGER',
  RABBIT = 'RABBIT',
  DRAGON = 'DRAGON',
  SNAKE = 'SNAKE',
  HORSE = 'HORSE',
  GOAT = 'GOAT',
  MONKEY = 'MONKEY',
  ROOSTER = 'ROOSTER',
  DOG = 'DOG',
  PIG = 'PIG'
}

// Zodiac Chinese names
export const ZODIAC_CHINESE: Record<Zodiac, string> = {
  [Zodiac.RAT]: '鼠',
  [Zodiac.OX]: '牛',
  [Zodiac.TIGER]: '虎',
  [Zodiac.RABBIT]: '兔',
  [Zodiac.DRAGON]: '龍',
  [Zodiac.SNAKE]: '蛇',
  [Zodiac.HORSE]: '馬',
  [Zodiac.GOAT]: '羊',
  [Zodiac.MONKEY]: '猴',
  [Zodiac.ROOSTER]: '雞',
  [Zodiac.DOG]: '狗',
  [Zodiac.PIG]: '豬'
};

// Zodiac emojis
export const ZODIAC_EMOJI: Record<Zodiac, string> = {
  [Zodiac.RAT]: '🐀',
  [Zodiac.OX]: '🐂',
  [Zodiac.TIGER]: '🐅',
  [Zodiac.RABBIT]: '🐇',
  [Zodiac.DRAGON]: '🐉',
  [Zodiac.SNAKE]: '🐍',
  [Zodiac.HORSE]: '🐎',
  [Zodiac.GOAT]: '🐐',
  [Zodiac.MONKEY]: '🐒',
  [Zodiac.ROOSTER]: '🐓',
  [Zodiac.DOG]: '🐕',
  [Zodiac.PIG]: '🐖'
};

/**
 * Get the Lunar New Year date for a given year
 */
function getLunarNewYearDate(year: number): Date | null {
  if (year < 1900 || year > 2030) return null;
  const encoded = LUNAR_DATA[year - 1900];
  const month = Math.floor(encoded / 100);
  const day = encoded % 100;
  return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
}

/**
 * Calculate zodiac based on birth date using Lunar calendar
 */
export function getZodiac(birthDate: Date): Zodiac {
  const year = birthDate.getFullYear();
  const cnyDate = getLunarNewYearDate(year);

  // If birth is before that year's Lunar NY, use the previous year
  const effectiveYear = (cnyDate && birthDate < cnyDate) ? year - 1 : year;

  let index = (effectiveYear - 1900) % 12;
  if (index < 0) index += 12;

  return Object.values(Zodiac)[index];
}

/**
 * Get zodiac string for file lookup (matches the JSON filenames)
 */
export function getZodiacString(birthDate: Date): string {
  return getZodiac(birthDate);
}
