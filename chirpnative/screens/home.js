import React from 'react'
import {SafeAreaView,ScrollView} from 'react-native'
import HomeComponents from '../components/homeComponents'
import Header from '../components/header'
//import { newsItems } from '../mockdata/newsitems'
import axios from "axios";
import { useState,useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };

  const [newsItems,setNewsItems] = useState([])

  const submit = async () => {
    try {
      //const token = await AsyncStorage.getItem('token');
      //const response = await axios.get('api/v1/news/getTopStories');
      //setNewsItems(response.data.articles);
      console.log(getToken());
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  };

  useEffect(() => {
    submit()
  }, []);

  // use effect to get the data 
  // loading indicator
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