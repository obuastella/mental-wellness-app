import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Client, Account, ID } from "react-native-appwrite";
import { router } from "expo-router";
import { useRouter } from "expo-router";

// Initialize Appwrite
const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your endpoint
  .setProject("685ae1000013f6625103") // Your Project ID
  .setPlatform("prosit"); // Your package name

const account = new Account(client);

const { height } = Dimensions.get("window");

// Define types for form data
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define types for InputField props
interface InputFieldProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
}

// Move InputField component outside of the main component to prevent recreation
const InputField: React.FC<InputFieldProps> = React.memo(
  ({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    rightIcon,
    onRightIconPress,
    keyboardType = "default",
  }) => (
    <View className="mb-4">
      <Text className="text-gray-700 text-sm font-medium mb-2">{label}</Text>
      <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
        <Ionicons name={icon} size={20} color="#9CA3AF" className="mr-3" />
        <TextInput
          style={{ flex: 1, color: "#111", fontSize: 16 }}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
);

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Use useCallback to prevent function recreation on every render
  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Memoize individual input handlers
  const handleFullNameChange = useCallback(
    (value: string) => {
      handleInputChange("fullName", value);
    },
    [handleInputChange]
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      handleInputChange("email", value);
    },
    [handleInputChange]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      handleInputChange("password", value);
    },
    [handleInputChange]
  );

  const handleConfirmPasswordChange = useCallback(
    (value: string) => {
      handleInputChange("confirmPassword", value);
    },
    [handleInputChange]
  );

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleRegister = async (): Promise<void> => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!email || !password || !fullName) {
      alert("Error: Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Error: Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Error: Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
      console.log("✅ Account created:", newAccount);

      // 🚫 End the session if auto-logged in
      try {
        await account.deleteSession("current");
        console.log("🛑 Auto-session deleted after registration");
      } catch (err) {
        console.log("⚠️ No active session to delete or already deleted");
      }

      alert(
        "Registration Successful! You can now log in with your credentials."
      );
      router.replace("/"); // redirect to login
    } catch (error: any) {
      console.error("❌ Registration error:", error);

      if (error.code === 409) {
        alert("Error: An account with this email already exists");
      } else if (error.code === 400) {
        alert("Error: Invalid email or password format");
      } else {
        alert(`Registration Failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = useCallback(() => {
    router.replace("/");
  }, [router]);

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
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          className="flex-1 justify-center items-center px-8"
          style={{ minHeight: height * 0.4 }}
        >
          <View className="bg-white/10 backdrop-blur-sm rounded-full p-10 mb-6 shadow-lg">
            <Ionicons
              className="mt-4 mx-auto"
              name="person-add-outline"
              size={72}
              color="white"
            />
          </View>
          <Text className="text-white text-4xl text-center font-black mb-2 tracking-wider">
            Sign Up
          </Text>
          <Text className="text-white/90 text-lg text-center leading-6 max-w-sm m-auto">
            Join PROSIT and start your wellness journey
          </Text>
        </LinearGradient>

        {/* Form */}
        <View
          className="flex-1 bg-white px-8 py-10"
          style={{ minHeight: height * 0.6 }}
        >
          {/* Full Name */}
          <InputField
            label="Full Name"
            icon="person-outline"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={handleFullNameChange}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            icon="mail-outline"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />

          {/* Password */}
          <InputField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={toggleShowPassword}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
            rightIcon={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={toggleShowConfirmPassword}
          />

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            className={`bg-primary rounded-xl py-4 mt-4 ${
              isLoading ? "opacity-70" : ""
            }`}
            style={styles.shadow}
          >
            <View className="flex-row items-center justify-center">
              {isLoading && (
                <Ionicons
                  name="hourglass-outline"
                  size={20}
                  color="white"
                  className="mr-2"
                />
              )}
              <Text className="text-white text-lg font-semibold">
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text className="text-primary font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
