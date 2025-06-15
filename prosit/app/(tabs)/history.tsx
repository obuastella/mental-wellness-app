import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const History = () => {
  // Sample data - replace with your actual data
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const moodData = [
    {
      id: 1,
      date: "June 15",
      mood: "Happy",
      confidence: 85,
      color: "#10B981",
      emoji: "😊",
    },
    {
      id: 2,
      date: "June 14",
      mood: "Anxious",
      confidence: 72,
      color: "#F59E0B",
      emoji: "😰",
    },
    {
      id: 3,
      date: "June 13",
      mood: "Calm",
      confidence: 91,
      color: "#3B82F6",
      emoji: "😌",
    },
    {
      id: 4,
      date: "June 12",
      mood: "Excited",
      confidence: 88,
      color: "#EF4444",
      emoji: "🤗",
    },
    {
      id: 5,
      date: "June 11",
      mood: "Sad",
      confidence: 76,
      color: "#6366F1",
      emoji: "😢",
    },

    {
      id: 6,
      date: "June 9",
      mood: "Stressed",
      confidence: 79,
      color: "#F59E0B",
      emoji: "😤",
    },
  ];

  const moodStats = {
    dominant: "Happy",
    dominantColor: "#10B981",
    dominantEmoji: "😊",
    average: 82,
    totalEntries: 47,
    streak: 12,
  };

  const patterns = [
    { title: "Most Common Mood", value: "Happy (32%)", icon: "😊" },
    { title: "Average Confidence", value: "82%", icon: "🎯" },
    { title: "Current Streak", value: "12 days", icon: "🔥" },
    { title: "This Month", value: "47 entries", icon: "📝" },
  ];

  const periods = ["week", "month"];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-20 pb-6">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Mood History
        </Text>
        <Text className="text-gray-600">AI-powered emotion analysis</Text>
      </View>

      {/* Period Selector */}
      <View className="px-6 mt-4">
        <View className="flex-row bg-white rounded-xl p-1">
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              className={`flex-1 py-2 rounded-lg ${
                selectedPeriod === period ? "bg-blue-500" : "bg-transparent"
              }`}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                className={`text-center font-medium capitalize ${
                  selectedPeriod === period ? "text-white" : "text-gray-600"
                }`}
              >
                {period === "3months" ? "3 Months" : period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Overview Card */}
      <View className="mx-6 mt-4 bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-4">Overview</Text>

        <View className="items-center mb-6">
          <Text className="text-4xl mb-2">{moodStats.dominantEmoji}</Text>
          <Text className="text-xl font-semibold text-gray-800">
            {moodStats.dominant}
          </Text>
          <Text className="text-gray-500">
            Dominant mood this {selectedPeriod}
          </Text>
        </View>
      </View>

      {/* Mood Timeline */}
      <View className="mx-6 mt-4 bg-white rounded-2xl p-6 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Recent Analysis
        </Text>

        {moodData.map((entry) => (
          <View
            key={entry.id}
            className="flex-row items-center mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0"
          >
            {/* Emoji */}
            <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-4">
              <Text className="text-xl">{entry.emoji}</Text>
            </View>

            {/* Content */}
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="font-semibold text-gray-800">
                  {entry.mood}
                </Text>
                <Text className="text-sm text-gray-500">{entry.date}</Text>
              </View>

              {/* Confidence Bar */}
              <View className="flex-row items-center">
                <View className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <View
                    className="h-2 rounded-full"
                    style={{
                      width: `${entry.confidence}%`,
                      backgroundColor: entry.color,
                    }}
                  />
                </View>
                <Text className="text-xs text-gray-500 w-10">
                  {entry.confidence}%
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Patterns Insight */}
      <View className="mb-20 pb-20 bg-secondary mx-6 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6">
        <Text className="text-white text-lg font-bold mb-2">💡 AI Insight</Text>
        <Text className="text-black text-sm leading-5">
          You tend to feel happiest on weekends and show increased anxiety
          during weekday evenings. Consider scheduling relaxation time after 6
          PM on weekdays.
        </Text>
      </View>
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({});
