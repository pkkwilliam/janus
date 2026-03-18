import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fortune Cookie Blog - Chinese Zodiac Insights & Spiritual Guidance",
  description: "Explore our blog for Chinese zodiac predictions, fortune telling insights, spiritual guidance, and lucky number analysis for 2026.",
  keywords: "fortune cookie blog, chinese zodiac blog, fortune telling insights, spiritual guidance blog, lucky numbers analysis",
};

const blogPosts = [
  {
    slug: "year-of-the-snake-2026",
    title: "Year of the Snake 2026: What to Expect",
    excerpt: "2026 is the Year of the Snake. Discover what this means for your fortune, career, love life, and lucky numbers.",
    date: "2026-01-15",
    category: "Zodiac Predictions",
    readTime: "5 min read",
  },
  {
    slug: "chinese-zodiac-compatibility",
    title: "Chinese Zodiac Compatibility Guide",
    excerpt: "Learn which zodiac signs are most compatible with yours. Find your perfect match based on ancient Chinese wisdom.",
    date: "2026-01-10",
    category: "Compatibility",
    readTime: "8 min read",
  },
  {
    slug: "how-to-read-birth-chart",
    title: "How to Read Your Chinese Birth Chart",
    excerpt: "A beginner's guide to understanding your Chinese birth chart and what it reveals about your destiny.",
    date: "2026-01-05",
    category: "Education",
    readTime: "10 min read",
  },
  {
    slug: "lucky-numbers-guide",
    title: "The Complete Guide to Lucky Numbers",
    excerpt: "Discover the meaning behind lucky numbers and how to use them to improve your fortune.",
    date: "2025-12-28",
    category: "Lucky Numbers",
    readTime: "6 min read",
  },
  {
    slug: "dragon-fortune-2026",
    title: "Dragon Zodiac Fortune 2026: Career & Love",
    excerpt: "Dragons, get ready for an exciting year! Read your detailed 2026 fortune prediction.",
    date: "2025-12-20",
    category: "Zodiac Predictions",
    readTime: "7 min read",
  },
  {
    slug: "daily-fortune-routine",
    title: "Building a Daily Fortune Reading Routine",
    excerpt: "Learn how to incorporate daily fortune readings into your morning routine for better decision-making.",
    date: "2025-12-15",
    category: "Lifestyle",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Fortune Cookie Blog
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Insights, predictions, and spiritual guidance for your journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 text-sm">
                  {post.category}
                </span>
                <span className="text-purple-400 text-sm">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-white">
                {post.title}
              </h2>
              <p className="text-purple-200 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-sm">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
