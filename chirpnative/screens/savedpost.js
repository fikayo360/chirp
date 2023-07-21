import React from 'react'
import {View,Text,SafeAreaView,ScrollView,StyleSheet} from 'react-native'
import Header from '../components/header'
import Savedposts from '../components/savedposts'
import { useState,useEffect } from 'react'
import axios from 'axios'
import useApp from '../hooks/useApp'

const Savedpost = () => {

  const {token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const [items,setItems] = useState([])
  const [error,setError] = useState("")

const getSavedPost = async () => {
  try {
    const response = await axios.get('api/v1/savedPost/getSavedPosts')
    setItems(response.data)
    console.log(items);
  } catch (error) {
    if (error.response) {
      setError(error.response.data)
    } 
  }
};

const deleteSavedPost = async (id) => {
  try {
    const response = await axios.delete(`api/v1/savedPost/deleteSavedPost/${id}`)
    console.log(response.data);
    setItems(items => items.filter(item => item.id !== id));
    setError(response.data)
  } catch (error) {
    if (error.response) {
      setError(error.response.data)
    } 
  }
 }

useEffect(()=>{
  getSavedPost()
},[])
const flattenedArray = [].concat(...items);

return (
  <SafeAreaView style={styles.container}>
    {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
    <Header title={'SavedPosts'} />
   
    <ScrollView style={styles.friendsComponent}>
    <Savedposts data={flattenedArray} deleteSavedPost={deleteSavedPost}/>
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