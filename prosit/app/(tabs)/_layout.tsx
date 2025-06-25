import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A855F7", // Purple-500 to match the theme
        tabBarInactiveTintColor: "#6B7280", // Gray-500 for better contrast on dark
        tabBarStyle: {
          backgroundColor: "rgba(31, 41, 55, 0.8)", // Dark gray with transparency
          borderTopWidth: 1,
          borderTopColor: "rgba(75, 85, 99, 0.3)", // Subtle gray border
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 15,
          borderRadius: 20,
          marginHorizontal: 20,
          marginBottom: 20,
          position: "absolute",
          // Glass morphism effect
          backdropFilter: "blur(20px)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
        headerStyle: {
          backgroundColor: "#111827", // Dark background
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(75, 85, 99, 0.3)",
        },
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
          color: "#FFFFFF", // White text for dark theme
        },
        headerTintColor: "#A855F7", // Purple tint to match active tab
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
