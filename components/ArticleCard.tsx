import { Text, Linking } from 'react-native'
import { useState, useEffect } from 'react'

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

    const [articleInfo, setArticleInfo] = useState<Item | any>({});
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
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL(articleInfo.url)}>
                {articleInfo.title + "\n"}
            </Text>
        </>
    )
}