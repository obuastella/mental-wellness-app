// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions,
// } from "react-native";
// import React, { useState } from "react";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { StatusBar } from "expo-status-bar";
// import { account } from "@/lib/appwrite";
// import { ID } from "react-native-appwrite";

// const { height } = Dimensions.get("window");

// export default function Register() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };
//   const isValidEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // const handleRegister = async () => {
//   //   const { fullName, email, password, confirmPassword } = formData;

//   //   if (!fullName || !email || !password || !confirmPassword) {
//   //     alert("Please fill in all fields");
//   //     return;
//   //   }
//   //   if (!isValidEmail(email)) {
//   //     alert("Please enter a valid email address");
//   //     return;
//   //   }

//   //   if (password !== confirmPassword) {
//   //     alert("Passwords do not match");
//   //     return;
//   //   }

//   //   if (password.length < 6) {
//   //     alert("Password must be at least 6 characters long");
//   //     return;
//   //   }

//   //   setIsLoading(true);
//   //   setTimeout(() => {
//   //     setIsLoading(false);
//   //     alert("Registration successful!");
//   //     // router.replace("/(tabs)");
//   //   }, 1500);
//   // };
//   const handleRegister = async () => {
//     const { fullName, email, password, confirmPassword } = formData;

//     if (!email || !password || !fullName) {
//       alert("Error: Please fill in all fields");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Generate a valid userId (max 36 chars, alphanumeric + . - _)
//       const generateValidUserId = () => {
//         const timestamp = Date.now().toString();
//         const randomStr = Math.random().toString(36).substring(2, 8);
//         return `user_${timestamp}_${randomStr}`.substring(0, 36);
//       };

//       // Step 1: Create the account with a valid userId
//       const newAccount = await account.create(
//         generateValidUserId(), // Use custom ID generator instead of ID.unique()
//         email,
//         password,
//         fullName
//       );
//       console.log("Account created:", newAccount);

//       // Step 2: Create a session to send verification email
//       const session = await account.createSession(email, password);
//       console.log("Session created for verification");

//       // Step 3: Send verification email
//       await account.createVerification("http://localhost:8081/verify");
//       console.log("Verification email sent");

//       // Step 4: Delete the session so user must verify before accessing app
//       await account.deleteSession(session.$id);
//       console.log("Session deleted - user must verify to login");

//       alert(
//         "Registration Successful! Please check your email and click the verification link before logging in."
//       );

//       // Navigate to a page that tells them to check email
//       router.push("/verify");
//     } catch (error: any) {
//       console.error("Registration error:", error);

//       if (error.code === 409) {
//         alert("Error: An account with this email already exists");
//       } else if (error.code === 400) {
//         alert("Error: Invalid email or password format");
//       } else {
//         alert(`Registration Failed: ${error.message}`);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const testEmailService = async () => {
//     try {
//       const result = await account.createVerification(
//         "https://localhost:3000/verify"
//       );
//       console.log("Test email sent:", result);
//       alert("Test email sent! Check your inbox and console logs.");
//     } catch (error: any) {
//       console.error("Test email failed:", error);
//       alert(`Email service error: ${error.message}`);
//     }
//   };
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       className="flex-1 bg-black"
//     >
//       <StatusBar style="light" />
//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <LinearGradient
//           colors={["#667eea", "#764ba2"]}
//           className="flex-1 justify-center items-center px-8"
//           style={{ minHeight: height * 0.4 }}
//         >
//           <View className=" bg-white/10 backdrop-blur-sm rounded-full p-10 mb-6 shadow-lg">
//             <Ionicons
//               className="mt-4 mx-auto"
//               name="person-add-outline"
//               size={72}
//               color="white"
//             />
//           </View>
//           <Text className="text-white text-4xl text-center font-black mb-2 tracking-wider">
//             Sign Up
//           </Text>
//           <Text className="text-white/90 text-lg text-center leading-6 max-w-sm m-auto">
//             Join PROSIT and start your wellness journey
//           </Text>
//         </LinearGradient>

//         {/* Form */}
//         <View
//           className="flex-1 bg-white px-8 py-10"
//           style={{ minHeight: height * 0.6 }}
//         >
//           {/* Full Name */}
//           <InputField
//             label="Full Name"
//             icon="person-outline"
//             placeholder="Enter your full name"
//             value={formData.fullName}
//             onChangeText={(val: any) => handleInputChange("fullName", val)}
//           />

//           {/* Email */}
//           <InputField
//             label="Email Address"
//             icon="mail-outline"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChangeText={(val: any) => handleInputChange("email", val)}
//             keyboardType="email-address"
//           />

//           {/* Password */}
//           <InputField
//             label="Password"
//             icon="lock-closed-outline"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChangeText={(val: any) => handleInputChange("password", val)}
//             secureTextEntry={!showPassword}
//             rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
//             onRightIconPress={() => setShowPassword(!showPassword)}
//           />

//           {/* Confirm Password */}
//           <InputField
//             label="Confirm Password"
//             icon="lock-closed-outline"
//             placeholder="Confirm your password"
//             value={formData.confirmPassword}
//             onChangeText={(val: any) =>
//               handleInputChange("confirmPassword", val)
//             }
//             secureTextEntry={!showConfirmPassword}
//             rightIcon={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
//             onRightIconPress={() =>
//               setShowConfirmPassword(!showConfirmPassword)
//             }
//           />
//           <TouchableOpacity onPress={testEmailService}>
//             <Text>Test Email</Text>
//           </TouchableOpacity>

//           {/* Register Button */}
//           <TouchableOpacity
//             onPress={handleRegister}
//             disabled={isLoading}
//             className={`bg-primary rounded-xl py-4 mt-4 ${
//               isLoading ? "opacity-70" : ""
//             }`}
//             style={styles.shadow}
//           >
//             <View className="flex-row items-center justify-center">
//               {isLoading && (
//                 <Ionicons
//                   name="hourglass-outline"
//                   size={20}
//                   color="white"
//                   className="mr-2"
//                 />
//               )}
//               <Text className="text-white text-lg font-semibold">
//                 {isLoading ? "Creating Account..." : "Create Account"}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           {/* Footer */}
//           <View className="flex-row justify-center mt-6">
//             <Text className="text-gray-600">Already have an account? </Text>
//             <TouchableOpacity onPress={() => router.replace("/")}>
//               <Text className="text-primary font-semibold">Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // Reusable InputField Component
// const InputField = ({
//   label,
//   icon,
//   placeholder,
//   value,
//   onChangeText,
//   secureTextEntry,
//   keyboardType,
//   rightIcon,
//   onRightIconPress,
// }: any) => (
//   <View className="mb-5">
//     <Text className="text-gray-700 text-sm font-medium mb-2 ml-1">{label}</Text>
//     <View className="bg-gray-50 rounded-xl border border-gray-200 flex-row items-center px-4 py-4">
//       <Ionicons name={icon} size={20} color="#9CA3AF" />
//       <TextInput
//         className="flex-1 ml-3 text-gray-800 text-base"
//         placeholder={placeholder}
//         placeholderTextColor="#9CA3AF"
//         value={value}
//         onChangeText={onChangeText}
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         autoCapitalize="none"
//       />
//       {rightIcon && (
//         <TouchableOpacity onPress={onRightIconPress} className="ml-2">
//           <Ionicons name={rightIcon} size={20} color="#9CA3AF" />
//         </TouchableOpacity>
//       )}
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: "#667eea",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
// });
import React, { useState } from "react";
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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Client, Account, ID } from "react-native-appwrite";
import { router } from "expo-router";
import { TextInput } from "react-native";

// Initialize Appwrite
const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your endpoint
  .setProject("685ae1000013f6625103") // Your Project ID
  .setPlatform("prosit"); // Your package name

const account = new Account(client);

const { height } = Dimensions.get("window");

export default function register() {
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
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    const { fullName, email, password, confirmPassword } = formData;

    // Validation
    if (!email || !password || !fullName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Create the account
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
      console.log("Account created:", newAccount);

      // Step 2: Create a session for verification
      const session = await account.createEmailPasswordSession(email, password);
      console.log("Session created for verification");

      // Step 3: Send verification email
      // await account.createVerification("http://localhost:8081/verify");
      await account.createVerification("prosit://verify");
      console.log("Verification email sent");

      // Step 4: Delete the session so user must verify before accessing app
      await account.deleteSession(session.$id);
      console.log("Session deleted - user must verify to login");

      Alert.alert(
        "Registration Successful!",
        "Please check your email and click the verification link before logging in.",
        [
          {
            text: "OK",
            onPress: () => router.push("/verify"),
          },
        ]
      );
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.code === 409) {
        Alert.alert("Error", "An account with this email already exists");
      } else if (error.code === 400) {
        Alert.alert("Error", "Invalid email or password format");
      } else {
        Alert.alert("Registration Failed", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    rightIcon,
    onRightIconPress,
    keyboardType = "default",
  }: any) => (
    <View className="mb-4">
      <Text className="text-gray-700 text-sm font-medium mb-2">{label}</Text>
      <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
        <Ionicons name={icon} size={20} color="#9CA3AF" className="mr-3" />
        <TextInput
          className="flex-1 text-gray-900 text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

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
            onChangeText={(val: any) => handleInputChange("fullName", val)}
          />

          {/* Email */}
          <InputField
            label="Email Address"
            icon="mail-outline"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(val: any) => handleInputChange("email", val)}
            keyboardType="email-address"
          />

          {/* Password */}
          <InputField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(val: any) => handleInputChange("password", val)}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(val: any) =>
              handleInputChange("confirmPassword", val)
            }
            secureTextEntry={!showConfirmPassword}
            rightIcon={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
            onRightIconPress={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
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
            <TouchableOpacity onPress={() => router.replace("/")}>
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
