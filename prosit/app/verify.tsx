import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

export default function VerifyEmailScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Set up listener to automatically check when user becomes verified
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUserEmail(user.email);

        // Reload user to get latest verification status
        await user.reload();

        if (user.emailVerified) {
          // Automatically redirect when verified
          Alert.alert(
            "Email Verified!",
            "Your email has been verified successfully. Welcome!",
            [{ text: "Continue", onPress: () => router.replace("/(tabs)") }]
          );
        }
      }
    });

    // Check every 3 seconds if user is verified (optional polling)
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          router.replace("/(tabs)");
        }
      }
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const resendVerification = async () => {
    setIsLoading(true);
    alert("Check your mail, or spam");
    try {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        Alert.alert(
          "Success",
          "Verification email sent again! Check your inbox."
        );
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
    setIsLoading(false);
  };

  const checkVerificationManually = async () => {
    router.replace("/register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Email</Text>

      <Text style={styles.message}>We've sent a verification link to:</Text>

      <Text style={styles.email}>{userEmail}</Text>

      <Text style={styles.instructions}>
        Click the link in your email to verify your account. Once verified,
        you'll be automatically redirected.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Change Email"
          onPress={checkVerificationManually}
          disabled={isLoading}
        />

        <View style={styles.buttonSpacing} />

        <Button
          title="Resend Email"
          onPress={resendVerification}
          disabled={isLoading}
          color="orange"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
  },
  email: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#007AFF",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacing: {
    height: 15,
  },
});
