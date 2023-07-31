import React from 'react'
import {SafeAreaView,StyleSheet,View,ScrollView,Text,Dimensions,ActivityIndicator,RefreshControl} from 'react-native'
import Header from '../components/header'
import Wallcomponents from '../components/wallcomponents'
import axios from 'axios'
import { useState,useEffect,useCallback } from 'react'
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp'
import * as Font from 'expo-font'; 

const Wall = () => {
  const {token} = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [items,setItems] = useState([])
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

  const getFriendsPost = async () => {
    try {
      const response = await axios.get('api/v1/post/getFriendsPost')
      if(response.data === 'no posts found'){
        setNotification('no posts found')
      }
      setItems(response.data)
      setLoading(false)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
        setLoading(false)
      } 
    }
  };

  const likePost = 
    async({authorName,postId}) => {
      const formData = {authorName,postId};
      try{
        console.log(formData);
        const likePost = await axios.post('api/v1/post/LikePost', formData)
        if (likePost.data === 'Already liked post'){
          setNotification('Already liked post')
        }
        setNotification(likePost.data);
      }catch(error){
        if (error.response) {
          setError(error.response.data)
        } 
      }
    }
  

  const savePost = async ({ SavedPostImg, SavedPostAuthor, SavedPostTitle, SavedPostBody }) => {
    try {
      const formData = { SavedPostImg, SavedPostAuthor, SavedPostTitle, SavedPostBody };
      console.log(formData);
      const savedpost = await axios.post('api/v1/savedPost/createSavedPost', formData);
      setNotification("post saved");
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      }
    }
  };

 useEffect(() => {
  getFriendsPost()
 },[])

 const onRefresh = useCallback(async()=>{
  setLoading(true);
  setRefreshing(true);
  getFriendsPost()
  setRefreshing(false);
},[])

 const flattenedArray = [].concat(...items);
  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
      {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
      <Header title={'Wall'} />
     {items.length > 0 &&( 
     <ScrollView style={styles.scrollComponent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Wallcomponents data={flattenedArray} likePost={likePost} savePost={savePost}/>
      </ScrollView>)}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
  container:{
   flex: 1,
   position:'relative'
  },
  scrollComponent:{
    width:'100%',
    height:'80%'
  }
})

export default Wall