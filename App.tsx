/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Bingo from './src/components/BingoGrid';
function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

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
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Bingo />
      <View style={styles.AuthorView}>
        <Text style={styles.Author}>Kremiffyn</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Page: {
    flex: 1,
    backgroundColor: '#c5e4ff',
  },
  Author: {
    marginLeft: 5,
    marginBottom: 10,
    fontFamily: 'FunnelSans-Regular',
  },
  AuthorView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default App;
