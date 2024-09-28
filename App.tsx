import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    height: Platform.OS == "android" ? Dimensions.get('window').height : Dimensions.get('window').height - Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    top: Constants.statusBarHeight,
  },
});
