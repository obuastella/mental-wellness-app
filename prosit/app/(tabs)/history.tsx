// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import React, { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

// const History = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState("week");

//   const moodData = [
//     {
//       id: 1,
//       date: "June 15",
//       mood: "Happy",
//       confidence: 85,
//       color: "#10B981",
//       emoji: "😊",
//       description: "Felt great after morning workout",
//     },
//     {
//       id: 2,
//       date: "June 14",
//       mood: "Anxious",
//       confidence: 72,
//       color: "#F59E0B",
//       emoji: "😰",
//       description: "Work presentation stress",
//     },
//     {
//       id: 3,
//       date: "June 13",
//       mood: "Calm",
//       confidence: 91,
//       color: "#3B82F6",
//       emoji: "😌",
//       description: "Peaceful evening with family",
//     },
//     {
//       id: 4,
//       date: "June 12",
//       mood: "Excited",
//       confidence: 88,
//       color: "#EF4444",
//       emoji: "🤗",
//       description: "New project announcement",
//     },
//     {
//       id: 5,
//       date: "June 11",
//       mood: "Sad",
//       confidence: 76,
//       color: "#6366F1",
//       emoji: "😢",
//       description: "Missing friends from home",
//     },
//     {
//       id: 6,
//       date: "June 10",
//       mood: "Stressed",
//       confidence: 79,
//       color: "#F59E0B",
//       emoji: "😤",
//       description: "Deadline pressure at work",
//     },
//   ];

//   const moodStats = {
//     dominant: "Happy",
//     dominantColor: "#10B981",
//     dominantEmoji: "😊",
//     average: 82,
//     totalEntries: 47,
//     streak: 12,
//   };

//   const periods = [
//     { key: "week", label: "Week", icon: "calendar-outline" },
//     { key: "month", label: "Month", icon: "calendar" },
//   ];

//   const getMoodTrend = () => {
//     const recentMoods = moodData.slice(0, 3);
//     const avgRecent =
//       recentMoods.reduce((sum, mood) => sum + mood.confidence, 0) /
//       recentMoods.length;
//     return avgRecent > 80
//       ? "trending up"
//       : avgRecent > 60
//         ? "stable"
//         : "needs attention";
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <View style={styles.headerTitleContainer}>
//             <Ionicons name="analytics" size={32} color="#A855F7" />
//             <View style={styles.headerTextContainer}>
//               <Text style={styles.headerTitle}>Mood History</Text>
//               <Text style={styles.headerSubtitle}>
//                 AI-powered emotion analysis
//               </Text>
//             </View>
//           </View>
//           <View style={styles.trendIndicator}>
//             <Ionicons
//               name={
//                 getMoodTrend() === "trending up"
//                   ? "trending-up"
//                   : "trending-down"
//               }
//               size={20}
//               color={getMoodTrend() === "trending up" ? "#10B981" : "#EF4444"}
//             />
//           </View>
//         </View>
//       </View>

//       {/* Period Selector */}
//       <View style={styles.periodContainer}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.periodScrollContainer}
//         >
//           {periods.map((period: any) => (
//             <TouchableOpacity
//               key={period.key}
//               style={[
//                 styles.periodButton,
//                 selectedPeriod === period.key && styles.periodButtonActive,
//               ]}
//               onPress={() => setSelectedPeriod(period.key)}
//               activeOpacity={0.7}
//             >
//               <Ionicons
//                 name={period.icon}
//                 size={16}
//                 color={selectedPeriod === period.key ? "#FFFFFF" : "#9CA3AF"}
//               />
//               <Text
//                 style={[
//                   styles.periodButtonText,
//                   selectedPeriod === period.key &&
//                     styles.periodButtonTextActive,
//                 ]}
//               >
//                 {period.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//       {/* Overview Card */}
//       <View style={styles.overviewCard}>
//         <Text style={styles.sectionTitle}>Dominant Mood</Text>
//         <View style={styles.dominantMoodContainer}>
//           <View style={styles.dominantMoodIcon}>
//             <Text style={styles.dominantMoodEmoji}>
//               {moodStats.dominantEmoji}
//             </Text>
//           </View>
//           <View style={styles.dominantMoodInfo}>
//             <Text style={styles.dominantMoodTitle}>{moodStats.dominant}</Text>
//             <Text style={styles.dominantMoodSubtitle}>
//               Most frequent this {selectedPeriod}
//             </Text>
//             <View style={styles.confidenceContainer}>
//               <View style={styles.confidenceBar}>
//                 <View
//                   style={[
//                     styles.confidenceProgress,
//                     {
//                       width: `${moodStats.average}%`,
//                       backgroundColor: moodStats.dominantColor,
//                     },
//                   ]}
//                 />
//               </View>
//               <Text style={styles.confidenceText}>{moodStats.average}%</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Mood Timeline */}
//       <View style={styles.timelineContainer}>
//         <Text style={styles.sectionTitle}>Recent Analysis</Text>

//         {moodData.map((entry, index) => (
//           <View key={entry.id} style={styles.timelineItem}>
//             <View style={styles.timelineIconContainer}>
//               <View
//                 style={[
//                   styles.timelineIcon,
//                   { backgroundColor: entry.color + "20" },
//                 ]}
//               >
//                 <Text style={styles.timelineEmoji}>{entry.emoji}</Text>
//               </View>
//               {index < moodData.length - 1 && (
//                 <View style={styles.timelineLine} />
//               )}
//             </View>

//             <View style={styles.timelineContent}>
//               <View style={styles.timelineHeader}>
//                 <Text style={styles.timelineMood}>{entry.mood}</Text>
//                 <Text style={styles.timelineDate}>{entry.date}</Text>
//               </View>

//               <Text style={styles.timelineDescription}>
//                 {entry.description}
//               </Text>

//               <View style={styles.timelineConfidence}>
//                 <View style={styles.confidenceBarSmall}>
//                   <View
//                     style={[
//                       styles.confidenceProgressSmall,
//                       {
//                         width: `${entry.confidence}%`,
//                         backgroundColor: entry.color,
//                       },
//                     ]}
//                   />
//                 </View>
//                 <Text style={styles.confidenceTextSmall}>
//                   {entry.confidence}%
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* AI Insight */}
//       <View style={styles.insightContainer}>
//         <View style={styles.insightHeader}>
//           <Ionicons name="bulb" size={24} color="#FFD700" />
//           <Text style={styles.insightTitle}>AI Insight</Text>
//         </View>
//         <Text style={styles.insightText}>
//           You tend to feel happiest on weekends and show increased anxiety
//           during weekday evenings. Consider scheduling relaxation time after 6
//           PM on weekdays to maintain emotional balance.
//         </Text>
//       </View>

//       {/* Bottom Padding */}
//       <View style={styles.bottomPadding} />
//     </ScrollView>
//   );
// };

// export default History;
// added

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { moodAnalyzer, MoodData } from "../moodAnalyzer";
// import moodAnalyzer, { MoodData } from "../moodAnalyzer";
// import { improvedMoodAnalyzer } from "../improvedMoodAnalyzer";
import { account, databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { DATABASE_ID, JOURNAL_COLLECTION_ID } from "../config/prositDB";
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get("window");
const History = () => {
  
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [moodStats, setMoodStats] = useState({
    dominant: "Neutral",
    dominantColor: "#6B7280",
    dominantEmoji: "😐",
    average: 0,
    totalEntries: 0,
    moodDistribution: {}
  });

  const periods = [
    { key: "week", label: "Week", icon: "calendar-outline" },
    { key: "month", label: "Month", icon: "calendar" },
  ];

  // Fetch journal entries from Appwrite
  const fetchJournalEntries = async () => {
    try {
      setIsLoading(true);
      const user = await account.get();
      
      // Calculate date range based on selected period
      const now = new Date();
      const startDate = new Date();
      if (selectedPeriod === "week") {
        startDate.setDate(now.getDate() - 7);
      } else {
        startDate.setMonth(now.getMonth() - 1);
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        JOURNAL_COLLECTION_ID,
        [
          Query.equal("userId", user.$id),
          Query.orderDesc("$createdAt"),
          Query.limit(50)
        ]
      );

      // Filter entries by date range
      const filteredEntries = response.documents.filter(doc => {
        const entryDate = new Date(doc.$createdAt);
        return entryDate >= startDate;
      });

      // Convert to MoodData format
      const entries: MoodData[] = filteredEntries.map(doc => ({
        id: doc.$id,
        text: doc.text,
        date: new Date(doc.$createdAt).toLocaleDateString(),
        time: doc.time || new Date(doc.$createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        mood: doc.mood,
        confidence: doc.confidence,
        color: doc.color,
        emoji: doc.emoji
      }));

      setMoodData(entries);
      
      // Analyze moods if not already analyzed
      await analyzeMoods(entries);
      
    } catch (error) {
      console.error("❌ Error fetching journal entries:", error);
    } finally {
      setIsLoading(false);
    }
  };
useFocusEffect(
  useCallback(() => {
    fetchJournalEntries();
  }, [selectedPeriod])
);
  // Analyze moods using AI
  const analyzeMoods = async (entries: MoodData[]) => {
    try {
      setIsAnalyzing(true);
      
      // Initialize the mood analyzer
      await moodAnalyzer.initialize();
      
      // Batch analyze entries
      const analyzedEntries = await moodAnalyzer.batchAnalyze(entries);
      
      // Update entries in database and state
      for (const entry of analyzedEntries) {
        if (entry.mood && !entries.find(e => e.id === entry.id)?.mood) {
          // Update database with mood analysis
          try {
            await databases.updateDocument(
              DATABASE_ID,
              JOURNAL_COLLECTION_ID,
              entry.id,
              {
                mood: entry.mood,
                confidence: entry.confidence,
                color: entry.color,
                emoji: entry.emoji
              }
            );
          } catch (updateError) {
            console.warn("⚠️ Could not update entry in database:", updateError);
          }
        }
      }
      
      setMoodData(analyzedEntries);
      
      // Calculate and update mood statistics
      const stats = moodAnalyzer.getMoodStats(analyzedEntries);
      setMoodStats(stats);
      
    } catch (error) {
      console.error("❌ Error analyzing moods:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Refresh data
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJournalEntries();
    setRefreshing(false);
  };

  // Get mood trend
  const getMoodTrend = () => {
    if (moodData.length < 3) return "stable";
    
    const recentMoods = moodData.slice(0, 3);
    const avgRecent = recentMoods.reduce((sum, mood) => sum + (mood.confidence || 0), 0) / recentMoods.length;
    
    return avgRecent > 80 ? "trending up" : avgRecent > 60 ? "stable" : "needs attention";
  };

  // Load data when component mounts or period changes
  useEffect(() => {
    fetchJournalEntries();
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A855F7" />
        <Text style={styles.loadingText}>Loading your mood history...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="analytics" size={32} color="#A855F7" />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Mood History</Text>
              <Text style={styles.headerSubtitle}>
                AI-powered emotion analysis
              </Text>
            </View>
          </View>
          <View style={styles.trendIndicator}>
            <Ionicons
              name={getMoodTrend() === "trending up" ? "trending-up" : "trending-down"}
              size={20}
              color={getMoodTrend() === "trending up" ? "#10B981" : "#EF4444"}
            />
          </View>
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.periodScrollContainer}
        >
          {periods.map((period:any) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={period.icon}
                size={16}
                color={selectedPeriod === period.key ? "#FFFFFF" : "#9CA3AF"}
              />
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period.key && styles.periodButtonTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* AI Analysis Status */}
      {isAnalyzing && (
        <View style={styles.analyzingContainer}>
          <ActivityIndicator size="small" color="#A855F7" />
          <Text style={styles.analyzingText}>AI analyzing your moods...</Text>
        </View>
      )}

      {/* Overview Card */}
      <View style={styles.overviewCard}>
        <Text style={styles.sectionTitle}>Dominant Mood</Text>
        <View style={styles.dominantMoodContainer}>
          <View style={styles.dominantMoodIcon}>
            <Text style={styles.dominantMoodEmoji}>
              {moodStats.dominantEmoji}
            </Text>
          </View>
          <View style={styles.dominantMoodInfo}>
            <Text style={styles.dominantMoodTitle}>{moodStats.dominant}</Text>
            <Text style={styles.dominantMoodSubtitle}>
              Most frequent this {selectedPeriod}
            </Text>
            <View style={styles.confidenceContainer}>
              <View style={styles.confidenceBar}>
                <View
                  style={[
                    styles.confidenceProgress,
                    {
                      width: `${moodStats.average}%`,
                      backgroundColor: moodStats.dominantColor,
                    },
                  ]}
                />
              </View>
              <Text style={styles.confidenceText}>{moodStats.average}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Mood Timeline */}
      <View style={styles.timelineContainer}>
        <Text style={styles.sectionTitle}>Recent Analysis</Text>

        {moodData.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
            <Text style={styles.noDataText}>No journal entries found</Text>
            <Text style={styles.noDataSubtext}>
              Start writing to see your mood analysis
            </Text>
          </View>
        ) : (
          moodData.map((entry, index) => (
            <View key={entry.id} style={styles.timelineItem}>
              <View style={styles.timelineIconContainer}>
                <View
                  style={[
                    styles.timelineIcon,
                    { backgroundColor: (entry.color || "#6B7280") + "20" },
                  ]}
                >
                  <Text style={styles.timelineEmoji}>
                    {entry.emoji || "😐"}
                  </Text>
                </View>
                {index < moodData.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineMood}>
                    {entry.mood || "Analyzing..."}
                  </Text>
                  <Text style={styles.timelineDate}>{entry.date}</Text>
                </View>

                <Text style={styles.timelineDescription} numberOfLines={2}>
                  {entry.text}
                </Text>

                <View style={styles.timelineConfidence}>
                  <View style={styles.confidenceBarSmall}>
                    <View
                      style={[
                        styles.confidenceProgressSmall,
                        {
                          width: `${entry.confidence || 0}%`,
                          backgroundColor: entry.color || "#6B7280",
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.confidenceTextSmall}>
                    {entry.confidence || 0}%
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* AI Insight */}
      {moodData.length > 0 && (
        <View style={styles.insightContainer}>
          <View style={styles.insightHeader}>
            <Ionicons name="bulb" size={24} color="#FFD700" />
            <Text style={styles.insightTitle}>AI Insight</Text>
          </View>
          <Text style={styles.insightText}>
            Based on your recent entries, your mood analysis shows {moodStats.average}% average confidence. 
            Your dominant mood is {moodStats.dominant.toLowerCase()}. 
            {getMoodTrend() === "trending up" 
              ? "Your emotional state appears to be improving over time."
              : "Consider implementing stress management techniques for better emotional balance."
            }
          </Text>
        </View>
      )}

      {/* Bottom Padding */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

export default History;

 const styles:any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(31, 41, 55, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.3)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 2,
  },
  trendIndicator: {
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  periodContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  periodScrollContainer: {
    paddingRight: 20,
  },
  periodButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  periodButtonActive: {
    backgroundColor: "#A855F7",
    borderColor: "#A855F7",
    shadowColor: "#A855F7",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  periodButtonText: {
    color: "#9CA3AF",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 14,
  },
  periodButtonTextActive: {
    color: "#FFFFFF",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 10,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9CA3AF",
  },
  statTitle: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  statPercentage: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 2,
  },
  overviewCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  dominantMoodContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dominantMoodIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  dominantMoodEmoji: {
    fontSize: 28,
  },
  dominantMoodInfo: {
    flex: 1,
  },
  dominantMoodTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  dominantMoodSubtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 12,
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  confidenceBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderRadius: 3,
    marginRight: 12,
  },
  confidenceProgress: {
    height: 6,
    borderRadius: 3,
  },
  confidenceText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    minWidth: 35,
  },
  timelineContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineIconContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(75, 85, 99, 0.3)",
  },
  timelineEmoji: {
    fontSize: 18,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  timelineMood: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  timelineDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  timelineDescription: {
    fontSize: 14,
    color: "#D1D5DB",
    marginBottom: 12,
    lineHeight: 20,
  },
  timelineConfidence: {
    flexDirection: "row",
    alignItems: "center",
  },
  confidenceBarSmall: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(75, 85, 99, 0.3)",
    borderRadius: 2,
    marginRight: 8,
  },
  confidenceProgressSmall: {
    height: 4,
    borderRadius: 2,
  },
  confidenceTextSmall: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    minWidth: 30,
  },
  insightContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "linear-gradient(135deg, #A855F7, #3B82F6)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  insightText: {
    color: "#E5E7EB",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  insightButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  insightButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginRight: 8,
    fontSize: 14,
  },
  bottomPadding: {
    height: 120,
  },
});
