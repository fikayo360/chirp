import React from 'react'
import {SafeAreaView,ScrollView,StyleSheet,Dimensions,ActivityIndicator,RefreshControl} from 'react-native'
import Header from '../components/header'
import Notifications from '../components/notifications'
import axios from 'axios'
import { useState,useEffect,useCallback } from 'react'
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp'

const AppNotifications = () => {
  const {token} = useApp();
  const [items,setItems] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [loading,setLoading] = useState(true)
  const windowWidth = Dimensions.get('window').width;

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])
  
  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

const getNotifications = async () => {
  try {
    const response = await axios.get('api/v1/notification/getAll')
    setItems(response.data)
    setLoading(false)
  } catch (error) {
    if (error.response) {
      setError(error.response.data)
      setLoading(false)
    } 
  }
};

useEffect(()=>{
  getNotifications()
},[])

const onRefresh = useCallback(async ()=>{
  setLoading(true)
  setRefreshing(true);
  getNotifications()
  setRefreshing(false);
},[])

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
     {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
    <Header title={'Notifications'}/>
    {items.length > 0 &&
    (<ScrollView style={styles.body} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Notifications data={items}/>
    </ScrollView>)}
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorContainer:{
    alignItems: 'center',
    marginTop:40,
    backgroundColor: 'rgb(15, 20, 25)',
    padding: 10,
    height: 40,
    position:"absolute",
    width:'90%',
    top:50,
    left:15,
    borderRadius:10
  },
  errorText:{
    fontSize: 15,
    color:'white'
  },
  container:{
    flex:1,
  },
  body:{
    height:'90%',
    width:'100%'
  }
})

export default AppNotifications