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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="book" size={32} color="#A855F7" />
            <Text style={styles.headerTitle}>My Journal</Text>
          </View>
          <View style={styles.entriesCounter}>
            <Text style={styles.entriesCountText}>
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </Text>
          </View>
        </View>
      </View>

      {/* New Entry Input */}
      <View style={styles.newEntryContainer}>
        <View style={styles.newEntryHeader}>
          <Ionicons name="add-circle" size={20} color="#A855F7" />
          <Text style={styles.newEntryTitle}>New Entry</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind today?"
            value={currentEntry}
            onChangeText={setCurrentEntry}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#6B7280"
          />
        </View>
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: currentEntry.trim()
                ? "#A855F7"
                : "rgba(75, 85, 99, 0.5)",
            },
          ]}
          onPress={addEntry}
          disabled={!currentEntry.trim()}
          activeOpacity={0.8}
        >
          <Ionicons
            name="send"
            size={16}
            color={currentEntry.trim() ? "#FFFFFF" : "#6B7280"}
          />
          <Text
            style={[
              styles.addButtonText,
              {
                color: currentEntry.trim() ? "#FFFFFF" : "#6B7280",
              },
            ]}
          >
            Add Entry
          </Text>
        </TouchableOpacity>
      </View>

      {/* Entries List */}
      <ScrollView
        style={styles.entriesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#374151" />
            <Text style={styles.emptyStateTitle}>No entries yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Start writing your first journal entry above
            </Text>
          </View>
        ) : (
          entries.map((entry: any, index: number) => (
            <View key={entry.id} style={styles.entryCard}>
              {/* Entry Header */}
              <View style={styles.entryHeader}>
                <View style={styles.entryDateContainer}>
                  <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.entryTime}>{entry.time}</Text>
                </View>
                <View style={styles.entryActions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => startEdit(entry.id, entry.text)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="create-outline" size={16} color="#A855F7" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteEntry(entry.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Entry Content */}
              {editingId === entry.id ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.editInput}
                    value={editingText}
                    onChangeText={setEditingText}
                    multiline
                    textAlignVertical="top"
                  />
                  <View style={styles.editActions}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={saveEdit}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={cancelEdit}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close" size={16} color="#FFFFFF" />
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text style={styles.entryText}>{entry.text}</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(31, 41, 55, 0.9)",
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 12,
  },
  entriesCounter: {
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  entriesCountText: {
    color: "#A855F7",
    fontSize: 12,
    fontWeight: "600",
  },
  newEntryContainer: {
    margin: 20,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  newEntryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  newEntryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  textInputContainer: {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.4)",
  },
  textInput: {
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: "#A855F7",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  entriesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    color: "#6B7280",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
  emptyStateSubtitle: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
  entryCard: {
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  entryDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  entryDate: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
    marginRight: 12,
  },
  entryTime: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
  },
  entryActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  deleteButton: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  editContainer: {
    marginTop: 8,
  },
  editInput: {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.4)",
  },
  editActions: {
    flexDirection: "row",
    marginTop: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10B981",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#6B7280",
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B7280",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 4,
  },
  entryText: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 24,
  },
});
