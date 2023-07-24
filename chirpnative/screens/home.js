import React from 'react'
import {SafeAreaView,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import HomeComponents from '../components/homeComponents'
import Header from '../components/header'
import axios from "axios";
import { useState,useEffect } from 'react'
import useApp from '../hooks/useApp';

const Home = () => {
  const [newsItems,setNewsItems] = useState([])

  const { token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const submit = async () => {
    try {
      const response = await axios.get('api/v1/news/getTopStories');
      setNewsItems(response.data.articles);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } 
    }
  };

 useEffect(() => {
  submit()
 },[])
 
  return (
    <SafeAreaView style={styles.container}> 
       <Header title={'Home'} /> 
        {
          newsItems.length > 0?( 
          <ScrollView>
            <HomeComponents data={newsItems} />
            </ScrollView> ):<ActivityIndicator size="large" color="black" style={{marginTop:'70%'}}/>
        }       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
    }
})

export default Home