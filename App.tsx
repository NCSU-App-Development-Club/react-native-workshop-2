import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';

import ArticleCard from './components/ArticleCard';

export default function App() {

  const [topItemIds, setTopItemIds] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(50);

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
      <Text style={styles.heading}>HackerNews</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {
          topItemIds.slice(0, limit).map((itemId) => {
            return <ArticleCard itemId={itemId}/>
          })
        }
      </ScrollView>
      
      <Text>{error && "Error fetching top items."}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'beige',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS == "android" ? Dimensions.get('window').height + Constants.statusBarHeight : Dimensions.get('window').height - Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    top: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 16,
    backgroundColor: 'orange',
    width: '100%',
    textAlign: 'center'
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center'
  }
});
