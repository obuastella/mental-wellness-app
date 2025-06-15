import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";

const Profile = () => {
  const [email] = useState("user@example.com"); // This would come from your auth state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChangePassword = () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password don't match");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long");
      return;
    }

    // Here you would integrate with your authentication service
    Alert.alert("Success", "Password changed successfully!", [
      {
        text: "OK",
        onPress: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      },
    ]);
  };

  const togglePasswordVisibility = (type: any) => {
    setShowPasswords((prev: any) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View className="bg-white px-6 pt-20 pb-4 shadow-sm">
        <Text className="text-3xl font-bold text-gray-800">Profile</Text>
        <Text className="text-gray-600 mt-1">Manage your account settings</Text>
      </View>

      <ScrollView
        className="flex-1 px-6 mt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Email Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </Text>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              Email Address
            </Text>
            <View className="bg-gray-100 rounded-lg px-4 py-3">
              <Text className="text-gray-700">{email}</Text>
            </View>
          </View>
        </View>

        {/* Change Password Section */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Change Password
          </Text>

          {/* Current Password */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              Current Password
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-gray-50"
                placeholder="Enter current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showPasswords.current}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                className="ml-3 px-3 py-2"
                onPress={() => togglePasswordVisibility("current")}
              >
                <Text className="text-blue-500 text-sm font-medium">
                  {showPasswords.current ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              New Password
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-gray-50"
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPasswords.new}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                className="ml-3 px-3 py-2"
                onPress={() => togglePasswordVisibility("new")}
              >
                <Text className="text-blue-500 text-sm font-medium">
                  {showPasswords.new ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              Confirm New Password
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 bg-gray-50"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPasswords.confirm}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                className="ml-3 px-3 py-2"
                onPress={() => togglePasswordVisibility("confirm")}
              >
                <Text className="text-blue-500 text-sm font-medium">
                  {showPasswords.confirm ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            className={`py-3 rounded-lg ${
              currentPassword && newPassword && confirmPassword
                ? "bg-blue-500 active:bg-blue-600"
                : "bg-gray-300"
            }`}
            onPress={handleChangePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword}
          >
            <Text
              className={`text-center font-semibold ${
                currentPassword && newPassword && confirmPassword
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Change Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Password Requirements */}
        <View className="bg-blue-50 rounded-xl p-4 mb-6">
          <Text className="text-sm font-medium text-blue-800 mb-2">
            Password Requirements:
          </Text>
          <Text className="text-sm text-blue-700">
            • At least 6 characters long
          </Text>
          <Text className="text-sm text-blue-700">
            • Must not match current password
          </Text>
        </View>

        <View className="h-6" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
