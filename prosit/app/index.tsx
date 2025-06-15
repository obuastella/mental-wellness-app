import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-primary"> stella</Text>
      <Link href="/(tabs)">dashboard</Link>
      <Link href="/register">dont have an account register</Link>
    </View>
  );
}
