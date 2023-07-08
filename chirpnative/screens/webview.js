import React from 'react'
import {StyleSheet,SafeAreaView} from 'react-native'
import Header from '../components/header'
import { WebView } from 'react-native-webview';

const Webview = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'url'} />
        <WebView source={{ uri: 'https://news.google.com/rss/articles/CBMisQFodHRwczovL2FmcmljYW4uYnVzaW5lc3MvMjAyMy8wNy9hcG8tbmV3c2ZlZWQvYS1tb2RlbC1mb3ItYWZyaWNhLWNvdGUtZGl2b2lyZS1oZWFsdGgtbWluaXN0cnktYW5ub3VuY2VzLW5ldy1pbml0aWF0aXZlLXRvLWJlY29tZS1zZWxmLXN1ZmZpY2llbnQtaW4tcGFlZGlhdHJpYy1jYXJkaW9sb2d5LXN1cmdlcnnSAQA?oc=5' }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Webview