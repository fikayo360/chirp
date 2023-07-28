
import React from 'react'
import {StyleSheet,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl} from 'react-native'
import NewscategoryItems from '../components/newscategoryItems'
import { useState,useEffect,useCallback } from "react"
import Header from '../components/header'
import axios from "axios";
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp'


const Newscategory = ({route}) => {
  const {cat} = route.params
  const [data,setData]= useState([])
  const [refreshing, setRefreshing] = useState(false);
  const { token} = useApp();
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

  const submit = async () => {
    try {
      const response = await axios.get(`api/v1/news/getNewsCategory/${cat}`);
      console.log(response.data.articles);
      setData(response.data);
      setLoading(false)
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        console.log(error.response.data);
        setLoading(false)
      } 
    }
  };

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
        <Header title={cat} />
        {data.length > 0 && (
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <NewscategoryItems data={data} />
          </ScrollView>
        )}
    </SafeAreaView>
  
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Newscategory