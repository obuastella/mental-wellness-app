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

const Journal = () => {
  const [entries, setEntries] = useState<any>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add new entry
  const addEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: any = {
        id: Date.now().toString(),
        text: currentEntry.trim(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry("");
    }
  };

  // Delete entry
  const deleteEntry = (id: any) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setEntries(entries.filter((entry: any) => entry.id !== id)),
        },
      ]
    );
  };

  // Start editing
  const startEdit = (id: any, text: any) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edit
  const saveEdit = () => {
    if (editingText.trim()) {
      setEntries(
        entries.map((entry: any) =>
          entry.id === editingId
            ? { ...entry, text: editingText.trim() }
            : entry
        )
      );
    }
    setEditingId(null);
    setEditingText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View className="pt-20 bg-white px-6 pb-4 shadow-sm">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          My Journal
        </Text>
        <Text className="text-gray-600">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </Text>
      </View>

      {/* New Entry Input */}
      <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-700 mb-3">
          New Entry
        </Text>
        <TextInput
          className="border border-gray-200 rounded-lg p-4 text-gray-700 min-h-[120px] bg-gray-50"
          placeholder="What's on your mind today?"
          value={currentEntry}
          onChangeText={setCurrentEntry}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          className={`mt-3 py-3 rounded-lg ${
            currentEntry.trim()
              ? "bg-blue-500 active:bg-blue-600"
              : "bg-gray-300"
          }`}
          onPress={addEntry}
          disabled={!currentEntry.trim()}
        >
          <Text
            className={`text-center font-semibold ${
              currentEntry.trim() ? "text-white" : "text-gray-500"
            }`}
          >
            Add Entry
          </Text>
        </TouchableOpacity>
      </View>

      {/* Entries List */}
      <ScrollView
        className="flex-1 px-4 mt-4"
        showsVerticalScrollIndicator={false}
      >
        {entries.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-400 text-lg">No entries yet</Text>
            <Text className="text-gray-400 text-center mt-2">
              Start writing your first journal entry above
            </Text>
          </View>
        ) : (
          entries.map((entry: any) => (
            <View
              key={entry.id}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              {/* Entry Header */}
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-gray-500 text-sm">{entry.date}</Text>
                  <Text className="text-gray-500 text-xs">{entry.time}</Text>
                </View>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    className="bg-blue-100 px-3 py-1 rounded-full"
                    onPress={() => startEdit(entry.id, entry.text)}
                  >
                    <Text className="text-blue-600 text-xs font-medium">
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-100 px-3 py-1 rounded-full"
                    onPress={() => deleteEntry(entry.id)}
                  >
                    <Text className="text-red-600 text-xs font-medium">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Entry Content */}
              {editingId === entry.id ? (
                <View>
                  <TextInput
                    className="border border-gray-200 rounded-lg p-3 text-gray-700 min-h-[100px] bg-gray-50"
                    value={editingText}
                    onChangeText={setEditingText}
                    multiline
                    textAlignVertical="top"
                  />
                  <View className="flex-row space-x-2 mt-3">
                    <TouchableOpacity
                      className="flex-1 bg-green-500 py-2 rounded-lg active:bg-green-600"
                      onPress={saveEdit}
                    >
                      <Text className="text-white text-center font-medium">
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 bg-gray-500 py-2 rounded-lg active:bg-gray-600"
                      onPress={cancelEdit}
                    >
                      <Text className="text-white text-center font-medium">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text className="text-gray-700 leading-6">{entry.text}</Text>
              )}
            </View>
          ))
        )}
        <View className="h-6" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Journal;

const styles = StyleSheet.create({});
