import React from 'react'
import {SafeAreaView,ScrollView} from 'react-native'
import HomeComponents from '../components/homeComponents'
import Header from '../components/header'
import { newsItems } from '../mockdata/newsitems'

const Home = () => {
  return (
    <SafeAreaView> 
       
       <Header title={'Home'} />
        <ScrollView>
        <HomeComponents data={newsItems} />
        </ScrollView>
      
    </SafeAreaView>
  )
}

export default Home