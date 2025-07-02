import * as tf from "@tensorflow/tfjs";

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

class MoodAnalyzer {
  private isInitialized = false;
  private model: tf.LayersModel | null = null;
  private tokenizer: { [key: string]: number } = {};
  private maxSequenceLength = 32; // Reduced from 64
  private vocabularySize = 0;

  // Mood categories remain the same
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

  private moodLabels = Object.keys(this.moodCategories);

  // Optimized keyword patterns with weights for better accuracy
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
      ],
      weight: 0.75,
    },
  };

  // Minimal high-quality training data for faster training
  private coreTrainingData = [
    // High confidence examples only
    { text: "I'm having a great day today", mood: "happy" },
    { text: "This makes me so sad", mood: "sad" },
    { text: "I'm so frustrated right now", mood: "angry" },
    { text: "I'm really worried about tomorrow", mood: "anxious" },
    { text: "I can't wait for this", mood: "excited" },
    { text: "I feel so peaceful right now", mood: "calm" },
    { text: "It's just another day", mood: "neutral" },
    { text: "I'm so thankful for this", mood: "grateful" },
    { text: "This is so annoying", mood: "frustrated" },
    { text: "I'm exhausted", mood: "tired" },

    // Add a few more for each category
    { text: "Life is amazing", mood: "happy" },
    { text: "I feel empty inside", mood: "sad" },
    { text: "This makes my blood boil", mood: "angry" },
    { text: "My heart is racing", mood: "anxious" },
    { text: "I'm bouncing off the walls", mood: "excited" },
    { text: "Everything is serene", mood: "calm" },
    { text: "Nothing special happening", mood: "neutral" },
    { text: "I feel blessed", mood: "grateful" },
    { text: "I'm at my wit's end", mood: "frustrated" },
    { text: "I need some rest", mood: "tired" },
  ];

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log("🚀 Initializing Fast Mood Analyzer...");
      const startTime = performance.now();

      await tf.ready();

      // Try to use primarily rule-based analysis with lightweight ML backup
      this.buildOptimizedTokenizer();
      await this.createLightweightModel();

      this.isInitialized = true;
      const loadTime = Math.round(performance.now() - startTime);
      console.log(`⚡ Fast Mood Analyzer ready in ${loadTime}ms!`);
    } catch (error) {
      console.error("❌ Failed to initialize mood analyzer:", error);
      // Fallback to rule-based only
      this.isInitialized = true;
    }
  }

  private buildOptimizedTokenizer(): void {
    // Pre-defined compact vocabulary for faster tokenization
    const coreVocabulary = new Set<string>();

    // Add all keywords
    Object.values(this.keywordPatterns).forEach(({ keywords }) => {
      keywords.forEach((keyword) => {
        keyword
          .split(" ")
          .forEach((word) => coreVocabulary.add(word.toLowerCase()));
      });
    });

    // Add training data words
    this.coreTrainingData.forEach((item) => {
      const words = item.text
        .toLowerCase()
        .replace(/[^\w\s']/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 1); // Only words longer than 1 char

      words.forEach((word) => coreVocabulary.add(word));
    });

    // Create compact tokenizer
    this.tokenizer = { "<PAD>": 0, "<UNK>": 1 };
    let index = 2;

    Array.from(coreVocabulary)
      .sort()
      .forEach((word) => {
        this.tokenizer[word] = index++;
      });

    this.vocabularySize = Object.keys(this.tokenizer).length;
    console.log(`📚 Vocabulary size: ${this.vocabularySize}`);
  }

  private tokenizeText(text: string): number[] {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s']/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    let tokens = words.map(
      (word) => this.tokenizer[word] || this.tokenizer["<UNK>"]
    );

    // Pad or truncate to maxSequenceLength
    if (tokens.length < this.maxSequenceLength) {
      tokens = tokens.concat(
        Array(this.maxSequenceLength - tokens.length).fill(
          this.tokenizer["<PAD>"]
        )
      );
    } else {
      tokens = tokens.slice(0, this.maxSequenceLength);
    }

    return tokens;
  }

  private async createLightweightModel(): Promise<void> {
    const numClasses = this.moodLabels.length;
    const embeddingDim = 32; // Reduced from 64

    // Much simpler, faster model architecture
    this.model = tf.sequential({
      layers: [
        tf.layers.embedding({
          inputDim: this.vocabularySize,
          outputDim: embeddingDim,
          inputLength: this.maxSequenceLength,
          maskZero: true,
        }),
        tf.layers.globalAveragePooling1d(), // Much faster than LSTM
        tf.layers.dropout({ rate: 0.3 }),
        tf.layers.dense({
          units: 64,
          activation: "relu",
        }),
        tf.layers.dropout({ rate: 0.4 }),
        tf.layers.dense({
          units: numClasses,
          activation: "softmax",
        }),
      ],
    });

    // Compile with faster optimizer
    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });

    // Prepare minimal training data
    const trainTexts = this.coreTrainingData.map((item) =>
      this.tokenizeText(item.text)
    );
    const trainLabels = this.coreTrainingData.map((item) => {
      const label = Array(numClasses).fill(0);
      const moodIndex =
        this.moodCategories[item.mood as keyof typeof this.moodCategories]
          .index;
      label[moodIndex] = 1;
      return label;
    });

    const xs = tf.tensor2d(trainTexts);
    const ys = tf.tensor2d(trainLabels);

    // Fast training with fewer epochs
    await this.model.fit(xs, ys, {
      epochs: 30, // Reduced from 150
      batchSize: 8,
      shuffle: true,
      verbose: 0,
    });

    xs.dispose();
    ys.dispose();
  }

  // Enhanced rule-based analysis - this does most of the heavy lifting
  private analyzeWithRules(
    text: string
  ): { mood: string; confidence: number } | null {
    const lowerText = text.toLowerCase();
    let bestMatch = { mood: "", confidence: 0, matchStrength: 0 };

    // Check each mood category
    for (const [mood, { keywords, weight }] of Object.entries(
      this.keywordPatterns
    )) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          // Calculate match strength based on keyword specificity and context
          const keywordLength = keyword.length;
          const contextBonus = this.getContextBonus(lowerText, keyword);
          const matchStrength = (keywordLength + contextBonus) * weight;

          if (matchStrength > bestMatch.matchStrength) {
            bestMatch = {
              mood,
              confidence: Math.min(95, Math.round(75 + matchStrength * 5)),
              matchStrength,
            };
          }
        }
      }
    }

    return bestMatch.mood ? bestMatch : null;
  }

  private getContextBonus(text: string, keyword: string): number {
    // Give bonus for strong contextual indicators
    const strongIndicators = [
      "so " + keyword,
      "really " + keyword,
      "very " + keyword,
      "extremely " + keyword,
      keyword + " as hell",
      "fucking " + keyword,
    ];

    for (const indicator of strongIndicators) {
      if (text.includes(indicator)) {
        return 3;
      }
    }

    return 0;
  }

  async analyzeMood(text: string): Promise<MoodResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Primary: Rule-based analysis (fast and accurate)
      const ruleResult = this.analyzeWithRules(text);
      if (ruleResult && ruleResult.confidence > 75) {
        const category =
          this.moodCategories[
            ruleResult.mood as keyof typeof this.moodCategories
          ];
        return {
          mood:
            ruleResult.mood.charAt(0).toUpperCase() + ruleResult.mood.slice(1),
          confidence: ruleResult.confidence,
          color: category.color,
          emoji: category.emoji,
          reasoning: `Keyword analysis (${ruleResult.confidence}% confidence)`,
        };
      }

      // Fallback: Neural network (if model loaded successfully)
      if (this.model) {
        const tokens = this.tokenizeText(text);
        const inputTensor = tf.tensor2d([tokens], [1, this.maxSequenceLength]);

        const prediction = this.model.predict(inputTensor) as tf.Tensor;
        const probabilities = await prediction.data();

        const predictions = Array.from(probabilities).map((prob, index) => ({
          mood: this.moodLabels[index],
          probability: prob,
        }));

        predictions.sort((a, b) => b.probability - a.probability);
        const topPrediction = predictions[0];
        const confidence = Math.round(topPrediction.probability * 100);

        inputTensor.dispose();
        prediction.dispose();

        const category =
          this.moodCategories[
            topPrediction.mood as keyof typeof this.moodCategories
          ];

        return {
          mood:
            topPrediction.mood.charAt(0).toUpperCase() +
            topPrediction.mood.slice(1),
          confidence: Math.max(65, confidence),
          color: category.color,
          emoji: category.emoji,
          reasoning: `Neural network analysis (${confidence}% confidence)`,
        };
      }

      // Final fallback: Use rule result even if low confidence, or default to neutral
      if (ruleResult) {
        const category =
          this.moodCategories[
            ruleResult.mood as keyof typeof this.moodCategories
          ];
        return {
          mood:
            ruleResult.mood.charAt(0).toUpperCase() + ruleResult.mood.slice(1),
          confidence: ruleResult.confidence,
          color: category.color,
          emoji: category.emoji,
          reasoning: `Keyword analysis (${ruleResult.confidence}% confidence)`,
        };
      }

      // Default neutral
      return {
        mood: "Neutral",
        confidence: 70,
        color: this.moodCategories.neutral.color,
        emoji: this.moodCategories.neutral.emoji,
        reasoning: "No clear mood indicators found",
      };
    } catch (error) {
      console.error("❌ Error in mood analysis:", error);
      return {
        mood: "Neutral",
        confidence: 60,
        color: this.moodCategories.neutral.color,
        emoji: this.moodCategories.neutral.emoji,
        reasoning: "Analysis error, defaulting to neutral",
      };
    }
  }

  // Fast batch processing
  async batchAnalyze(
    entries: MoodData[],
    onProgress?: (progress: number) => void
  ): Promise<MoodData[]> {
    const analyzedEntries: MoodData[] = [];

    // Process in larger batches since rule-based analysis is fast
    const batchSize = 20;
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);

      // Process batch concurrently for rule-based analysis
      const batchPromises = batch.map(async (entry) => {
        if (entry.mood && entry.confidence) {
          return entry;
        }

        const moodResult = await this.analyzeMood(entry.text);
        return {
          ...entry,
          mood: moodResult.mood,
          confidence: moodResult.confidence,
          color: moodResult.color,
          emoji: moodResult.emoji,
        };
      });

      const batchResults = await Promise.all(batchPromises);
      analyzedEntries.push(...batchResults);

      if (onProgress) {
        onProgress(Math.round((analyzedEntries.length / entries.length) * 100));
      }

      // Minimal delay to keep UI responsive
      if (i + batchSize < entries.length) {
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
    }

    return analyzedEntries;
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

  // Quick test without the full test suite
  async quickTest(): Promise<void> {
    const testCases = [
      { text: "fuck everyone at this point", expected: "angry" },
      { text: "I'm having a great day", expected: "happy" },
      { text: "I'm exhausted", expected: "tired" },
    ];

    console.log("🧪 Quick test...");
    for (const testCase of testCases) {
      const result = await this.analyzeMood(testCase.text);
      console.log(
        `"${testCase.text}" → ${result.mood} (${result.confidence}%)`
      );
    }
  }
}

// Export singleton instance
export const moodAnalyzer = new MoodAnalyzer();
export default MoodAnalyzer;
