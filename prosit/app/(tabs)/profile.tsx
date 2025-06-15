//@ts-nocheck
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
import { Ionicons } from "@expo/vector-icons";

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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Manage your account settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Email Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.emailContainer}>
              <Ionicons
                name="mail"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <Text style={styles.emailText}>{email}</Text>
            </View>
          </View>
        </View>

        {/* Change Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>

          {/* Current Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Current Password</Text>
            <View style={styles.passwordInputContainer}>
              <Ionicons
                name="lock-closed"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showPasswords.current}
                placeholderTextColor="#6B7280"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility("current")}
              >
                <Ionicons
                  name={showPasswords.current ? "eye" : "eye-off"}
                  size={20}
                  color="#A855F7"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.passwordInputContainer}>
              <Ionicons
                name="lock-closed"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPasswords.new}
                placeholderTextColor="#6B7280"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility("new")}
              >
                <Ionicons
                  name={showPasswords.new ? "eye" : "eye-off"}
                  size={20}
                  color="#A855F7"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <View style={styles.passwordInputContainer}>
              <Ionicons
                name="lock-closed"
                size={20}
                color="#6B7280"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPasswords.confirm}
                placeholderTextColor="#6B7280"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => togglePasswordVisibility("confirm")}
              >
                <Ionicons
                  name={showPasswords.confirm ? "eye" : "eye-off"}
                  size={20}
                  color="#A855F7"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            style={[
              styles.changePasswordButton,
              {
                backgroundColor:
                  currentPassword && newPassword && confirmPassword
                    ? "#A855F7"
                    : "#374151",
              },
            ]}
            onPress={handleChangePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword}
          >
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsSection}>
          <View style={styles.requirementsHeader}>
            <Ionicons name="information-circle" size={20} color="#A855F7" />
            <Text style={styles.requirementsTitle}>Password Requirements</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark" size={16} color="#10B981" />
            <Text style={styles.requirementText}>
              At least 6 characters long
            </Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark" size={16} color="#10B981" />
            <Text style={styles.requirementText}>
              Must not match current password
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
// export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    backgroundColor: "rgba(31, 41, 55, 0.95)",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(75, 85, 99, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  section: {
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB",
    marginBottom: 8,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(55, 65, 81, 0.8)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.5)",
  },
  emailText: {
    color: "#E5E7EB",
    fontSize: 16,
    marginLeft: 12,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(55, 65, 81, 0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.5)",
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  passwordInput: {
    flex: 1,
    color: "#E5E7EB",
    fontSize: 16,
    paddingVertical: 16,
  },
  eyeButton: {
    padding: 8,
    marginLeft: 8,
  },
  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    shadowColor: "#A855F7",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  requirementsSection: {
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  requirementsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A855F7",
    marginLeft: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: "#D1D5DB",
    marginLeft: 12,
  },
});
