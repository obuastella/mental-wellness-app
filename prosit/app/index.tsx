import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { account } from "@/lib/appwrite";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get();
        // If this succeeds, session exists
        console.log("✅ Session active. Redirecting to home.");
        router.replace("/(tabs)/home");
      } catch (error) {
        console.log("No active session, stay on login.");
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Error:  Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      // 🔐 Attempt to create a session
      const session = await account.createEmailPasswordSession(email, password);
      console.log("✅ Logged in:", session);

      // 🎯 Navigate to your home screen
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("❌ Login error:", error);

      if (error.code === 401) {
        // Unauthorized: likely wrong password
        alert(
          "Invalid email or password. If you don't have an account, please register."
        );
      } else {
        alert(`Login Error", ${error.message} || "Something went wrong`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <StatusBar style="light" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient Background */}
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          className="flex-1 justify-center items-center px-8"
          style={{ minHeight: height * 0.45 }}
        >
          {/* Brain Icon */}
          <View className=" bg-white/10 backdrop-blur-sm rounded-full p-10 mb-8 shadow-lg">
            <Ionicons
              className="mt-4 mx-auto"
              name="bulb-outline"
              size={72}
              color="white"
            />
          </View>

          {/* App Name */}
          <Text className="text-white text-5xl font-black mb-4 tracking-widest text-center">
            PROSIT
          </Text>
          <Text className="text-white/90 text-xl text-center leading-7 max-w-sm m-auto">
            Your AI-Powered Mental Wellness Companion
          </Text>
        </LinearGradient>

        {/* Login Form */}
        <View
          className="flex-1 bg-white px-8 py-8"
          style={{ minHeight: height * 0.55 }}
        >
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-600 text-base">
              Sign in to continue your wellness journey
            </Text>
          </View>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">
              Email Address
            </Text>
            <View className="bg-gray-50 rounded-xl border border-gray-200 flex-row items-center px-4 py-4">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-gray-800 text-base"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">
              Password
            </Text>
            <View className="bg-gray-50 rounded-xl border border-gray-200 flex-row items-center px-4 py-4">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-gray-800 text-base"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end mb-8">
            <Text className="text-primary text-sm font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`bg-primary rounded-xl py-4 mb-6 ${isLoading ? "opacity-70" : ""}`}
            style={{
              shadowColor: "#667eea",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <View className="flex-row items-center justify-center">
              {isLoading && (
                <View className="mr-3">
                  <Ionicons name="hourglass-outline" size={20} color="white" />
                </View>
              )}
              <Text className="text-white text-lg font-semibold">
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-base">
              Don't have an account?{" "}
            </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text className="text-primary font-semibold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
