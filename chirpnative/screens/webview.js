import React from 'react'
import SafeAreaView from 'react-native'
import Header from '../components/header'

const Webview = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'url'} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Webview