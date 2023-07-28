import React from 'react'
import {SafeAreaView,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import HomeComponents from '../components/homeComponents'
import Header from '../components/header'
import axios from "axios";
import { useState,useEffect,useCallback } from 'react'
import { RefreshControl } from "react-native";
import useApp from '../hooks/useApp';
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';

const Home = () => {
  const [newsItems,setNewsItems] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const { token} = useApp();
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const submit = async () => {
    try {
      const response = await axios.get('api/v1/news/getTopStories');
      setNewsItems(response.data);
      console.log(response.data);
      setLoading(false)
    } catch (error) {
      if (error.response.data) {
        setError(error.response.data)
        setLoading(false)
        console.log(error.response.data);
      } 
    }
  };

  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

  const onRefresh = useCallback(async()=>{
    setLoading(true)
    setRefreshing(true);
    submit()
    setRefreshing(false);
  },[])

 useEffect(() => {
  submit()
 },[])

  return (
    
    <SafeAreaView style={styles.container}> 
      {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
      {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
      
       <Header title={'Home'} /> 
        {
          newsItems.length > 0 && ( 
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <HomeComponents data={newsItems} />
            </ScrollView> )
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