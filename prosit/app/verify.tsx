import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { account } from "../lib/appwrite";
import { router } from "expo-router";

export default function VerifyScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setIsLoading(true);

    try {
      // Get current user to get userId
      const user = await account.get();

      // Complete email verification with userId and secret
      await account.updateVerification(user.$id, verificationCode.trim());

      Alert.alert("Success!", "Your email has been verified successfully!", [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error: any) {
      console.error("Verification error:", error);

      if (error.code === 401) {
        Alert.alert(
          "Error",
          "Invalid or expired verification code. Please try again."
        );
      } else {
        Alert.alert("Error", `Verification failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      await account.createVerification("http://localhost:8081/verify");

      Alert.alert(
        "Success",
        "A new verification code has been sent to your email!"
      );
      setCountdown(60); // 60 second cooldown
    } catch (error: any) {
      console.error("Resend error:", error);
      Alert.alert("Error", `Failed to resend code: ${error.message}`);
    } finally {
      setIsResending(false);
    }
  };

  const checkVerificationStatus = async () => {
    try {
      const user = await account.get();
      if (user.emailVerification) {
        Alert.alert("Already Verified!", "Your email is already verified.", [
          {
            text: "Continue",
            onPress: () => router.replace("/(tabs)"),
          },
        ]);
      }
    } catch (error) {
      // User might not be logged in, ignore
      console.log("Not logged in or verification status check failed");
    }
  };

  // Check verification status when screen loads
  useEffect(() => {
    checkVerificationStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to your email address. Please enter the
          code below to verify your account.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={50}
        />

        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.disabledButton]}
          onPress={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Email</Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>

          <TouchableOpacity
            style={[
              styles.resendButton,
              (isResending || countdown > 0) && styles.disabledButton,
            ]}
            onPress={handleResendCode}
            disabled={isResending || countdown > 0}
          >
            {isResending ? (
              <ActivityIndicator size="small" color="#f02e65" />
            ) : (
              <Text style={styles.resendButtonText}>
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back to Register</Text>
        </TouchableOpacity>

        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            💡 Check your spam folder if you don't see the email
          </Text>
          <Text style={styles.helpText}>
            📧 Make sure to check the email you registered with
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  verifyButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#f02e65",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  resendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f02e65",
  },
  resendButtonText: {
    color: "#f02e65",
    fontSize: 14,
    fontWeight: "600",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "#f02e65",
    fontSize: 16,
  },
  helpContainer: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  helpText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 5,
  },
});
