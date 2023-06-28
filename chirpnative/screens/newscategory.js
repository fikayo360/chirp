
import React from 'react'
import {StyleSheet,SafeAreaView,ScrollView} from 'react-native'
import NewscategoryItems from '../components/newscategoryItems'
import {newsItems} from '../mockdata/newsitems'
import { useState } from "react"
import Header from '../components/header'


const Newscategory = () => {
  const [data,setData]= useState(newsItems)
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'Category'} />
        <ScrollView>
        <NewscategoryItems data={data} />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Newscategory