import React from 'react'
import {View,Text,SafeAreaView,ScrollView} from 'react-native'
import Header from '../components/header'
import Savedposts from '../components/savedposts'
import { savedComponents } from '../mockdata/savedComponents'

const Savedpost = () => {
  return (
    <SafeAreaView>
      <Header title={'saved posts'} />
        <ScrollView>
        <Savedposts data={savedComponents} />
        </ScrollView>
    </SafeAreaView>
  )
}

export default Savedpost