import React from 'react'
import {SafeAreaView,StyleSheet,View,ScrollView,Text} from 'react-native'
import Header from '../components/header'
import Wallcomponents from '../components/wallcomponents'
import axios from 'axios'
import { useState,useEffect } from 'react'


const Wall = () => {

  const [items,setItems] = useState([])
  const [error,setError] = useState("")
 
  const getFriendsPost = async () => {
    try {
      const response = await axios.get('api/v1/post/getFriendsPost',{
        headers: {
          'If-Modified-Since': null,
        },
      })
      console.log(response.data);
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

  return (
    <SafeAreaView style={styles.container}>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
      <Header title={'Wall'} />
      <View style={styles.container}>
      <ScrollView>
      <Wallcomponents data={items} likePost={likePost} savePost={savePost}/>
      </ScrollView>
      </View>
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
   position:'relative'
  }
})

export default Wall