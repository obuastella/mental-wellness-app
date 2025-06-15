// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const Register = () => {
//   return (
//     <View>
//       <Text>Register</Text>
//     </View>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({});
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.push("/") },
      ]);
    }, 2000);
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingTop: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center px-5 mb-10">
            <TouchableOpacity
              className="absolute top-0 left-5 z-10 p-2"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View className="bg-white/10 rounded-full p-5 mb-5">
              <Ionicons name="person-add-outline" size={60} color="white" />
            </View>

            <Text className="text-white text-3xl font-bold mb-2 text-center">
              Create Account
            </Text>
            <Text className="text-white/80 text-base text-center leading-6">
              Join PROSIT and start your wellness journey
            </Text>
          </View>

          {/* Form */}
          <View className="flex-1 bg-white rounded-t-3xl px-5 pt-10 pb-5">
            {/* Full Name Input */}
            <View className="flex-row items-center bg-gray-50 rounded-2xl mb-5 px-4 border border-gray-200">
              <Ionicons
                name="person-outline"
                size={20}
                color="#667eea"
                className="mr-3"
              />
              <TextInput
                className="flex-1 h-14 text-base text-gray-800 ml-3"
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={formData.fullName}
                onChangeText={(value) => handleInputChange("fullName", value)}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input */}
            <View className="flex-row items-center bg-gray-50 rounded-2xl mb-5 px-4 border border-gray-200">
              <Ionicons
                name="mail-outline"
                size={20}
                color="#667eea"
                className="mr-3"
              />
              <TextInput
                className="flex-1 h-14 text-base text-gray-800 ml-3"
                placeholder="Email Address"
                placeholderTextColor="#999"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center bg-gray-50 rounded-2xl mb-5 px-4 border border-gray-200">
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#667eea"
                className="mr-3"
              />
              <TextInput
                className="flex-1 h-14 text-base text-gray-800 ml-3 pr-12"
                placeholder="Password"
                placeholderTextColor="#999"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 p-1"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View className="flex-row items-center bg-gray-50 rounded-2xl mb-5 px-4 border border-gray-200">
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#667eea"
                className="mr-3"
              />
              <TextInput
                className="flex-1 h-14 text-base text-gray-800 ml-3 pr-12"
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                className="absolute right-4 p-1"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className={`rounded-2xl mt-3 mb-5 shadow-lg ${isLoading ? "opacity-70" : ""}`}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <LinearGradient
                colors={isLoading ? ["#ccc", "#999"] : ["#764ba2", "#667eea"]}
                className="h-14 rounded-2xl justify-center items-center"
              >
                {isLoading ? (
                  <View className="flex-row items-center">
                    <Text className="text-white text-lg font-semibold">
                      Creating Account...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white text-lg font-semibold">
                    Create Account
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <Text className="text-xs text-gray-500 text-center leading-5 mb-8">
              By creating an account, you agree to our{" "}
              <Text className="text-blue-600 font-medium">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-blue-600 font-medium">Privacy Policy</Text>
            </Text>

            {/* Login Link */}
            <View className="flex-row justify-center items-center mt-3">
              <Text className="text-base text-gray-500">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Text className="text-base text-blue-600 font-semibold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Register;

const styles = StyleSheet.create({});
