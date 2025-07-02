// import * as tf from "@tensorflow/tfjs";

// export interface MoodResult {
//   mood: string;
//   confidence: number;
//   color: string;
//   emoji: string;
//   reasoning?: string;
// }

// export interface MoodData {
//   id: string;
//   text: string;
//   date: string;
//   time: string;
//   mood?: string;
//   confidence?: number;
//   color?: string;
//   emoji?: string;
// }

// class MoodAnalyzer {
//   private isInitialized = false;
//   private model: tf.LayersModel | null = null;
//   private tokenizer: { [key: string]: number } = {};
//   private maxSequenceLength = 50;
//   private vocabularySize = 0;

//   // Enhanced mood categories with better balance
//   private moodCategories = {
//     happy: { color: "#10B981", emoji: "😊", index: 0 },
//     sad: { color: "#6366F1", emoji: "😢", index: 1 },
//     angry: { color: "#EF4444", emoji: "😠", index: 2 },
//     anxious: { color: "#F59E0B", emoji: "😰", index: 3 },
//     excited: { color: "#EC4899", emoji: "🤗", index: 4 },
//     calm: { color: "#3B82F6", emoji: "😌", index: 5 },
//     neutral: { color: "#6B7280", emoji: "😐", index: 6 },
//     grateful: { color: "#059669", emoji: "🙏", index: 7 },
//   };

//   private moodLabels = Object.keys(this.moodCategories);

//   // Expanded and balanced training data
//   private trainingData = [
//     // Happy - 20 examples
//     { text: "I'm having a great day today", mood: "happy" },
//     { text: "This is wonderful news", mood: "happy" },
//     { text: "I feel so good right now", mood: "happy" },
//     { text: "What a beautiful morning", mood: "happy" },
//     { text: "I'm really enjoying myself", mood: "happy" },
//     { text: "Life is amazing", mood: "happy" },
//     { text: "I'm so pleased with the results", mood: "happy" },
//     { text: "This makes me smile", mood: "happy" },
//     { text: "I feel fantastic", mood: "happy" },
//     { text: "Everything is going perfectly", mood: "happy" },
//     { text: "I'm overjoyed", mood: "happy" },
//     { text: "This is the best day ever", mood: "happy" },
//     { text: "I'm feeling incredible", mood: "happy" },
//     { text: "So much joy in my heart", mood: "happy" },
//     { text: "I'm radiating happiness", mood: "happy" },
//     { text: "Everything feels bright", mood: "happy" },
//     { text: "I'm filled with positivity", mood: "happy" },
//     { text: "Such a wonderful experience", mood: "happy" },
//     { text: "I'm beaming with joy", mood: "happy" },
//     { text: "Today is absolutely perfect", mood: "happy" },

//     // Sad - 20 examples
//     { text: "I'm feeling really down today", mood: "sad" },
//     { text: "This makes me so sad", mood: "sad" },
//     { text: "I can't stop crying", mood: "sad" },
//     { text: "I feel so lonely", mood: "sad" },
//     { text: "Everything seems hopeless", mood: "sad" },
//     { text: "I'm heartbroken", mood: "sad" },
//     { text: "I feel empty inside", mood: "sad" },
//     { text: "Nothing seems to matter", mood: "sad" },
//     { text: "I'm really depressed", mood: "sad" },
//     { text: "Feeling blue today", mood: "sad" },
//     { text: "My heart is heavy", mood: "sad" },
//     { text: "I'm overwhelmed by sadness", mood: "sad" },
//     { text: "Everything feels dark", mood: "sad" },
//     { text: "I'm struggling today", mood: "sad" },
//     { text: "Tears won't stop falling", mood: "sad" },
//     { text: "I feel so disappointed", mood: "sad" },
//     { text: "My mood is very low", mood: "sad" },
//     { text: "I'm feeling melancholy", mood: "sad" },
//     { text: "Such a gloomy day", mood: "sad" },
//     { text: "I feel completely dejected", mood: "sad" },

//     // Angry - 15 examples (reduced to balance)
//     { text: "I'm so frustrated right now", mood: "angry" },
//     { text: "This is making me furious", mood: "angry" },
//     { text: "I can't believe this happened", mood: "angry" },
//     { text: "I'm really annoyed", mood: "angry" },
//     { text: "This is so unfair", mood: "angry" },
//     { text: "I'm fed up with this", mood: "angry" },
//     { text: "This makes my blood boil", mood: "angry" },
//     { text: "I'm really mad about this", mood: "angry" },
//     { text: "I'm absolutely livid", mood: "angry" },
//     { text: "This is infuriating", mood: "angry" },
//     { text: "I'm seething with rage", mood: "angry" },
//     { text: "I'm so pissed off", mood: "angry" },
//     { text: "This is driving me crazy", mood: "angry" },
//     { text: "I'm boiling with anger", mood: "angry" },
//     { text: "I'm outraged by this", mood: "angry" },

//     // Anxious - 15 examples
//     { text: "I'm really worried about tomorrow", mood: "anxious" },
//     { text: "I feel so nervous", mood: "anxious" },
//     { text: "I can't stop thinking about it", mood: "anxious" },
//     { text: "I'm scared something will go wrong", mood: "anxious" },
//     { text: "My heart is racing", mood: "anxious" },
//     { text: "I feel panicked", mood: "anxious" },
//     { text: "I'm having trouble sleeping", mood: "anxious" },
//     { text: "I feel on edge", mood: "anxious" },
//     { text: "I'm so stressed out", mood: "anxious" },
//     { text: "My anxiety is through the roof", mood: "anxious" },
//     { text: "I'm overthinking everything", mood: "anxious" },
//     { text: "I feel restless and worried", mood: "anxious" },
//     { text: "I'm trembling with nervousness", mood: "anxious" },
//     { text: "I have butterflies in my stomach", mood: "anxious" },
//     { text: "I'm consumed by worry", mood: "anxious" },

//     // Excited - 15 examples
//     { text: "I can't wait for this", mood: "excited" },
//     { text: "I'm so pumped up", mood: "excited" },
//     { text: "This is going to be amazing", mood: "excited" },
//     { text: "I'm thrilled about the opportunity", mood: "excited" },
//     { text: "I'm bouncing off the walls", mood: "excited" },
//     { text: "I'm so hyped", mood: "excited" },
//     { text: "This is incredible", mood: "excited" },
//     { text: "I'm buzzing with energy", mood: "excited" },
//     { text: "I'm absolutely ecstatic", mood: "excited" },
//     { text: "I'm electric with anticipation", mood: "excited" },
//     { text: "I'm over the moon", mood: "excited" },
//     { text: "I'm bursting with enthusiasm", mood: "excited" },
//     { text: "I'm so energized", mood: "excited" },
//     { text: "I'm jumping for joy", mood: "excited" },
//     { text: "I'm fired up about this", mood: "excited" },

//     // Calm - 15 examples
//     { text: "I feel so peaceful right now", mood: "calm" },
//     { text: "Everything is serene", mood: "calm" },
//     { text: "I'm completely relaxed", mood: "calm" },
//     { text: "I feel centered and balanced", mood: "calm" },
//     { text: "There's a sense of tranquility", mood: "calm" },
//     { text: "I'm at peace with everything", mood: "calm" },
//     { text: "I feel so zen", mood: "calm" },
//     { text: "Everything feels harmonious", mood: "calm" },
//     { text: "I'm in a state of serenity", mood: "calm" },
//     { text: "My mind is clear and still", mood: "calm" },
//     { text: "I feel grounded", mood: "calm" },
//     { text: "There's a gentle calmness", mood: "calm" },
//     { text: "I'm breathing deeply and peacefully", mood: "calm" },
//     { text: "I feel stable and secure", mood: "calm" },
//     { text: "Everything is quiet and peaceful", mood: "calm" },

//     // Neutral - 15 examples
//     { text: "It's just another day", mood: "neutral" },
//     { text: "Things are okay I guess", mood: "neutral" },
//     { text: "Nothing special happening", mood: "neutral" },
//     { text: "Everything is normal", mood: "neutral" },
//     { text: "It's fine", mood: "neutral" },
//     { text: "Just going through the motions", mood: "neutral" },
//     { text: "Same as usual", mood: "neutral" },
//     { text: "Nothing to report", mood: "neutral" },
//     { text: "An ordinary day", mood: "neutral" },
//     { text: "Everything is average", mood: "neutral" },
//     { text: "Just another regular day", mood: "neutral" },
//     { text: "Nothing particularly good or bad", mood: "neutral" },
//     { text: "Feeling neither here nor there", mood: "neutral" },
//     { text: "Just existing today", mood: "neutral" },
//     { text: "No strong feelings either way", mood: "neutral" },

//     // Grateful - 15 examples
//     { text: "I'm so thankful for this", mood: "grateful" },
//     { text: "I feel blessed", mood: "grateful" },
//     { text: "I really appreciate everything", mood: "grateful" },
//     { text: "I'm grateful for this opportunity", mood: "grateful" },
//     { text: "Thank you for everything", mood: "grateful" },
//     { text: "I feel so fortunate", mood: "grateful" },
//     { text: "I'm counting my blessings", mood: "grateful" },
//     { text: "I appreciate all the support", mood: "grateful" },
//     { text: "I'm deeply grateful", mood: "grateful" },
//     { text: "My heart is full of gratitude", mood: "grateful" },
//     { text: "I'm so appreciative", mood: "grateful" },
//     { text: "I feel truly blessed", mood: "grateful" },
//     { text: "I'm thankful for this moment", mood: "grateful" },
//     { text: "I appreciate all the good things", mood: "grateful" },
//     { text: "I'm filled with appreciation", mood: "grateful" },
//   ];

//   async initialize(): Promise<void> {
//     if (this.isInitialized) return;

//     try {
//       console.log("🧠 Initializing Enhanced Mood Analyzer...");

//       // Initialize TensorFlow.js
//       await tf.ready();
//       console.log("✅ TensorFlow.js ready");

//       // Build vocabulary
//       this.buildTokenizer();
//       console.log("✅ Tokenizer built with", this.vocabularySize, "words");

//       // Create and train model
//       await this.createAndTrainModel();
//       console.log("✅ Model trained successfully");

//       this.isInitialized = true;
//       console.log("🧠 Enhanced Mood Analyzer ready!");
//     } catch (error) {
//       console.error("❌ Failed to initialize mood analyzer:", error);
//       throw error;
//     }
//   }

//   private buildTokenizer(): void {
//     const vocabulary = new Set<string>();

//     // Extract words from training data
//     this.trainingData.forEach((item) => {
//       const words = item.text
//         .toLowerCase()
//         .replace(/[^\w\s]/g, " ")
//         .split(/\s+/)
//         .filter((word) => word.length > 1); // Filter out single characters

//       words.forEach((word) => vocabulary.add(word));
//     });

//     // Create tokenizer
//     this.tokenizer = { "<PAD>": 0, "<UNK>": 1 };
//     let index = 2;

//     Array.from(vocabulary)
//       .sort()
//       .forEach((word) => {
//         this.tokenizer[word] = index++;
//       });

//     this.vocabularySize = Object.keys(this.tokenizer).length;
//   }

//   private tokenizeText(text: string): number[] {
//     const words = text
//       .toLowerCase()
//       .replace(/[^\w\s]/g, " ")
//       .split(/\s+/)
//       .filter((word) => word.length > 1);

//     let tokens = words.map(
//       (word) => this.tokenizer[word] || this.tokenizer["<UNK>"]
//     );

//     // Pad or truncate
//     if (tokens.length < this.maxSequenceLength) {
//       tokens = tokens.concat(
//         Array(this.maxSequenceLength - tokens.length).fill(
//           this.tokenizer["<PAD>"]
//         )
//       );
//     } else {
//       tokens = tokens.slice(0, this.maxSequenceLength);
//     }

//     return tokens;
//   }

//   private async createAndTrainModel(): Promise<void> {
//     const numClasses = this.moodLabels.length;
//     const embeddingDim = 32;

//     // Create model with better architecture
//     this.model = tf.sequential({
//       layers: [
//         tf.layers.embedding({
//           inputDim: this.vocabularySize,
//           outputDim: embeddingDim,
//           inputLength: this.maxSequenceLength,
//           maskZero: true, // Handle padding
//         }),
//         tf.layers.globalAveragePooling1d(),
//         tf.layers.dense({
//           units: 64,
//           activation: "relu",
//         }),
//         tf.layers.dropout({ rate: 0.3 }),
//         tf.layers.dense({
//           units: 32,
//           activation: "relu",
//         }),
//         tf.layers.dropout({ rate: 0.3 }),
//         tf.layers.dense({
//           units: numClasses,
//           activation: "softmax",
//         }),
//       ],
//     });

//     // Compile with better settings
//     this.model.compile({
//       optimizer: tf.train.adam(0.001),
//       loss: "categoricalCrossentropy",
//       metrics: ["accuracy"],
//     });

//     // Prepare training data
//     const trainTexts = this.trainingData.map((item) =>
//       this.tokenizeText(item.text)
//     );
//     const trainLabels = this.trainingData.map((item) => {
//       const label = Array(numClasses).fill(0);
//       const moodIndex =
//         this.moodCategories[item.mood as keyof typeof this.moodCategories]
//           .index;
//       label[moodIndex] = 1;
//       return label;
//     });

//     const xs = tf.tensor2d(trainTexts);
//     const ys = tf.tensor2d(trainLabels);

//     console.log("🏃‍♂️ Training model...");
//     console.log(`Training samples: ${this.trainingData.length}`);
//     console.log(`Vocabulary size: ${this.vocabularySize}`);
//     console.log(`Number of classes: ${numClasses}`);

//     // Train with more epochs and validation
//     await this.model.fit(xs, ys, {
//       epochs: 100,
//       batchSize: 8,
//       validationSplit: 0.2,
//       shuffle: true,
//       verbose: 0,
//       callbacks: {
//         onEpochEnd: (epoch, logs) => {
//           if (epoch % 20 === 0) {
//             console.log(
//               `Epoch ${epoch}: loss=${logs?.loss?.toFixed(4)}, acc=${logs?.acc?.toFixed(4)}, val_acc=${logs?.val_acc?.toFixed(4)}`
//             );
//           }
//         },
//       },
//     });

//     // Clean up
//     xs.dispose();
//     ys.dispose();

//     console.log("🎯 Model training completed");
//   }

//   async analyzeMood(text: string): Promise<MoodResult> {
//     if (!this.isInitialized || !this.model) {
//       await this.initialize();
//     }

//     try {
//       // Tokenize input
//       const tokens = this.tokenizeText(text);
//       const inputTensor = tf.tensor2d([tokens], [1, this.maxSequenceLength]);

//       // Make prediction
//       const prediction = this.model!.predict(inputTensor) as tf.Tensor;
//       const probabilities = await prediction.data();

//       // Find top predictions
//       const predictions = Array.from(probabilities).map((prob, index) => ({
//         mood: this.moodLabels[index],
//         probability: prob,
//       }));

//       // Sort by probability
//       predictions.sort((a, b) => b.probability - a.probability);

//       const topPrediction = predictions[0];
//       const confidence = Math.round(topPrediction.probability * 100);

//       // Clean up
//       inputTensor.dispose();
//       prediction.dispose();

//       const category =
//         this.moodCategories[
//           topPrediction.mood as keyof typeof this.moodCategories
//         ];

//       // Add some confidence adjustment based on text length and clarity
//       const adjustedConfidence = Math.max(
//         65, // Minimum confidence
//         Math.min(95, confidence + (text.length > 20 ? 5 : 0)) // Boost for longer text
//       );

//       return {
//         mood:
//           topPrediction.mood.charAt(0).toUpperCase() +
//           topPrediction.mood.slice(1),
//         confidence: adjustedConfidence,
//         color: category.color,
//         emoji: category.emoji,
//         reasoning: `Neural network analysis (${confidence}% base confidence)`,
//       };
//     } catch (error) {
//       console.error("❌ Error in mood analysis:", error);
//       return {
//         mood: "Neutral",
//         confidence: 65,
//         color: this.moodCategories.neutral.color,
//         emoji: this.moodCategories.neutral.emoji,
//         reasoning: "Error in analysis, defaulting to neutral",
//       };
//     }
//   }

//   // Enhanced batch analysis with progress tracking
//   async batchAnalyze(
//     entries: MoodData[],
//     onProgress?: (progress: number) => void
//   ): Promise<MoodData[]> {
//     const analyzedEntries: MoodData[] = [];
//     let processed = 0;

//     for (const entry of entries) {
//       if (entry.mood && entry.confidence) {
//         analyzedEntries.push(entry);
//       } else {
//         const moodResult = await this.analyzeMood(entry.text);
//         analyzedEntries.push({
//           ...entry,
//           mood: moodResult.mood,
//           confidence: moodResult.confidence,
//           color: moodResult.color,
//           emoji: moodResult.emoji,
//         });
//       }

//       processed++;
//       if (onProgress) {
//         onProgress(Math.round((processed / entries.length) * 100));
//       }
//     }

//     return analyzedEntries;
//   }

//   // Enhanced mood statistics
//   getMoodStats(entries: MoodData[]) {
//     if (entries.length === 0) {
//       return {
//         dominant: "Neutral",
//         dominantColor: "#6B7280",
//         dominantEmoji: "😐",
//         average: 0,
//         totalEntries: 0,
//         moodDistribution: {},
//         moodTrend: "stable",
//       };
//     }

//     const moodCounts: { [key: string]: number } = {};
//     const moodConfidences: { [key: string]: number[] } = {};
//     let totalConfidence = 0;

//     entries.forEach((entry) => {
//       if (entry.mood) {
//         const mood = entry.mood.toLowerCase();
//         moodCounts[mood] = (moodCounts[mood] || 0) + 1;

//         if (!moodConfidences[mood]) {
//           moodConfidences[mood] = [];
//         }
//         moodConfidences[mood].push(entry.confidence || 0);
//         totalConfidence += entry.confidence || 0;
//       }
//     });

//     // Find dominant mood
//     let dominantMood = "neutral";
//     let maxCount = 0;
//     Object.entries(moodCounts).forEach(([mood, count]) => {
//       if (count > maxCount) {
//         maxCount = count;
//         dominantMood = mood;
//       }
//     });

//     const dominantCategory =
//       this.moodCategories[dominantMood as keyof typeof this.moodCategories] ||
//       this.moodCategories.neutral;

//     return {
//       dominant: dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1),
//       dominantColor: dominantCategory.color,
//       dominantEmoji: dominantCategory.emoji,
//       average: Math.round(totalConfidence / entries.length),
//       totalEntries: entries.length,
//       moodDistribution: moodCounts,
//       moodTrend: this.calculateMoodTrend(entries),
//     };
//   }

//   private calculateMoodTrend(entries: MoodData[]): string {
//     if (entries.length < 3) return "stable";

//     const recent = entries.slice(0, Math.min(5, entries.length));
//     const avgRecentConfidence =
//       recent.reduce((sum, entry) => sum + (entry.confidence || 0), 0) /
//       recent.length;

//     const positiveModds = ["happy", "excited", "grateful", "calm"];
//     const recentPositive = recent.filter(
//       (entry) => entry.mood && positiveModds.includes(entry.mood.toLowerCase())
//     ).length;

//     const positiveRatio = recentPositive / recent.length;

//     if (positiveRatio > 0.6 && avgRecentConfidence > 75) return "improving";
//     if (positiveRatio < 0.3 && avgRecentConfidence > 70) return "declining";
//     return "stable";
//   }

//   // Test method to verify model performance
//   async testModel(): Promise<void> {
//     const testCases = [
//       { text: "I'm having a great day", expected: "happy" },
//       { text: "I feel so sad and lonely", expected: "sad" },
//       { text: "This is making me angry", expected: "angry" },
//       { text: "I'm worried about tomorrow", expected: "anxious" },
//       { text: "I'm so excited about this", expected: "excited" },
//       { text: "I feel peaceful and calm", expected: "calm" },
//       { text: "Just another normal day", expected: "neutral" },
//       { text: "I'm so grateful for everything", expected: "grateful" },
//     ];

//     console.log("🧪 Testing model accuracy...");
//     let correct = 0;

//     for (const testCase of testCases) {
//       const result = await this.analyzeMood(testCase.text);
//       const predicted = result.mood.toLowerCase();
//       const isCorrect = predicted === testCase.expected;

//       console.log(`Input: "${testCase.text}"`);
//       console.log(
//         `Expected: ${testCase.expected}, Predicted: ${predicted}, Confidence: ${result.confidence}%`
//       );
//       console.log(`✅ ${isCorrect ? "CORRECT" : "INCORRECT"}`);
//       console.log("---");

//       if (isCorrect) correct++;
//     }

//     const accuracy = Math.round((correct / testCases.length) * 100);
//     console.log(
//       `🎯 Test Accuracy: ${accuracy}% (${correct}/${testCases.length})`
//     );
//   }
// }

// // Export singleton instance
// export const moodAnalyzer = new MoodAnalyzer();
// export default MoodAnalyzer;
// Performance API polyfill - must be applied FIRST, before any imports
import now from "performance-now";

if (typeof global.performance === "undefined") {
  (global as any).performance = {
    now,
    mark: () => ({
      name: "",
      entryType: "mark",
      startTime: now(),
      duration: 0,
    }),
    measure: () => ({
      name: "",
      entryType: "measure",
      startTime: now(),
      duration: 0,
    }),
    getEntriesByName: () => [],
    getEntriesByType: () => [],
    clearMarks: () => {},
    clearMeasures: () => {},
    timeOrigin: Date.now(),
    toJSON: () => ({}),
  };
}

// Now safe to import TensorFlow
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
  private maxSequenceLength = 50;
  private vocabularySize = 0;

  // Enhanced mood categories with better balance
  private moodCategories = {
    happy: { color: "#10B981", emoji: "😊", index: 0 },
    sad: { color: "#6366F1", emoji: "😢", index: 1 },
    angry: { color: "#EF4444", emoji: "😠", index: 2 },
    anxious: { color: "#F59E0B", emoji: "😰", index: 3 },
    excited: { color: "#EC4899", emoji: "🤗", index: 4 },
    calm: { color: "#3B82F6", emoji: "😌", index: 5 },
    neutral: { color: "#6B7280", emoji: "😐", index: 6 },
    grateful: { color: "#059669", emoji: "🙏", index: 7 },
  };

  private moodLabels = Object.keys(this.moodCategories);

  // Expanded and balanced training data
  private trainingData = [
    // Happy - 20 examples
    { text: "I'm having a great day today", mood: "happy" },
    { text: "This is wonderful news", mood: "happy" },
    { text: "I feel so good right now", mood: "happy" },
    { text: "What a beautiful morning", mood: "happy" },
    { text: "I'm really enjoying myself", mood: "happy" },
    { text: "Life is amazing", mood: "happy" },
    { text: "I'm so pleased with the results", mood: "happy" },
    { text: "This makes me smile", mood: "happy" },
    { text: "I feel fantastic", mood: "happy" },
    { text: "Everything is going perfectly", mood: "happy" },
    { text: "I'm overjoyed", mood: "happy" },
    { text: "This is the best day ever", mood: "happy" },
    { text: "I'm feeling incredible", mood: "happy" },
    { text: "So much joy in my heart", mood: "happy" },
    { text: "I'm radiating happiness", mood: "happy" },
    { text: "Everything feels bright", mood: "happy" },
    { text: "I'm filled with positivity", mood: "happy" },
    { text: "Such a wonderful experience", mood: "happy" },
    { text: "I'm beaming with joy", mood: "happy" },
    { text: "Today is absolutely perfect", mood: "happy" },

    // Sad - 20 examples
    { text: "I'm feeling really down today", mood: "sad" },
    { text: "This makes me so sad", mood: "sad" },
    { text: "I can't stop crying", mood: "sad" },
    { text: "I feel so lonely", mood: "sad" },
    { text: "Everything seems hopeless", mood: "sad" },
    { text: "I'm heartbroken", mood: "sad" },
    { text: "I feel empty inside", mood: "sad" },
    { text: "Nothing seems to matter", mood: "sad" },
    { text: "I'm really depressed", mood: "sad" },
    { text: "Feeling blue today", mood: "sad" },
    { text: "My heart is heavy", mood: "sad" },
    { text: "I'm overwhelmed by sadness", mood: "sad" },
    { text: "Everything feels dark", mood: "sad" },
    { text: "I'm struggling today", mood: "sad" },
    { text: "Tears won't stop falling", mood: "sad" },
    { text: "I feel so disappointed", mood: "sad" },
    { text: "My mood is very low", mood: "sad" },
    { text: "I'm feeling melancholy", mood: "sad" },
    { text: "Such a gloomy day", mood: "sad" },
    { text: "I feel completely dejected", mood: "sad" },

    // Angry - 15 examples
    { text: "I'm so frustrated right now", mood: "angry" },
    { text: "This is making me furious", mood: "angry" },
    { text: "I can't believe this happened", mood: "angry" },
    { text: "I'm really annoyed", mood: "angry" },
    { text: "This is so unfair", mood: "angry" },
    { text: "I'm fed up with this", mood: "angry" },
    { text: "This makes my blood boil", mood: "angry" },
    { text: "I'm really mad about this", mood: "angry" },
    { text: "I'm absolutely livid", mood: "angry" },
    { text: "This is infuriating", mood: "angry" },
    { text: "I'm seething with rage", mood: "angry" },
    { text: "I'm so pissed off", mood: "angry" },
    { text: "This is driving me crazy", mood: "angry" },
    { text: "I'm boiling with anger", mood: "angry" },
    { text: "I'm outraged by this", mood: "angry" },

    // Anxious - 15 examples
    { text: "I'm really worried about tomorrow", mood: "anxious" },
    { text: "I feel so nervous", mood: "anxious" },
    { text: "I can't stop thinking about it", mood: "anxious" },
    { text: "I'm scared something will go wrong", mood: "anxious" },
    { text: "My heart is racing", mood: "anxious" },
    { text: "I feel panicked", mood: "anxious" },
    { text: "I'm having trouble sleeping", mood: "anxious" },
    { text: "I feel on edge", mood: "anxious" },
    { text: "I'm so stressed out", mood: "anxious" },
    { text: "My anxiety is through the roof", mood: "anxious" },
    { text: "I'm overthinking everything", mood: "anxious" },
    { text: "I feel restless and worried", mood: "anxious" },
    { text: "I'm trembling with nervousness", mood: "anxious" },
    { text: "I have butterflies in my stomach", mood: "anxious" },
    { text: "I'm consumed by worry", mood: "anxious" },

    // Excited - 15 examples
    { text: "I can't wait for this", mood: "excited" },
    { text: "I'm so pumped up", mood: "excited" },
    { text: "This is going to be amazing", mood: "excited" },
    { text: "I'm thrilled about the opportunity", mood: "excited" },
    { text: "I'm bouncing off the walls", mood: "excited" },
    { text: "I'm so hyped", mood: "excited" },
    { text: "This is incredible", mood: "excited" },
    { text: "I'm buzzing with energy", mood: "excited" },
    { text: "I'm absolutely ecstatic", mood: "excited" },
    { text: "I'm electric with anticipation", mood: "excited" },
    { text: "I'm over the moon", mood: "excited" },
    { text: "I'm bursting with enthusiasm", mood: "excited" },
    { text: "I'm so energized", mood: "excited" },
    { text: "I'm jumping for joy", mood: "excited" },
    { text: "I'm fired up about this", mood: "excited" },

    // Calm - 15 examples
    { text: "I feel so peaceful right now", mood: "calm" },
    { text: "Everything is serene", mood: "calm" },
    { text: "I'm completely relaxed", mood: "calm" },
    { text: "I feel centered and balanced", mood: "calm" },
    { text: "There's a sense of tranquility", mood: "calm" },
    { text: "I'm at peace with everything", mood: "calm" },
    { text: "I feel so zen", mood: "calm" },
    { text: "Everything feels harmonious", mood: "calm" },
    { text: "I'm in a state of serenity", mood: "calm" },
    { text: "My mind is clear and still", mood: "calm" },
    { text: "I feel grounded", mood: "calm" },
    { text: "There's a gentle calmness", mood: "calm" },
    { text: "I'm breathing deeply and peacefully", mood: "calm" },
    { text: "I feel stable and secure", mood: "calm" },
    { text: "Everything is quiet and peaceful", mood: "calm" },

    // Neutral - 15 examples
    { text: "It's just another day", mood: "neutral" },
    { text: "Things are okay I guess", mood: "neutral" },
    { text: "Nothing special happening", mood: "neutral" },
    { text: "Everything is normal", mood: "neutral" },
    { text: "It's fine", mood: "neutral" },
    { text: "Just going through the motions", mood: "neutral" },
    { text: "Same as usual", mood: "neutral" },
    { text: "Nothing to report", mood: "neutral" },
    { text: "An ordinary day", mood: "neutral" },
    { text: "Everything is average", mood: "neutral" },
    { text: "Just another regular day", mood: "neutral" },
    { text: "Nothing particularly good or bad", mood: "neutral" },
    { text: "Feeling neither here nor there", mood: "neutral" },
    { text: "Just existing today", mood: "neutral" },
    { text: "No strong feelings either way", mood: "neutral" },

    // Grateful - 15 examples
    { text: "I'm so thankful for this", mood: "grateful" },
    { text: "I feel blessed", mood: "grateful" },
    { text: "I really appreciate everything", mood: "grateful" },
    { text: "I'm grateful for this opportunity", mood: "grateful" },
    { text: "Thank you for everything", mood: "grateful" },
    { text: "I feel so fortunate", mood: "grateful" },
    { text: "I'm counting my blessings", mood: "grateful" },
    { text: "I appreciate all the support", mood: "grateful" },
    { text: "I'm deeply grateful", mood: "grateful" },
    { text: "My heart is full of gratitude", mood: "grateful" },
    { text: "I'm so appreciative", mood: "grateful" },
    { text: "I feel truly blessed", mood: "grateful" },
    { text: "I'm thankful for this moment", mood: "grateful" },
    { text: "I appreciate all the good things", mood: "grateful" },
    { text: "I'm filled with appreciation", mood: "grateful" },
  ];

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      console.log("🧠 Initializing Enhanced Mood Analyzer...");

      // Double-check performance API availability
      this.ensurePerformanceAPI();

      // Set TensorFlow backend explicitly and wait for it to be ready
      await tf.setBackend("cpu");
      await tf.ready();
      console.log("✅ TensorFlow.js ready with backend:", tf.getBackend());

      // Build vocabulary
      this.buildTokenizer();
      console.log("✅ Tokenizer built with", this.vocabularySize, "words");

      // Create and train model
      await this.createAndTrainModel();
      console.log("✅ Model trained successfully");

      this.isInitialized = true;
      console.log("🧠 Enhanced Mood Analyzer ready!");
    } catch (error) {
      console.error("❌ Failed to initialize mood analyzer:", error);
      throw error;
    }
  }

  private ensurePerformanceAPI(): void {
    const mockPerformance = {
      now: () => Date.now(),
      mark: () => ({}),
      measure: () => ({}),
      getEntriesByName: () => [],
      getEntriesByType: () => [],
      clearMarks: () => {},
      clearMeasures: () => {},
      timeOrigin: Date.now(),
      toJSON: () => ({}),
    };

    // Check and set performance on all possible global contexts
    const contexts = [
      typeof globalThis !== "undefined" ? globalThis : null,
      typeof global !== "undefined" ? global : null,
      typeof window !== "undefined" ? window : null,
      typeof self !== "undefined" ? self : null,
    ].filter(Boolean);

    contexts.forEach((context: any) => {
      if (context && !context.performance) {
        context.performance = mockPerformance;
      }
    });

    // Ensure it's available in the current scope
    if (typeof performance === "undefined") {
      (global as any).performance = mockPerformance;
    }
  }

  private buildTokenizer(): void {
    const vocabulary = new Set<string>();

    // Extract words from training data
    this.trainingData.forEach((item) => {
      const words = item.text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 1);

      words.forEach((word) => vocabulary.add(word));
    });

    // Create tokenizer
    this.tokenizer = { "<PAD>": 0, "<UNK>": 1 };
    let index = 2;

    Array.from(vocabulary)
      .sort()
      .forEach((word) => {
        this.tokenizer[word] = index++;
      });

    this.vocabularySize = Object.keys(this.tokenizer).length;
  }

  private tokenizeText(text: string): number[] {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1);

    let tokens = words.map(
      (word) => this.tokenizer[word] || this.tokenizer["<UNK>"]
    );

    // Pad or truncate
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

  private async createAndTrainModel(): Promise<void> {
    const numClasses = this.moodLabels.length;
    const embeddingDim = 32;

    try {
      // Create model with simpler architecture to avoid performance issues
      this.model = tf.sequential({
        layers: [
          tf.layers.embedding({
            inputDim: this.vocabularySize,
            outputDim: embeddingDim,
            inputLength: this.maxSequenceLength,
            maskZero: true,
          }),
          tf.layers.globalAveragePooling1d(),
          tf.layers.dense({
            units: 32,
            activation: "relu",
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: numClasses,
            activation: "softmax",
          }),
        ],
      });

      // Compile with simpler optimizer
      this.model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
      });

      // Prepare training data
      const trainTexts = this.trainingData.map((item) =>
        this.tokenizeText(item.text)
      );
      const trainLabels = this.trainingData.map((item) => {
        const label = Array(numClasses).fill(0);
        const moodIndex =
          this.moodCategories[item.mood as keyof typeof this.moodCategories]
            .index;
        label[moodIndex] = 1;
        return label;
      });

      const xs = tf.tensor2d(trainTexts);
      const ys = tf.tensor2d(trainLabels);

      console.log("🏃‍♂️ Training model...");
      console.log(`Training samples: ${this.trainingData.length}`);
      console.log(`Vocabulary size: ${this.vocabularySize}`);
      console.log(`Number of classes: ${numClasses}`);

      // Train with fewer epochs to avoid timeout
      await this.model.fit(xs, ys, {
        epochs: 20,
        batchSize: 16,
        validationSplit: 0.2,
        shuffle: true,
        verbose: 0,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            if (epoch % 5 === 0) {
              console.log(
                `Epoch ${epoch}: loss=${logs?.loss?.toFixed(4)}, acc=${logs?.acc?.toFixed(4)}`
              );
            }
          },
        },
      });

      // Clean up tensors
      xs.dispose();
      ys.dispose();

      console.log("🎯 Model training completed");
    } catch (error) {
      console.error("❌ Error creating/training model:", error);
      throw error;
    }
  }

  async analyzeMood(text: string): Promise<MoodResult> {
    if (!this.isInitialized || !this.model) {
      await this.initialize();
    }

    try {
      // Tokenize input
      const tokens = this.tokenizeText(text);
      const inputTensor = tf.tensor2d([tokens], [1, this.maxSequenceLength]);

      // Make prediction
      const prediction = this.model!.predict(inputTensor) as tf.Tensor;
      const probabilities = await prediction.data();

      // Find top predictions
      const predictions = Array.from(probabilities).map((prob, index) => ({
        mood: this.moodLabels[index],
        probability: prob,
      }));

      // Sort by probability
      predictions.sort((a, b) => b.probability - a.probability);

      const topPrediction = predictions[0];
      const confidence = Math.round(topPrediction.probability * 100);

      // Clean up tensors
      inputTensor.dispose();
      prediction.dispose();

      const category =
        this.moodCategories[
          topPrediction.mood as keyof typeof this.moodCategories
        ];

      // Add some confidence adjustment based on text length and clarity
      const adjustedConfidence = Math.max(
        65, // Minimum confidence
        Math.min(95, confidence + (text.length > 20 ? 5 : 0))
      );

      return {
        mood:
          topPrediction.mood.charAt(0).toUpperCase() +
          topPrediction.mood.slice(1),
        confidence: adjustedConfidence,
        color: category.color,
        emoji: category.emoji,
        reasoning: `Neural network analysis (${confidence}% base confidence)`,
      };
    } catch (error) {
      console.error("❌ Error in mood analysis:", error);
      return {
        mood: "Neutral",
        confidence: 65,
        color: this.moodCategories.neutral.color,
        emoji: this.moodCategories.neutral.emoji,
        reasoning: "Error in analysis, defaulting to neutral",
      };
    }
  }

  // Enhanced batch analysis with progress tracking
  async batchAnalyze(
    entries: MoodData[],
    onProgress?: (progress: number) => void
  ): Promise<MoodData[]> {
    const analyzedEntries: MoodData[] = [];
    let processed = 0;

    for (const entry of entries) {
      if (entry.mood && entry.confidence) {
        analyzedEntries.push(entry);
      } else {
        const moodResult = await this.analyzeMood(entry.text);
        analyzedEntries.push({
          ...entry,
          mood: moodResult.mood,
          confidence: moodResult.confidence,
          color: moodResult.color,
          emoji: moodResult.emoji,
        });
      }

      processed++;
      if (onProgress) {
        onProgress(Math.round((processed / entries.length) * 100));
      }
    }

    return analyzedEntries;
  }

  // Enhanced mood statistics
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
    const moodConfidences: { [key: string]: number[] } = {};
    let totalConfidence = 0;

    entries.forEach((entry) => {
      if (entry.mood) {
        const mood = entry.mood.toLowerCase();
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;

        if (!moodConfidences[mood]) {
          moodConfidences[mood] = [];
        }
        moodConfidences[mood].push(entry.confidence || 0);
        totalConfidence += entry.confidence || 0;
      }
    });

    // Find dominant mood
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
    const avgRecentConfidence =
      recent.reduce((sum, entry) => sum + (entry.confidence || 0), 0) /
      recent.length;

    const positiveMoods = ["happy", "excited", "grateful", "calm"];
    const recentPositive = recent.filter(
      (entry) => entry.mood && positiveMoods.includes(entry.mood.toLowerCase())
    ).length;

    const positiveRatio = recentPositive / recent.length;

    if (positiveRatio > 0.6 && avgRecentConfidence > 75) return "improving";
    if (positiveRatio < 0.3 && avgRecentConfidence > 70) return "declining";
    return "stable";
  }

  // Test method to verify model performance
  async testModel(): Promise<void> {
    const testCases = [
      { text: "I'm having a great day", expected: "happy" },
      { text: "I feel so sad and lonely", expected: "sad" },
      { text: "This is making me angry", expected: "angry" },
      { text: "I'm worried about tomorrow", expected: "anxious" },
      { text: "I'm so excited about this", expected: "excited" },
      { text: "I feel peaceful and calm", expected: "calm" },
      { text: "Just another normal day", expected: "neutral" },
      { text: "I'm so grateful for everything", expected: "grateful" },
    ];

    console.log("🧪 Testing model accuracy...");
    let correct = 0;

    for (const testCase of testCases) {
      const result = await this.analyzeMood(testCase.text);
      const predicted = result.mood.toLowerCase();
      const isCorrect = predicted === testCase.expected;

      console.log(`Input: "${testCase.text}"`);
      console.log(
        `Expected: ${testCase.expected}, Predicted: ${predicted}, Confidence: ${result.confidence}%`
      );
      console.log(`✅ ${isCorrect ? "CORRECT" : "INCORRECT"}`);
      console.log("---");

      if (isCorrect) correct++;
    }

    const accuracy = Math.round((correct / testCases.length) * 100);
    console.log(
      `🎯 Test Accuracy: ${accuracy}% (${correct}/${testCases.length})`
    );
  }

  // Cleanup method to dispose of tensors and free memory
  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
    this.isInitialized = false;
    console.log("🧹 Mood analyzer cleaned up");
  }
}

// Export singleton instance
export const moodAnalyzer = new MoodAnalyzer();
export default MoodAnalyzer;
