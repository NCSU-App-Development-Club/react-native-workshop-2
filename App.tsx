import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

import ArticleCard from './components/ArticleCard';

export default function App() {

  const [topItemIds, setTopItemIds] = useState([]);
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
      <Text style={styles.heading}>Top 10 from HackerNews</Text>
      {
        topItemIds.slice(0, limit).map((itemId) => {
          return <ArticleCard itemId={itemId}/>
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
    height: Platform.OS == "android" ? Dimensions.get('window').height : Dimensions.get('window').height - Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    top: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  }
});
