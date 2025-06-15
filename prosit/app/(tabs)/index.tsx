import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyQuote, setDailyQuote] = useState({
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
  });

  // Sample daily quotes
  const quotes = [
    { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
    {
      text: "Your mental health is a priority. Your happiness is essential.",
      author: "Anonymous",
    },
    { text: "Progress, not perfection.", author: "Anonymous" },
    { text: "You are stronger than you think.", author: "Anonymous" },
    { text: "Healing isn't linear, and that's okay.", author: "Anonymous" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const QuickActionCard: any = ({
    icon,
    title,
    description,
    color,
    onPress,
    href,
  }: any) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mr-4`}
          style={{ backgroundColor: color + "20" }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            {title}
          </Text>
          <Text className="text-sm text-gray-600">{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  const MoodShortcut = ({ emoji, mood, color }: any) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-3 items-center shadow-sm border border-gray-100 mx-1"
      style={{
        width: (width - 80) / 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text className="text-2xl mb-2">{emoji}</Text>
      <Text className="text-xs font-medium text-gray-700">{mood}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header Section */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
        style={{ paddingTop: 60 }}
      >
        <View className="px-4 flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">
              {getGreeting()}, Stella
            </Text>
            <Text className="text-white/80 text-base mt-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center"
            onPress={() => {
              router.dismissAll();
              router.replace("/");
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Daily Quote */}
        <View className="px-4 bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
          <Text className="text-white text-lg font-medium leading-6 mb-2">
            "{dailyQuote.text}"
          </Text>
          <Text className="text-white/80 text-sm">— {dailyQuote.author}</Text>
        </View>
      </LinearGradient>

      {/* Quick Mood Entry */}
      <View className="px-6 mt-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          How are you feeling?
        </Text>
        <View className="flex-row justify-between">
          <MoodShortcut emoji="😊" mood="Great" color="#10B981" />
          <MoodShortcut emoji="😌" mood="Good" color="#3B82F6" />
          <MoodShortcut emoji="😐" mood="Okay" color="#F59E0B" />
          <MoodShortcut emoji="😔" mood="Down" color="#EF4444" />
        </View>
      </View>
      {/* Stats Overview */}
      <View className="px-6 mt-6 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Your Wellness Journey
        </Text>
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <View className="flex-row justify-between items-center">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-purple-600">7</Text>
              <Text className="text-sm text-gray-600 mt-1">Day Streak</Text>
            </View>
            <View className="w-px h-12 bg-gray-200" />
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-blue-600">24</Text>
              <Text className="text-sm text-gray-600 mt-1">Entries</Text>
            </View>
            <View className="w-px h-12 bg-gray-200" />
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-600">85%</Text>
              <Text className="text-sm text-gray-600 mt-1">Positive</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Quick Actions */}
      <View className="px-6 mt-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Quick Actions
        </Text>

        <QuickActionCard
          icon="create-outline"
          title="Write Journal Entry"
          description="Express your thoughts and feelings"
          color="#8B5CF6"
          href="/journal"
        />

        <QuickActionCard
          icon="analytics-outline"
          title="Mood History"
          description="Track your emotional journey"
          color="#06B6D4"
          href="/history"
        />

        <QuickActionCard
          icon="heart-outline"
          title="AI Emotion Analysis"
          description="Get insights into your emotional patterns"
          color="#EC4899"
        />
        <QuickActionCard
          icon="chatbubbles-outline"
          title="Talk to Prosit AI"
          description="Chat with your AI wellness companion"
          color="#F59E0B"
        />
      </View>
    </ScrollView>
  );
};

export default home;
