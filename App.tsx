import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

export default function App() {

  const [topItemids, setTopItemIds] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(10);

  async function getTopItemIds() {
    setError(false);
    try {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
      const data = await res.json();
      setTopItemIds(data);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    getTopItemIds();
  }, [])

  return (
    <View style={styles.container}>
      {
        topItemids.slice(0, limit).map((itemId) => {
          return <Text key={itemId}>{itemId}</Text>;
        })
      }
      <Text>{error && "Error fetching top items."}</Text>
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
