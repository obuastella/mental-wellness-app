import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { account } from "../prosit/lib/appwrite";

export default function AppwriteTest() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendPing = async () => {
    setLoading(true);
    try {
      const response = await account.get();
      setResult("✅ Appwrite connected successfully!");
    } catch (error: any) {
      if (error.code === 401) {
        setResult("✅ Appwrite connected! (No user logged in)");
      } else {
        setResult(`❌ Error: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={sendPing}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Testing..." : "Send a ping"}
        </Text>
      </TouchableOpacity>

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#f02e65",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    fontSize: 16,
    textAlign: "center",
  },
});
