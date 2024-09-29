import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

interface ArticleCardProps {
    itemId: number
}

interface Item {
    id: number,
    deleted?: boolean,
    type?: string,
    by?: string,
    time?: any,
    text?: string,
    dead?: boolean,
    parent?: number,
    poll?: number,
    kids?: number[],
    url?: string,
    score?: number,
    title?: string,
    parts?: any,
    descendants?: any
}

export default function ArticleCard(props: ArticleCardProps) {

    const [articleInfo, setArticleInfo] = useState<Item>();
    const [error, setError] = useState(false);

    async function getArticleInfo() {
        setError(false);
        try {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${props.itemId}.json?print=pretty`);
          const data = await res.json();
          setArticleInfo(data);
        } catch {
          setError(true);
        }
      }
    
      useEffect(() => {
        getArticleInfo();
      }, [])
    
    return (
        <>
            <View key={articleInfo?.id} style={styles.card}>
                <Text style={styles.text} onPress={() => WebBrowser.openBrowserAsync(articleInfo?.url || "")}>
                    {(articleInfo?.title || "Loading...")}
                </Text>
                <Text style={{color: 'gray', ...styles.text}}>
                    Author: {(articleInfo?.by || "")}
                </Text>
                <Text style={{color: 'gray', ...styles.text}}>
                    Upvotes: {(articleInfo?.score || "")}
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'orange',
        width: '80%',
        padding: 8,
        marginTop: 12,
    },
    text: {
        marginBottom: 8
    }
})