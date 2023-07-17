import React from 'react'
import {StyleSheet,SafeAreaView} from 'react-native'
import Header from '../components/header'
import { WebView } from 'react-native-webview';
import { useEffect } from 'react';

const Webview = ({route}) => {
  const {url} = route.params
 
  return (
    <SafeAreaView style={styles.container}>
        <WebView source={{ uri:url }} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Webview