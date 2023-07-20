import React from 'react'
import {SafeAreaView,ScrollView,StyleSheet} from 'react-native'
import HomeComponents from '../components/homeComponents'
import Header from '../components/header'
import axios from "axios";
import { useState,useEffect } from 'react'
import useApp from '../hooks/useApp';



const Home = () => {

  const [newsItems,setNewsItems] = useState([])
  const { token, currentUser, setToken, setCurrentUser } = useApp();

  const submit = async () => {
    try {
      const response = await axios.get('api/v1/news/getTopStories');
      //setNewsItems(response.data.articles);
     // console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } 
    }
  };

  const getUserProfile = async () => {
    try{
      const response = await axios.get('api/v1/user/getUser');
       //setSessionUser(response.data)
       console.log(response.data.username);
    }catch(error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  }

 useEffect(()=>{
  //console.log({token, currentUser});
 },[])

 useEffect(() => {
  submit()
 },[])

  return (
    <SafeAreaView style={styles.container}> 
       <Header title={'Home'} />
        <ScrollView>
        <HomeComponents data={newsItems} />
        </ScrollView> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
    }
})

export default Home