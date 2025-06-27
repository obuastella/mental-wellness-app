import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { account, databases } from "@/lib/appwrite";
import { COLLECTION_ID, DATABASE_ID } from "../config/prositDB";
import { Query } from "react-native-appwrite";
import { useFocusEffect } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const home = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyQuote, setDailyQuote] = useState({
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
  });
  const [userName, setUserName] = useState("");

  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useFocusEffect(
    useCallback(() => {
      const fetchUserAndStats = async () => {
        try {
          const user = await account.get();
          setUserName(user.name);

          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("userId", user.$id)]
          );

          if (response.documents.length > 0) {
            setStats(response.documents[0]);
          }
        } catch (error) {
          console.error("❌ Failed to fetch user/stats:", error);
        }
      };

      fetchUserAndStats();
    }, [])
  );
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
      className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 shadow-lg mb-4 border border-gray-700/50"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      }}
      onPress={() => router.push(href)}
    >
      <View className="flex-row items-center">
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mr-4`}
          style={{ backgroundColor: color + "30" }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-white mb-1">{title}</Text>
          <Text className="text-sm text-gray-300">{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
  const handleLogout = useCallback(async () => {
    try {
      await account.deleteSession("current");
      console.log("User logged out");
      router.replace("/");
    } catch (error) {
      console.error("❌ Logout error:", error);
      alert("Failed to log out. Please try again.");
    }
  }, [router]);
  return (
    <ScrollView
      className="flex-1 bg-gray-900"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header Section */}
      <LinearGradient
        colors={["#1e1b4b", "#312e81", "#4c1d95"]}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
        style={{ paddingTop: 60 }}
      >
        <View className="px-4 flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">
              {getGreeting()}, {userName}
            </Text>
            <Text className="text-purple-200 text-base mt-1">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <TouchableOpacity
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center border border-white/20"
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Daily Quote */}
        <View className="px-4 bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <Text className="text-white text-lg font-medium leading-6 mb-2">
            "{dailyQuote.text}"
          </Text>
          <Text className="text-purple-200 text-sm">— {dailyQuote.author}</Text>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <View className="px-6 mt-6 mb-6">
        <Text className="text-xl font-bold text-white mb-4">
          Your Wellness Journey
        </Text>
        <View className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-700/50">
          <View className="flex-row justify-between items-center">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-purple-400">
                {stats?.dayStreak}
              </Text>
              <Text className="text-sm text-gray-300 mt-1">Day Streak</Text>
            </View>
            <View className="w-px h-12 bg-gray-600" />
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-blue-400">
                {stats?.entries}
              </Text>
              <Text className="text-sm text-gray-300 mt-1">Entries</Text>
            </View>
            <View className="w-px h-12 bg-gray-600" />
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-green-400">
                {stats?.positivePercent}%
              </Text>
              <Text className="text-sm text-gray-300 mt-1">Positive</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mt-8">
        <Text className="text-xl font-bold text-white mb-4">Quick Actions</Text>

        <QuickActionCard
          icon="create-outline"
          title="Write Journal Entry"
          description="Express your thoughts and feelings"
          color="#A855F7"
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
          href="/history"
        />
      </View>
    </ScrollView>
  );
};

export default home;
