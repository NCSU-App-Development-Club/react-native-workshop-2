import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

export default function App() {

  const [topStoryIds, setTopStoryIds] = useState<number[]>([]);
  const [error, setError] = useState<boolean>(false);
  const limit = 10;

  async function getTopStoryIds() {
    setError(false);
    try {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
      const data = await res.json();
      setTopStoryIds(data);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    getTopStoryIds();
  }, [])

  return (
    <View style={styles.container}>
      {
        topStoryIds.slice(0, limit).map((storyId) => {
          return <Text key={storyId}>{storyId}</Text>;
        })
      }
      <Text key="error">{error && "Error fetching top items."}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS == "android" ? Dimensions.get('window').height : Dimensions.get('window').height - Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    top: Constants.statusBarHeight,
  },
});
