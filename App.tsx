import React from "react";
import { StatusBar, StyleSheet, useColorScheme, View, Text } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/components/HomeScreen";
import LoginScreen from "./src/components/LoginScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import Bingo from "./src/components/BingoGrid";
import RankingScreen from "./src/components/RankingScreen";
import Sezony from "./src/json/Motywy.json";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Bingo: { Id_uzyt: number };
  Ranking: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function getSeasonBackground(): string {
  const month = new Date().getMonth();
  if (month === 0 || month === 1 || month === 11) return Sezony.Zima[0].Tlo;
  if (month >= 2 && month <= 4) return Sezony.Wiosna[0].Tlo;
  if (month >= 5 && month <= 7) return Sezony.Lato[0].Tlo;
  return Sezony.Jesien[0].Tlo;
}

function AppContent() {
  const isDarkMode = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();
  const Bg = getSeasonBackground();

  const styles = StyleSheet.create({
    Page: {
      flex: 1,
      backgroundColor: Bg,
    },
    Author: {
      marginLeft: 5,
      marginBottom: 10,
      fontFamily: "FunnelSans-Regular",
    },
    AuthorView: {
      alignItems: "flex-start",
      justifyContent: "flex-end",
      padding: 5,
    },
  });

  return (
    <View
      style={[
        styles.Page,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Bingo" component={Bingo} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
      </Stack.Navigator>

      <View style={styles.AuthorView}>
        <Text style={styles.Author}>Kremiffyn</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}