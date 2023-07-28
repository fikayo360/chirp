import React from 'react'
import {View,Text,SafeAreaView,ScrollView,StyleSheet,ActivityIndicator,RefreshControl} from 'react-native'
import Header from '../components/header'
import Savedposts from '../components/savedposts'
import { useState,useEffect,useCallback } from 'react'
import axios from 'axios'
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp'

const Savedpost = () => {

  const {token} = useApp();
  const [items,setItems] = useState([])
  const [error,setError] = useState("")
  const [notification,setNotification] = useState("")
  const [refreshing, setRefreshing] = useState(false);
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

const getSavedPost = async () => {
  try {
    const response = await axios.get('api/v1/savedPost/getSavedPosts')
    if(response.data === 'no posts found'){
      setNotification('no posts found')
      setLoading(false)
      return
    }
    setItems(response.data)
    setLoading(false)
    console.log(items);
  } catch (error) {
    if (error.response) {
      setError(error.response.data)
      setLoading(false)
    } 
  }
};

const deleteSavedPost = async (id) => {
  try {
    const response = await axios.delete(`api/v1/savedPost/deleteSavedPost/${id}`)
    console.log(response.data);
    setItems(items => items.filter(item => item.id !== id));
    setNotification(response.data)
  } catch (error) {
    if (error.response) {
      setError(error.response.data)
    } 
  }
 }

 const onRefresh = useCallback(async()=>{
  setLoading(true)
  setRefreshing(true);
  getSavedPost()
  setRefreshing(false);
},[])

useEffect(()=>{
  getSavedPost()
},[])
const flattenedArray = [].concat(...items);

return (
  <SafeAreaView style={styles.container}>
     {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
      {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
    <Header title={'SavedPosts'} />
    {items.length > 0 && (<ScrollView style={styles.friendsComponent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <Savedposts data={flattenedArray} deleteSavedPost={deleteSavedPost}/>
    </ScrollView>)
    }
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
    width:'100%',
    height:'100%',
    position:'relative'
   },
   friendsComponent:{
     width:'100%',
     height:'80%'
   }
})

export default Savedpost