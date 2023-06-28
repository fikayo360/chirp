import React from 'react'
import {SafeAreaView,StyleSheet,View,ScrollView} from 'react-native'
import Header from '../components/header'
import Wallcomponents from '../components/wallcomponents'
import {wallItems} from '../mockdata/wallcomponents'

const Wall = () => {
  return (
    <SafeAreaView>
      <Header title={'Wall'} />
      <View style={styles.container}>
      <ScrollView>
      <Wallcomponents data={wallItems} />
      </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
   width:'100%'
  }
})

export default Wall