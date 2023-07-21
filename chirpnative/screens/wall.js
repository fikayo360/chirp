import React from 'react'
import {SafeAreaView,StyleSheet,View,ScrollView,Text,Dimensions} from 'react-native'
import Header from '../components/header'
import Wallcomponents from '../components/wallcomponents'
import axios from 'axios'
import { useState,useEffect } from 'react'
import useApp from '../hooks/useApp'

const Wall = () => {
  const {token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])
  const [items,setItems] = useState([])
  const [error,setError] = useState("")
  
  const getFriendsPost = async () => {
    try {
      const response = await axios.get('api/v1/post/getFriendsPost')
      setItems(response.data)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  const likePost = async ({authorName,postId}) => {
    const formData = {authorName,postId};
    try{
      console.log(formData);
      const likePost = await axios.post('api/v1/post/LikePost', formData)
      setError(likePost.data);
      setError('')
      return true
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
      setError(savedpost.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('An error occurred while saving the post.');
      }
    }
  };

 useEffect(() => {
  getFriendsPost()
 },[])

 const flattenedArray = [].concat(...items);
  return (
    <SafeAreaView style={styles.container}>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
      <Header title={'Wall'} />
     
      <ScrollView style={styles.scrollComponent}>
      <Wallcomponents data={flattenedArray} likePost={likePost} savePost={savePost}/>
      </ScrollView>
    
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
   flex: 1,
   position:'relative'
  },
  scrollComponent:{
    width:'100%',
    height:'80%'
  }
})

export default Wall