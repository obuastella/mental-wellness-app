export interface MoodResult {
  mood: string;
  confidence: number;
  color: string;
  emoji: string;
  reasoning?: string;
}

export interface MoodData {
  id: string;
  text: string;
  date: string;
  time: string;
  mood?: string;
  confidence?: number;
  color?: string;
  emoji?: string;
}

export class MoodAnalyzer {
  private isInitialized = false;

  // Mood categories
  private moodCategories = {
    happy: { color: "#10B981", emoji: "😊", index: 0 },
    sad: { color: "#6366F1", emoji: "😢", index: 1 },
    angry: { color: "#EF4444", emoji: "😠", index: 2 },
    anxious: { color: "#F59E0B", emoji: "😰", index: 3 },
    excited: { color: "#EC4899", emoji: "🤗", index: 4 },
    calm: { color: "#3B82F6", emoji: "😌", index: 5 },
    neutral: { color: "#6B7280", emoji: "😐", index: 6 },
    grateful: { color: "#059669", emoji: "🙏", index: 7 },
    frustrated: { color: "#DC2626", emoji: "😤", index: 8 },
    tired: { color: "#8B5CF6", emoji: "😴", index: 9 },
  };

  // Enhanced keyword patterns with weights for better accuracy
  private keywordPatterns = {
    angry: {
      keywords: [
        "fuck",
        "shit",
        "damn",
        "pissed",
        "mad",
        "furious",
        "rage",
        "hate",
        "angry",
        "livid",
        "outraged",
        "infuriating",
        "bullshit",
        "asshole",
        "screw this",
        "what the hell",
        "fed up",
      ],
      weight: 0.95,
    },
    frustrated: {
      keywords: [
        "annoying",
        "irritating",
        "hassle",
        "ridiculous",
        "sick of",
        "fed up",
        "done with",
        "nuts",
        "whatever",
        "ugh",
        "seriously",
        "can't even",
      ],
      weight: 0.85,
    },
    tired: {
      keywords: [
        "tired",
        "exhausted",
        "drained",
        "worn out",
        "burnt out",
        "weary",
        "fatigued",
        "sleepy",
        "need sleep",
        "can't stay awake",
        "beat",
      ],
      weight: 0.9,
    },
    sad: {
      keywords: [
        "sad",
        "depressed",
        "crying",
        "tears",
        "lonely",
        "heartbroken",
        "down",
        "blue",
        "hopeless",
        "miserable",
        "hurt",
        "pain",
      ],
      weight: 0.88,
    },
    happy: {
      keywords: [
        "happy",
        "joy",
        "great",
        "wonderful",
        "amazing",
        "fantastic",
        "perfect",
        "smile",
        "good",
        "awesome",
        "love",
        "excited",
      ],
      weight: 0.85,
    },
    excited: {
      keywords: [
        "excited",
        "thrilled",
        "pumped",
        "hyped",
        "ecstatic",
        "can't wait",
        "incredible",
        "fired up",
        "stoked",
        "amped",
        "psyched",
      ],
      weight: 0.87,
    },
    anxious: {
      keywords: [
        "worried",
        "nervous",
        "scared",
        "panic",
        "anxiety",
        "stressed",
        "overthinking",
        "on edge",
        "freaking out",
        "overwhelmed",
      ],
      weight: 0.86,
    },
    calm: {
      keywords: [
        "peaceful",
        "calm",
        "relaxed",
        "serene",
        "tranquil",
        "zen",
        "balanced",
        "centered",
        "chill",
        "at ease",
      ],
      weight: 0.83,
    },
    grateful: {
      keywords: [
        "grateful",
        "thankful",
        "blessed",
        "appreciate",
        "fortunate",
        "thank you",
        "gratitude",
        "lucky",
        "thankful for",
      ],
      weight: 0.84,
    },
    neutral: {
      keywords: [
        "okay",
        "fine",
        "normal",
        "regular",
        "ordinary",
        "average",
        "same",
        "usual",
        "whatever",
        "meh",
        "alright",
      ],
      weight: 0.75,
    },
  };

  initialize(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isInitialized) {
        resolve();
        return;
      }

      try {
        console.log("🚀 Initializing Mood Analyzer...");
        this.isInitialized = true;
        console.log("⚡ Mood Analyzer ready!");
        resolve();
      } catch (error) {
        console.error("❌ Failed to initialize mood analyzer:", error);
        this.isInitialized = true;
        resolve();
      }
    });
  }

  // Enhanced rule-based analysis
  private analyzeWithRules(text: string): { mood: string; confidence: number } {
    const lowerText = text.toLowerCase();
    let bestMatch = { mood: "neutral", confidence: 70, matchStrength: 0 };

    // Check each mood category
    for (const [mood, { keywords, weight }] of Object.entries(
      this.keywordPatterns
    )) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          // Calculate match strength based on keyword specificity and context
          const keywordLength = keyword.length;
          const contextBonus = this.getContextBonus(lowerText, keyword);
          const exactMatch = lowerText === keyword ? 5 : 0;
          const matchStrength =
            (keywordLength + contextBonus + exactMatch) * weight;

          if (matchStrength > bestMatch.matchStrength) {
            bestMatch = {
              mood,
              confidence: Math.min(95, Math.round(75 + matchStrength * 3)),
              matchStrength,
            };
          }
        }
      }
    }

    // Additional context analysis
    const sentimentBonus = this.getSentimentBonus(lowerText, bestMatch.mood);
    bestMatch.confidence = Math.min(95, bestMatch.confidence + sentimentBonus);

    return bestMatch;
  }

  private getContextBonus(text: string, keyword: string): number {
    // Give bonus for strong contextual indicators
    const strongIndicators = [
      `so ${keyword}`,
      `really ${keyword}`,
      `very ${keyword}`,
      `extremely ${keyword}`,
      `${keyword} as hell`,
      `fucking ${keyword}`,
      `super ${keyword}`,
      `totally ${keyword}`,
    ];

    for (const indicator of strongIndicators) {
      if (text.includes(indicator)) {
        return 5;
      }
    }

    // Medium strength indicators
    const mediumIndicators = [
      `pretty ${keyword}`,
      `quite ${keyword}`,
      `${keyword} right now`,
      `feeling ${keyword}`,
    ];

    for (const indicator of mediumIndicators) {
      if (text.includes(indicator)) {
        return 2;
      }
    }

    return 0;
  }

  private getSentimentBonus(text: string, mood: string): number {
    // Punctuation analysis
    const exclamationCount = (text.match(/!/g) || []).length;
    const questionCount = (text.match(/\?/g) || []).length;
    const capsCount = (text.match(/[A-Z]/g) || []).length;

    let bonus = 0;

    // Exclamation marks boost confidence for emotional states
    if (
      exclamationCount > 0 &&
      ["angry", "excited", "happy", "frustrated"].includes(mood)
    ) {
      bonus += Math.min(10, exclamationCount * 3);
    }

    // Question marks suggest uncertainty/anxiety
    if (questionCount > 0 && ["anxious", "frustrated", "sad"].includes(mood)) {
      bonus += Math.min(5, questionCount * 2);
    }

    // Excessive caps suggest strong emotion
    if (
      capsCount > text.length * 0.3 &&
      ["angry", "excited", "frustrated"].includes(mood)
    ) {
      bonus += 8;
    }

    // Text length consideration
    if (text.length > 100 && ["sad", "anxious", "frustrated"].includes(mood)) {
      bonus += 3; // Longer texts often indicate deeper emotions
    }

    return bonus;
  }

  analyzeMood(text: string): Promise<MoodResult> {
    return new Promise(async (resolve) => {
      try {
        if (!this.isInitialized) {
          await this.initialize();
        }

        if (!text || text.trim().length === 0) {
          resolve({
            mood: "Neutral",
            confidence: 60,
            color: this.moodCategories.neutral.color,
            emoji: this.moodCategories.neutral.emoji,
            reasoning: "No text provided",
          });
          return;
        }

        // Rule-based analysis
        const result = this.analyzeWithRules(text);
        const category =
          this.moodCategories[result.mood as keyof typeof this.moodCategories];

        resolve({
          mood: result.mood.charAt(0).toUpperCase() + result.mood.slice(1),
          confidence: result.confidence,
          color: category.color,
          emoji: category.emoji,
          reasoning: `Keyword analysis (${result.confidence}% confidence)`,
        });
      } catch (error) {
        console.error("❌ Error in mood analysis:", error);
        resolve({
          mood: "Neutral",
          confidence: 60,
          color: this.moodCategories.neutral.color,
          emoji: this.moodCategories.neutral.emoji,
          reasoning: "Analysis error, defaulting to neutral",
        });
      }
    });
  }

  // Fast batch processing
  batchAnalyze(
    entries: MoodData[],
    onProgress?: (progress: number) => void
  ): Promise<MoodData[]> {
    return new Promise(async (resolve) => {
      try {
        const analyzedEntries: MoodData[] = [];

        // Process in batches
        const batchSize = 10;
        for (let i = 0; i < entries.length; i += batchSize) {
          const batch = entries.slice(i, i + batchSize);

          for (const entry of batch) {
            if (entry.mood && entry.confidence) {
              analyzedEntries.push(entry);
              continue;
            }

            const moodResult = await this.analyzeMood(entry.text);
            analyzedEntries.push({
              ...entry,
              mood: moodResult.mood,
              confidence: moodResult.confidence,
              color: moodResult.color,
              emoji: moodResult.emoji,
            });
          }

          if (onProgress) {
            onProgress(
              Math.round((analyzedEntries.length / entries.length) * 100)
            );
          }

          // Small delay to keep UI responsive
          if (i + batchSize < entries.length) {
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
        }

        resolve(analyzedEntries);
      } catch (error) {
        console.error("❌ Error in batch analysis:", error);
        resolve([]);
      }
    });
  }

  getMoodStats(entries: MoodData[]) {
    if (entries.length === 0) {
      return {
        dominant: "Neutral",
        dominantColor: "#6B7280",
        dominantEmoji: "😐",
        average: 0,
        totalEntries: 0,
        moodDistribution: {},
        moodTrend: "stable",
      };
    }

    const moodCounts: { [key: string]: number } = {};
    let totalConfidence = 0;

    entries.forEach((entry) => {
      if (entry.mood) {
        const mood = entry.mood.toLowerCase();
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        totalConfidence += entry.confidence || 0;
      }
    });

    let dominantMood = "neutral";
    let maxCount = 0;
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantMood = mood;
      }
    });

    const dominantCategory =
      this.moodCategories[dominantMood as keyof typeof this.moodCategories] ||
      this.moodCategories.neutral;

    return {
      dominant: dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1),
      dominantColor: dominantCategory.color,
      dominantEmoji: dominantCategory.emoji,
      average: Math.round(totalConfidence / entries.length),
      totalEntries: entries.length,
      moodDistribution: moodCounts,
      moodTrend: this.calculateMoodTrend(entries),
    };
  }

  private calculateMoodTrend(entries: MoodData[]): string {
    if (entries.length < 3) return "stable";

    const recent = entries.slice(0, Math.min(5, entries.length));
    const positiveModds = ["happy", "excited", "grateful", "calm"];
    const recentPositive = recent.filter(
      (entry) => entry.mood && positiveModds.includes(entry.mood.toLowerCase())
    ).length;

    const positiveRatio = recentPositive / recent.length;

    if (positiveRatio > 0.6) return "improving";
    if (positiveRatio < 0.3) return "declining";
    return "stable";
  }

  quickTest(): Promise<void> {
    return new Promise(async (resolve) => {
      const testCases = [
        { text: "fuck everyone at this point", expected: "angry" },
        { text: "I'm having a great day", expected: "happy" },
        { text: "I'm exhausted", expected: "tired" },
        { text: "This is so annoying", expected: "frustrated" },
        { text: "I'm really worried", expected: "anxious" },
      ];

      console.log("🧪 Quick test...");
      for (const testCase of testCases) {
        const result = await this.analyzeMood(testCase.text);
        console.log(
          `"${testCase.text}" → ${result.mood} (${result.confidence}%)`
        );
      }
      resolve();
    });
  }
}

// Create singleton instance
const moodAnalyzer = new MoodAnalyzer();

// Multiple export formats to ensure compatibility
export default moodAnalyzer;
export { moodAnalyzer };
export const fastMoodAnalyzer = moodAnalyzer;

// For CommonJS compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = moodAnalyzer;
  module.exports.default = moodAnalyzer;
  module.exports.MoodAnalyzer = MoodAnalyzer;
  module.exports.moodAnalyzer = moodAnalyzer;
  module.exports.fastMoodAnalyzer = moodAnalyzer;
}
