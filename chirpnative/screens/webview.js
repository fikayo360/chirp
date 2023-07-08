import React from 'react'
import {StyleSheet,SafeAreaView} from 'react-native'
import Header from '../components/header'
import { WebView } from 'react-native-webview';

const Webview = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'url'} />
        <WebView source={{ uri: 'https://news.google.com/rss/articles/CCAiC0JXUkpQandCR2xRmAEB?oc=5' }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Webview