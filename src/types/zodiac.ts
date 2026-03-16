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
    title: "The Rat: Low-Key, Sharp, and Totally Magnetic",
    sections: [
      {
        header: "Vibe & Social Strategy",
        readings: [
          "People born in the Year of the Rat are super easy to be around. They’re hard workers and keep a tight grip on their wallet—unless they really vibe with you. If you get a pricey gift from a Rat, take it as a huge compliment; it means they think the world of you. They take pride in their precision but aren't out here chasing clout or desperate for fans.",
          "On the surface, they might seem like the quiet type, but they’ve actually got a lot of fire inside. The secret to their popularity is their self-control; they keep that intensity in check, which is why everyone wants to be their friend.",
        ],
      },
      {
        header: "The Hustle & The Bag",
        readings: [
          "Naturally clever and industrious, Rats are masters of the 'save for a rainy day' mentality. They rarely worry about the basics. By mid-life, they usually have a solid nest egg. Because they’re cautious by nature, they aren’t big on gambling in the stock market—they’d much rather see that steady interest hitting their bank account.",
          "The second half of their life is usually smooth sailing, often even better than the first. They have that 'Mickey Mouse' charm—honest, chill, and optimistic. Even when things get heavy, they don’t let it crush their spirit. If you see someone cracking jokes in a room full of stressed-out people, they’re probably a Rat.",
        ],
      },
      {
        header: "Quiet Strength",
        readings: [
          "They’ve got an iron will and a survival instinct that’s second to none. They’re adaptable and don’t feel the need to flex or dominate the room. They might not have that loud 'alpha' energy, but they are relentless. Whether it’s for their career or their family, once they set a goal, they’re locked in until it's done.",
          "Don't let the quiet exterior fool you; they aren't just sitting there. Rats are social butterflies who genuinely cherish their inner circle. They love a good party or a hangout and are usually the ones making sure everyone is having a blast with their quick wit.",
        ],
      },
      {
        header: "Instincts & Lifestyle",
        readings: [
          "Rats are minimalist-adjacent—they love to save and collect, ensuring their life stays organized and comfortable. You’ll rarely see a Rat truly 'down and out' because they manage their world so well.",
          "Their intuition is top-tier. They can sense trouble from a mile away and know when to bail. On the rare occasion they ignore that gut feeling, they might hit a wall—but usually, that only happens once. They don’t mind a calculated risk here and there, and honestly? Luck usually stays on their side.",
        ],
      },
    ],
  },
  [Zodiac.OX]: {
    title: "The Ox: Solid, Driven, and Low-Key Powerful",
    sections: [
      {
        header: "The Work Ethic",
        readings: [
          "People born in the Year of the Ox are the ultimate definition of 'reliable.' They’re hardworking, grounded, and usually the ones the boss trusts most. When things get messy, their insane stamina kicks in, and they just push through until the job is done. They’re absolute hustlers who play for the long-term win, though they tend to keep their feelings close to the chest, making them a bit of a mystery to others. Even in a heated argument, they'd rather keep it chill and talk things out rationally than blow up.",
          "Stability, grit, and a practical creative streak are their superpowers. But when it comes to their mindset, they can be as stubborn as... well, an ox. Their biggest hurdle is being a bit too rigid—sometimes they ignore good advice and just do things their way. Since they value tradition, learning to be a bit more flexible and empathetic to others' vibes is their key to leveling up.",
        ],
      },
      {
        header: "Romance & Connection",
        readings: [
          "Don't expect an Ox to be all over social media posting paragraphs about their feelings. They’re pretty conservative with emotions and prefer showing love in quiet, indirect ways. They are honest and down-to-earth, but if you’re looking for a cinematic, over-the-top romance, you might find them a bit low-key. They aren't about the drama; they're about the real stuff.",
        ],
      },
      {
        header: "The Inner Fire",
        readings: [
          "Most of the time they’re cool, but if you actually push an Ox to their limit, watch out—their temper is legendary and can be a bit intimidating. They know exactly who they like and who they don’t, and they won't fake a friendship with someone they find annoying. They have a natural urge to lead and take amazing care of the people who depend on them. They’re the type who wants a tight-knit crew that shares their vision.",
        ],
      },
      {
        header: "The Long Game",
        readings: [
          "The Ox is the definition of a 'late bloomer.' Their wealth and career usually peak later in life, but it's built on a foundation that won't crack. Even though they look mellow on the outside, they have a strong desire to be noticed and successful—they aren't meant to stay in the shadows forever. As long as they don't rush the process, they’re guaranteed to be the ones on top in the end.",
        ],
      },
    ],
  },
  [Zodiac.TIGER]: {
    title: "The Tiger: Bold, Restless, and Unstoppable",
    sections: [
      {
        header: "Main Character Energy",
        readings: [
          "Ranking third in the zodiac, those born in the Year of the Tiger are the ultimate lone wolves. They’ve got high self-esteem and an independent streak that makes them natural-born leaders—the kind of person who protects their crew but expects everyone to follow their lead. They’re fast-movers and risk-takers, which can sometimes lead to messy mistakes, but here’s the thing: a Tiger never truly stays down. If they hit a wall, they just reset and go again until they win. They love a good debate and hate losing an argument; convincing a Tiger they’re wrong is basically mission impossible.",
          "While Tiger men tend to be stubborn and competitive, Tiger women are often more detail-oriented and strategic. They think three steps ahead in both their career and personal life, making them the ultimate power partners.",
        ],
      },
      {
        header: "The Rebel Spirit",
        readings: [
          "Tigers live life in the fast lane and can be a bit impulsive, which sometimes clouds their judgment. They aren't fans of rules—unless they’re the ones making them. It’s totally normal to meet a Tiger who’s hopped through five different careers because they can’t stand feeling stuck or restricted by outside pressure. They need room to breathe and evolve.",
          "They have a fierce sense of justice and zero patience for beating around the bush. Even if it’s their boss, if a Tiger sees something wrong, they’re going to call it out. They aren't great at playing the corporate politics game just to get ahead; they’d rather be real than be 'safe.'",
        ],
      },
      {
        header: "The Trendsetter",
        readings: [
          "In a Tiger's eyes, following trends is for people with no original taste. They see themselves as the innovators and the ones setting the standards. Their vibe is usually way ahead of the curve because they refuse to just follow the crowd.",
          "When they commit to something, they are all-in—literally nothing can scare them off once they’ve set their sights on a goal. Ironically, they often find themselves surrounded by other high-energy, slightly chaotic people, which makes for a wild social life that’s hard to walk away from.",
        ],
      },
      {
        header: "The Bag & The Hustle",
        readings: [
          "Tigers aren't actually obsessed with money. Don’t get it twisted—they like having plenty of it—but they aren't slaves to the grind. They have this innate confidence that as long as they’re doing their thing, the cash will just be there... right up until the moment it’s gone.",
          "They value honesty above all, even if life occasionally pushes them into grey areas. They can’t stand unfair authority or sketchy laws and will fight tooth and nail for what they believe in. Because they’re always looking for the next big move, some Tigers might not find their 'forever' role until their 50s, but they’ll have one hell of a story to tell by then.",
        ],
      },
    ],
  },
  [Zodiac.RABBIT]: {
    title: "The Rabbit: Pure Elegance and Low-Key Brilliance",
    sections: [
      {
        header: "The Ultimate Vibe",
        readings: [
          "Honestly, the Rabbit has the best personality in the zodiac. They’re the definition of 'chill'—gentle, quiet, and incredibly polite. But don't mistake their softness for weakness; they are sharp, detail-oriented, and have a deep sense of responsibility. People naturally gravitate toward them because they’re just so easy to be around.",
          "When it comes to the grind, a Rabbit is all in. They’re meticulous and serious about their craft. They don’t just do the job; they do it with a level of precision and dedication that’s hard to match.",
        ],
      },
      {
        header: "Family & Home Life",
        readings: [
          "At home, Rabbits are the ultimate parents. They’re warm and loving but know how to keep things disciplined without being overbearing. They don't look for a 'payback' from their kids; they just want to see them thrive. They also never forget where they came from—their loyalty to their parents is next-level. They’re the ones who walk into a room and instantly lift the mood, making everyone’s stress just melt away.",
        ],
      },
      {
        header: "The Social Circle",
        readings: [
          "Rabbits are all about 'real recognize real.' They are incredibly sincere and always follow through on their word. That said, they aren't an open book to everyone right away—they keep a guard up with new people until time proves they’re worth the energy. If you’ve been friends with a Rabbit since you were kids, know that they cherish that bond more than anything.",
        ],
      },
      {
        header: "Energy & Aesthetics",
        readings: [
          "The Rabbit man is the definition of suave. He’s got that gentle smile and effortless charm that makes him instantly trustworthy. He handles drama with total composure and never lets setbacks get him down. He just keeps pushing until he hits that enviable success.",
          "The Rabbit woman is pure elegance. She’s kind-hearted and has this multi-talented 'main character' energy—whether it’s art, cooking, or style, she masters it effortlessly. Her presence is so refined that anything toxic or basic just fades into the background when she’s around.",
        ],
      },
      {
        header: "Loyalty in Love",
        readings: [
          "In love, a Rabbit is the most loyal partner you could ask for. They don't fall fast, and they definitely don't fall for smooth talk or players. But once they feel a genuine connection and decide you’re the one, they are 100% committed, giving their heart and soul to the person they love.",
        ],
      },
    ],
  },
  [Zodiac.DRAGON]: {
    title: "Year of the Dragon",
    sections: [
      {
        header: "The Legendary Dragon",
        readings: [
          "Among the twelve zodiac animals of the Chinese Earthly Branches, the Dragon is the only mythical creature. Since ancient times, the Chinese have regarded the Dragon, Phoenix, Qilin, and Turtle as the 'Four Sacred Spirits'—symbols of the highest fortune and blessings.",
          "The Dragon is imagined with the long face of a horse, the body of a snake, eighty-one shimmering scales along its back, and claws like a rooster. It can soar through the sky and dive into the deepest waters, appearing and disappearing in mysterious ways. Even the number eighty-one carries a poetic meaning, symbolizing the dance of endless hope. Truly, the Dragon is a creature adored with countless blessings.",
        ],
      },
      {
        header: "Personality of Dragon-Born Individuals",
        readings: [
          "People born in the Year of the Dragon often carry an air of mystery and unpredictability, much like the mythical dragon itself. They are ambitious dreamers who love adventure and romantic lifestyles. At the same time, they tend to be detached from worldly conventions, naturally giving off the aura of someone destined for big things.",
          "Their minds are as vast and shifting as the ocean. At times they may appear relaxed—even lazy—perfectly content sitting around watching TV without worry. But once they decide to act, their energy and ambition can easily surpass that of others.",
        ],
      },
      {
        header: "Natural Charisma",
        readings: [
          "Dragon-born individuals often possess remarkable charisma. Their presence alone can draw attention, making them shine in fields like entertainment, sports, or spiritual leadership.",
          "Many famous figures share this zodiac sign. International icon Marilyn Monroe and the influential philosopher Friedrich Nietzsche were both born in the Year of the Dragon.",
        ],
      },
      {
        header: "Dreamers with Intense Passion",
        readings: [
          "Dragons are dreamers at heart. When they pursue their goals, they do so with intense passion and excitement. However, if they face major setbacks, that fiery enthusiasm can fade quickly, leaving them discouraged.",
          "Statistics often show that among those who suddenly give up after failure, a surprisingly large portion are Dragon-born. This extreme swing between passion and discouragement means they may not thrive in rigid, long-term office environments. Instead, they shine in roles that allow freedom, creativity, and self-expression.",
        ],
      },
      {
        header: "Strength and Determination",
        readings: [
          "Men born in the Year of the Dragon are highly competitive and driven, while Dragon women are famously strong-willed. In fact, Dragon women sometimes display leadership and capability that surpass expectations, which can intimidate some men and delay their marriages.",
          "But in modern society, Dragon women are often seen as classic examples of successful individuals—capable of building careers, supporting their families, and standing confidently in the world.",
        ],
      },
      {
        header: "A Powerful Presence",
        readings: [
          "Dragon-born people naturally carry an authoritative aura. Even if others feel overwhelmed by them, Dragons tend to demand attention wherever they go. Once they focus on someone, their enthusiasm can be relentless—but also incredibly contagious.",
          "Nothing seems to scare a Dragon away. When it comes to their future and ambitions, they often possess a powerful sense of mission. They climb icy mountains and cross blazing seas without hesitation, ultimately emerging victorious in front of everyone.",
        ],
      },
      {
        header: "Irresistible Charm",
        readings: [
          "Dragons possess a magnetic charm that is hard to resist. Their charisma isn't subtle—it can completely capture attention and break through emotional defenses.",
          "Dragon women in particular have striking attraction. Even if they are not conventionally beautiful, their presence, confidence, and way of speaking naturally draw the spotlight wherever they appear.",
        ],
      },
      {
        header: "Energy That Never Stops",
        readings: [
          "Dragon-born individuals seem to radiate health and endless energy. They rarely appear tired. They can leave work to attend a meeting, return to work again, show up at a dinner event, go home to take care of family, and still head out for another gathering before finally resting.",
          "Next time you meet someone who seems unbelievably energetic and always busy, try asking their zodiac sign. There's a good chance they'll grin and say, 'I'm a Dragon.'",
        ],
      },
      {
        header: "A Surprisingly Soft Heart",
        readings: [
          "If a Dragon plays an important role in your life but sometimes seems distant or inattentive, there is a surprisingly simple trick—tears.",
          "Despite their strong exterior, Dragons often have sensitive hearts. Genuine emotion can soften them quickly, because beneath their powerful image, they can be deeply sentimental.",
        ],
      },
      {
        header: "Focus and Persistence",
        readings: [
          "Dragon-born people can be stubborn, but they are also extremely focused. Once they make a decision—especially in their career—they push forward with determination and courage.",
          "This relentless drive often leads them toward significant achievements.",
        ],
      },
      {
        header: "Perfectionist Idealists",
        readings: [
          "Dragons are idealists who want everything to be perfect. Because of this, they can be very strict with both themselves and others, sometimes to the point of being overly critical.",
          "Their temper can also be fiery, which may give them the reputation of being a bit tyrannical at times.",
        ],
      },
      {
        header: "Sharp Minds",
        readings: [
          "Dragon-born individuals are often exceptionally talented. Whether in the arts, sciences, business, or spiritual studies, they tend to grasp complex ideas faster than others.",
          "Of course, this brilliance has two sides—if they ever chose the wrong path, they could just as easily become criminal masterminds.",
        ],
      },
      {
        header: "Life Fortune",
        readings: [
          "Those born in the Year of the Dragon often start life with strong fortune, as if illuminated by the rising sun. After the age of thirty-five, their luck may slow down for a while.",
          "However, this pause is not a setback—it is usually a period of gathering strength. If they break through this stage, their momentum often returns even stronger, pushing them toward greater success.",
          "But if they lose confidence during this time and stop striving, they may end up with a 'dragon head, snake tail' outcome—starting brilliantly but finishing without achievement.",
        ],
      },
      {
        header: "Love and Relationships",
        readings: [
          "In matters of love, Dragon-born individuals can be surprisingly vulnerable. Even when they experience a beautiful romance, they should try to observe the relationship calmly and objectively before committing their whole future to it.",
          "Both men and women born in the Year of the Dragon often lean toward marrying later in life.",
        ],
      },
    ],
  },
  [Zodiac.SNAKE]: {
    title: "The Snake: Mysterious, High-Key Magnetic, and Deeply Driven",
    sections: [
      {
        header: "The Cool Exterior",
        readings: [
          "Whether guy or girl, Snakes are heavy hitters and the ultimate idealists. They feel deep gratitude and can get totally obsessed with someone, but they aren't the type to rush the chase. They’ve got a massive possessive streak—if they can’t fully read you, they get hit with a wave of anxiety. The key for them is chilling out on the curiosity and keeping those emotions steady.",
          "On the surface, they’re calm and detached, but inside? It’s pure fire. They play it safe with new people, but once you’re in the inner circle, they’re incredibly caring. They move through life with a solid plan, hitting goals step-by-step. If they want something—or someone—they’ll go get it. They’re experts at spotting openings and jumping in first.",
        ],
      },
      {
        header: "The Deep Dive",
        readings: [
          "Snakes are obsessed with the 'why.' They won’t believe a word until they’ve done their own deep dive. That curiosity is a double-edged sword, though—they sometimes get a bit too much joy out of knowing everyone’s business. While they aren't out here starting drama or spreading rumors, that nosy streak can rub people the wrong way. They're better off channeling that energy into leveling up their knowledge.",
          "They seem mellow, but they have a will of iron. People often think Snakes are easy-going with their cash, but if you look closer, they have a weirdly effortless way of making money find its way into their pockets. It’s part of that natural 'Snake charm'—the bag just comes to them.",
        ],
      },
      {
        header: "The Inner Struggle",
        readings: [
          "Let’s be real: laziness is the Snake's biggest rival. They have massive ambitions, but they often have to fight a daily mental battle just to get moving. For a Snake to truly win, they have to stop dreaming and start taking those real-world steps every single day.",
          "In relationships, they can be a bit 'extra.' They like to surround their partner with intensity until they’ve totally won them over with their charm and magic. They’re all about that deep, hypnotic connection.",
        ],
      },
      {
        header: "The Lifestyle",
        readings: [
          "Snakes have expensive taste. They’re famous for dropping serious cash on luxury items without blinking, yet they’ll weirdly try to save money on basic daily necessities. It’s all about the high-end life for them.",
          "No matter the gender, someone born in the Year of the Snake is going to be well-dressed and sharp. They put a lot of effort into their look, which makes them total magnets for the opposite sex. Just watch out—sometimes that focus on style can give off a bit of a vain vibe.",
        ],
      },
    ],
  },
  [Zodiac.HORSE]: {
    title: "The Horse: Free-Spirited, High-Energy, and Bold",
    sections: [
      {
        header: "The Competitive Edge",
        readings: [
          "People born in the Year of the Horse are always looking to stay one step ahead. They have that 'can’t lose' attitude and are experts at hyping themselves up to grind. However, they do have a few quirks—consistency isn't always their strong suit, keeping secrets can be a struggle, and they tend to switch up their romantic interests pretty quickly.",
          "To really level up, a Horse needs to master patience and follow through on every project they start. Building a solid skill set early on is key to keeping that career momentum going. They are naturally optimistic and great talkers, making friends effortlessly. Just a heads-up: their blunt honesty can sometimes hurt feelings without them even realizing it, so watching their words is a move.",
        ],
      },
      {
        header: "The Bag & Lifestyle",
        readings: [
          "When it comes to money, Horses are great at making it, but they love the high life. They have a taste for luxury and keeping up appearances, which means the cash often flows out as fast as it comes in. Saving isn't always the vibe, but they definitely know how to live well.",
          "The Horse is often that 'difficult' kid who grows up through some growing pains, only to turn into an absolute powerhouse by their mid-30s. They hate being ignored and need an environment where they can fully express their unique style and personality.",
        ],
      },
      {
        header: "Independence & Freedom",
        readings: [
          "The dream for a Horse is zero restrictions. They’re often the first to leave the nest, chasing that independent city life where no one can breathe down their neck. While some think they should settle down early to stay grounded, the rebellious Horse usually chooses the path of self-struggle and total freedom over a traditional setup.",
          "Sometimes their confidence outpaces their actual skill—they’re the type to say, 'Let's skydive next week!' without ever having touched a parachute. But the wild part? They actually have the talent to learn almost anything. Whether it’s building a house or crafting something intricate by hand, they’ve got those 'magic hands' and always look incredibly stylish while doing it.",
        ],
      },
      {
        header: "Relationships & Success",
        readings: [
          "Horses are top-tier partners and friends. They have an insane work ethic once they find their groove and move past those restless younger years. Most Horses are destined for success because they simply don't stop.",
          "They carry a good amount of pride, but they are also deeply responsible. Even if a relationship isn't the perfect fairy tale they imagined, they stay grounded in reality and fulfill their duties. They keep things 100% real while holding onto just a tiny spark of romantic idealism.",
        ],
      },
    ],
  },
  [Zodiac.GOAT]: {
    title: "Year of the Goat",
    sections: [
      {
        header: "The Warmest Zodiac Sign",
        readings: [
          "In traditional Chinese astrology, the Goat is considered the most gentle and warm-hearted of all zodiac signs. People born in this year are often known for their kindness and generosity. They tend to be sincere, friendly, and easily moved by the struggles of others.",
          "Their personalities are soft and calm, sometimes even a little shy. When life is going well, Goat-born individuals often shine as elegant artists or creative thinkers. But when they hit rough patches in life or career, they can become sensitive, emotional, and occasionally a bit pessimistic.",
        ],
      },
      {
        header: "Quiet Strength",
        readings: [
          "People born in the Year of the Goat may appear modest and reserved on the outside, but inside they often hold very firm opinions. When pressured or intimidated, they usually won’t argue loudly. Instead, they quietly hold their ground, choosing silence over confrontation.",
          "Many Goat-born individuals were lovingly spoiled by their parents during childhood. Fortune often smiles upon them, perhaps because they carry such pure and kind hearts.",
        ],
      },
      {
        header: "Generous Souls",
        readings: [
          "Goat-born people are generous not only with money but also with their time and care. If you ever find yourself struggling or in need, a friend born in the Year of the Goat is unlikely to ignore you.",
          "They seem to carry life’s basic blessings wherever they go—food, shelter, and clothing rarely become serious worries. They enjoy socializing and treat collaborators with sincerity and warmth.",
        ],
      },
      {
        header: "Love and Family Blessings",
        readings: [
          "Being born in the Year of the Goat is often associated with a happy marriage. Goat-born individuals tend to be deeply loved not only by their partners but also by extended family members.",
          "Their gentle nature naturally attracts affection and support from people around them.",
        ],
      },
      {
        header: "Winter Goats and Life Challenges",
        readings: [
          "It is sometimes said that those born in winter during the Year of the Goat may face more life challenges. In nature, winter is a difficult season for goats because food is scarce.",
          "Even so, Goat-born individuals rarely need to worry about life’s basic necessities. During difficult times, people around them often step in to offer support and care.",
        ],
      },
      {
        header: "A Lucky Path",
        readings: [
          "People born under the Goat sign often enjoy surprisingly good fortune. Many people willingly help them, sometimes offering financial support or valuable gifts from family and relatives.",
          "Influential individuals may even become their mentors or protectors. When Goat-born individuals encounter setbacks, someone usually appears to help them recover and move forward again.",
        ],
      },
      {
        header: "Gentle Strategies",
        readings: [
          "When pursuing something they care about, Goat-born individuals prefer subtle and non-forceful approaches. If they don’t want to do something, they rarely refuse directly—instead they politely delay or decline with patience and calm explanations.",
          "They are also very good at calming tense situations and smoothing conflicts between others.",
        ],
      },
      {
        header: "A Roundabout Personality",
        readings: [
          "Sometimes their indirect way of communicating can frustrate others. Goat-born individuals often express themselves slowly and carefully, revealing their thoughts little by little.",
          "To communicate well with them, patience is key. Show understanding, listen attentively, and give them space to express themselves comfortably.",
        ],
      },
      {
        header: "Needing the Right Environment",
        readings: [
          "Goat-born individuals often perform best when working alongside strong and decisive people who can guide and organize them. With the right structure and encouragement, their talents can shine much more brightly.",
          "Firm leadership and disciplined environments can actually help them reach their full potential.",
        ],
      },
      {
        header: "Love for Comfort and Family",
        readings: [
          "Goat-born people tend to stay close to their personal comfort zone. Family, favorite foods, and familiar surroundings are very important to them.",
          "They also cherish special occasions. Birthdays and holidays are meaningful moments they love to celebrate with style and enthusiasm.",
        ],
      },
      {
        header: "Sensitive and Thoughtful Minds",
        readings: [
          "Goat-born individuals can be emotional and reflective. Sometimes they see the darker side of situations and worry more than others might.",
          "Because of this, they appreciate supportive friends who bring positive energy and encouragement into their lives.",
        ],
      },
      {
        header: "A Gentle Weakness",
        readings: [
          "One of their common weaknesses is hesitation. They sometimes struggle to make quick decisions and may spend money in ways that aren’t always practical.",
          "Even so, their sincerity and kind spirit often win people over.",
        ],
      },
      {
        header: "Graceful Style",
        readings: [
          "Young women born in the Year of the Goat often have a love for fashion and elegant details. They may spend time carefully preparing their appearance, choosing clothing with decorative touches and accessories.",
          "Their manner is graceful and refined, often creating a calm and beautiful atmosphere around them.",
        ],
      },
      {
        header: "Elegant Living",
        readings: [
          "Many Goat-born women value cleanliness and personal presentation. Their homes and daily routines often reflect a strong sense of order, beauty, and care.",
          "They enjoy surrounding themselves with pleasant details—fresh flowers, tasteful decorations, and stylish clothing.",
        ],
      },
      {
        header: "Loyal in Love",
        readings: [
          "When a Goat-born woman falls in love, she expresses her feelings openly and sincerely. She enjoys spending time with the person she trusts most and values emotional closeness deeply.",
          "Her partner often becomes someone she fully believes in and relies upon.",
        ],
      },
      {
        header: "Quiet Cleverness",
        readings: [
          "People born in the Year of the Goat often use subtle intelligence to compensate for their weaknesses. They are surprisingly skilled at using gentle persuasion to achieve what they want.",
          "Their calm attitude and compassionate tone can slowly break down even the strongest emotional defenses, making them more influential than people might initially realize.",
        ],
      },
    ],
  },
  [Zodiac.MONKEY]: {
    title: "The Monkey: Driven, Charismatic, and Living Life to the Fullest",
    sections: [
      {
        header: "The Intellectual Drive",
        readings: [
          "People born in the Year of the Monkey have a serious drive to succeed. From a young age, they tend to be lifelong learners, pouring their intelligence and energy into their studies. They aren't fans of falling behind and always aim for the top, though their quick minds sometimes move faster than the details. With a bit of focus, they have the potential to achieve greatness.",
          "When it comes to the professional world, it is all about the passion. If they aren't feeling a task, they might just cruise through it. But once a project sparks their interest? They are all in. They'll push through any obstacle and stay focused until they reach that win.",
        ],
      },
      {
        header: "Family and Social Vibes",
        readings: [
          "Family harmony is a top priority. They are naturally devoted to their parents and put everything into raising their children, often being quite indulgent parents. In a marriage, they value deep, lifelong connections and mutual affection, though they do appreciate it when their partner takes their ideas to heart.",
          "As friends, they are the ultimate hosts—straightforward, sincere, and always treating people as equals. They have a natural instinct to help others and stand up for what is right. While they are great with peers, navigating traditional workplace hierarchies can sometimes be their biggest challenge.",
        ],
      },
      {
        header: "Style and Substance",
        readings: [
          "The Monkey man is sharp, capable, and carries himself with a certain effortless charm. He is often so focused on his career and goals that he doesn't worry about being perfectly polished, yet his ambition naturally draws people in. He prefers to build his own success rather than asking for favors. He is great at creating wealth, though he can be a big spender, often benefiting from a partner who helps keep the lifestyle balanced.",
          "The Monkey woman is the perfect blend of intelligence and grace. She has an effortless, natural style and a magnetic personality. Gifted in the arts and highly articulate, she is someone who knows her worth. She has a strong sense of self-respect and expects to be treated with dignity. When respected, she is the most incredible and supportive partner to have by your side.",
        ],
      },
      {
        header: "The Free-Spirited Life",
        readings: [
          "Monkeys live life with a sense of freedom and energy. They are curious about the world, love a good adventure, and are always looking for the next big discovery. They are optimistic, full of wit, and prefer a life without too many restrictions. Their open-hearted nature and resilience mean that even when life gets a bit tricky, they usually find their way to a happy, healthy, and fulfilling ending.",
        ],
      },
    ],
  },
  [Zodiac.ROOSTER]: {
    title: "The Rooster: Sharp, Stylish, and Always One Step Ahead",
    sections: [
      {
        header: "Social Intelligence",
        readings: [
          "Roosters are total experts at reading the room. They’ve got a sharp intuition and can sniff out what people are thinking from a mile away. No matter what life throws at them, they’ve got a backup plan ready to go in seconds. They are social chameleons who can vibe with anyone, making them super approachable and friendly—though, in the wrong hands, that same sharpness can turn into a bit of a cunning streak.",
          "They are bright and reliable, which usually earns them a lot of points with the higher-ups. Their career path looks solid, but they have a tendency to set some wild, borderline impossible goals. When they shoot too close to the sun, they might face a reality check, but their ambition is undeniable.",
        ],
      },
      {
        header: "The Aesthetic & Vibe",
        readings: [
          "Whether they are at school or in the office, a Rooster keeps their space immaculate. Everything is organized and on-point. They do have a flair for the dramatic, though; they love to talk big, drop names, and maybe exaggerate a story or two to keep things interesting. To them, looking good isn't just a hobby—it's a lifestyle. They truly believe that a killer first impression is everything.",
          "They have a natural eye for color and style, especially the women. Their fashion sense is top-tier, and they have this intuitive knack for mixing and matching outfits that leave everyone else impressed.",
        ],
      },
      {
        header: "The Creative Adventurer",
        readings: [
          "Roosters live for the thrill—think traveling, exploring, and taking risks. They aren't big fans of rigid authority and would much rather spend their energy helping others (sometimes even a bit too much). They’re the life of the party, always ready with a joke or a witty comeback.",
          "They are low-key creative geniuses. Even though they have insane talent for music, art, or writing, they often keep these as side hustles or hobbies rather than full-time gigs. They have a bit of a 'fortune teller' vibe too; they can spot trends before they happen and always have a carefully thought-out plan for the future.",
        ],
      },
      {
        header: "The Fast Lane",
        readings: [
          "A Rooster’s mind moves at 100 mph. They are incredibly quick-witted, but their main struggle is their impatience. If they don't slow down and focus, they risk rushing through things and ending up with nothing to show for it. However, when they channel that energy correctly, their ability to execute complex ideas is unmatched.",
        ],
      },
    ],
  },
  [Zodiac.DOG]: {
    title: "The Dog: Loyal, Low-Key, and Fiercely Protective",
    sections: [
      {
        header: "The Inner Circle",
        readings: [
          "People born in the Year of the Dog are the definition of 'quality over quantity.' They’re pretty conservative and cautious, so it takes a minute to get into their inner circle. But once you’re in? You’re in for life. They bring that same ride-or-die loyalty to their friends, partners, and even their bosses. They don't just build connections; they build foundations.",
          "They have a massive sense of justice and will go to the ends of the earth for the people who matter most. The catch? They aren't always the best at putting their feelings into words. Because they struggle to express what’s on their mind, they can sometimes come off as a bit stubborn or stuck in their ways.",
        ],
      },
      {
        header: "The Skeptical Visionary",
        readings: [
          "Dogs spend a fair amount of time stuck in their own heads, overthinking things. They sometimes feel like the world is a bit chaotic or out to get them, which makes them feel like they personally need to step in and fix everything. It’s a heavy weight to carry, but it comes from a place of wanting things to be right.",
        ],
      },
      {
        header: "The Heart of Gold",
        readings: [
          "With a natural instinct to serve, Dogs thrive in roles where they can help others. They aren't out here chasing clout or shady deals; they just want a peaceful life and a happy home to escape the noise of the world. They’ll often drop everything to help a friend, totally forgetting to look out for themselves. This makes it a total shock to their system if they ever get played by someone less sincere.",
        ],
      },
      {
        header: "The Perfectionist Streak",
        readings: [
          "Deep down, Dogs are pure-hearted, but they can be pretty sharp critics. They have a tendency to over-analyze and pick things apart instead of looking at the big picture. Because they sometimes struggle with self-confidence, they might get defensive or point the finger when things go south. At the end of the day, they just want to feel secure and understood.",
        ],
      },
    ],
  },
  [Zodiac.PIG]: {
    title: "The Pig: Cool, Classy, and Low-Key Powerful",
    sections: [
      {
        header: "The Vibe Check",
        readings: [
          "Generally speaking, those born in the Year of the Pig have a seriously chill head on their shoulders. No matter how messy things get, they stay calm and handle business with total precision. Socially, they’re warm and welcoming, which is why they’ve always got a loyal squad ready to back them up when life gets tough. Plus, they’re the type to roll up their sleeves and get things done themselves—if they start a project, they’re seeing it through to the finish line.",
        ],
      },
      {
        header: "The High Life",
        readings: [
          "Pigs are a mix of strength and warmth, and they usually know how to secure the bag. They have a massive appreciation for the finer things in life and aren't afraid to indulge in a little luxury. You’ll see their high-end taste reflected in everything they do; they just know how to live comfortably.",
        ],
      },
      {
        header: "The Hustle & Heart",
        readings: [
          "If a Pig hit some bumps in the road during their younger years, it only fueled their drive to build a secure, stable future. They’re low-key intellectuals who love soaking up culture and knowledge, even if they aren't the loudest people in the room. They have a strong will and know how to look out for their own interests in a deal, though deep down, they find it hard to say 'no' to people they care about.",
        ],
      },
      {
        header: "Moods & Connections",
        readings: [
          "Their one real kryptonite? A short fuse. They can go from 'zen master' to 'total storm' in a heartbeat. Pro tip: if a Pig is mad, good food is the only way back to their heart.",
          "They are naturally optimistic and kind-hearted, sometimes to a fault. They tend to trust people a bit too easily, which can lead to them getting played. When they lock onto a goal, they give it 100% energy. And while they’re always down to help a friend, they hate asking for favors themselves. If you aren't being real with them, don't expect to stay in their life for long.",
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
export function getZodiacCompatibility(
  zodiac1: Zodiac,
  zodiac2: Zodiac,
): "best" | "good" | "neutral" | "challenging" {
  if (zodiac1 === zodiac2) return "good";

  // Same element is generally good
  if (ZODIAC_CONFIG[zodiac1].element === ZODIAC_CONFIG[zodiac2].element)
    return "good";

  // Yin-Yang balance is good
  if (ZODIAC_CONFIG[zodiac1].yinYang !== ZODIAC_CONFIG[zodiac2].yinYang)
    return "good";

  return "neutral";
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

// Lunar New Year data (1900-2030)
// Encoded as month * 100 + day for each year
const LUNAR_DATA: number[] = [
  131, 219, 208, 129, 216, 204, 125, 213, 202, 122, // 1900-1909
  210, 130, 218, 206, 126, 214, 203, 123, 211, 201, // 1910-1919
  220, 208, 128, 216, 205, 124, 213, 202, 123, 210, // 1920-1929
  130, 217, 206, 126, 214, 204, 124, 211, 131, 219, // 1930-1939
  208, 127, 215, 205, 125, 213, 202, 122, 210, 129, // 1940-1949
  217, 206, 127, 214, 203, 124, 212, 131, 218, 208, // 1950-1959
  128, 215, 205, 125, 213, 202, 121, 209, 130, 217, // 1960-1969
  206, 127, 215, 203, 123, 211, 131, 218, 207, 128, // 1970-1979
  216, 205, 125, 213, 202, 220, 209, 129, 217, 206, // 1980-1989
  127, 215, 204, 123, 210, 131, 219, 207, 128, 216, // 1990-1999
  205, 124, 212, 201, 122, 209, 129, 218, 207, 126, // 2000-2009
  214, 203, 123, 210, 131, 219, 208, 128, 216, 205, // 2010-2019
  125, 212, 201, 122, 210, 129, 217, 206, 126, 213, // 2020-2029
  203, // 2030
];

/**
 * Get Lunar New Year date for a specific year
 * Returns the date as a string in format "YYYY-MM-DD"
 */
export function getLunarNewYearDate(year: number): string | null {
  if (year < 1900 || year > 2030) return null;
  const encoded = LUNAR_DATA[year - 1900];
  const month = Math.floor(encoded / 100);
  const day = encoded % 100;
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

/**
 * Get zodiac by birth date (accounting for Lunar New Year)
 * Uses the lunar calendar to determine the correct zodiac
 */
export function getZodiacByBirthDate(dateString: string): Zodiac | null {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  
  const year = date.getFullYear();
  const lunarNewYearStr = getLunarNewYearDate(year);
  
  if (!lunarNewYearStr) {
    // Fallback to simple year calculation for years outside 1900-2030
    const zodiacIndex = (year - 1924) % 12;
    return ZODIAC_ORDER[zodiacIndex < 0 ? zodiacIndex + 12 : zodiacIndex];
  }
  
  const lunarNewYear = new Date(lunarNewYearStr);
  // If birth date is before Lunar New Year, use previous year
  const effectiveYear = date < lunarNewYear ? year - 1 : year;
  
  const zodiacIndex = (effectiveYear - 1924) % 12;
  return ZODIAC_ORDER[zodiacIndex < 0 ? zodiacIndex + 12 : zodiacIndex];
}

/**
 * Get all birth years for a specific zodiac (accounting for Lunar New Year)
 * Returns an array of objects with year and lunar new year date
 */
export function getBirthYearsForZodiac(zodiac: Zodiac): Array<{ year: number; lunarNewYear: string }> {
  const years: Array<{ year: number; lunarNewYear: string }> = [];
  const zodiacIndex = ZODIAC_ORDER.indexOf(zodiac);
  
  // Calculate base years (1900-2030 range)
  for (let year = 1900; year <= 2030; year++) {
    const lunarNewYearStr = getLunarNewYearDate(year);
    if (!lunarNewYearStr) continue;
    
    // Check what zodiac this year belongs to
    // A year is associated with a zodiac from its Lunar New Year until the next one
    const yearZodiacIndex = (year - 1924) % 12;
    const adjustedIndex = yearZodiacIndex < 0 ? yearZodiacIndex + 12 : yearZodiacIndex;
    
    if (adjustedIndex === zodiacIndex) {
      years.push({ year, lunarNewYear: lunarNewYearStr });
    }
  }
  
  return years;
}

/**
 * Get birth year range text for a zodiac
 * Returns a formatted string like "2024 (Feb 10, 2024 - Jan 28, 2025)"
 */
export function getZodiacYearRange(year: number): string {
  const lunarNewYearStr = getLunarNewYearDate(year);
  const nextYearLunarNewYearStr = getLunarNewYearDate(year + 1);
  
  if (!lunarNewYearStr || !nextYearLunarNewYearStr) {
    return year.toString();
  }
  
  const startDate = new Date(lunarNewYearStr);
  const endDate = new Date(nextYearLunarNewYearStr);
  endDate.setDate(endDate.getDate() - 1);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return `${year} (${formatDate(startDate)} - ${formatDate(endDate)})`;
}
