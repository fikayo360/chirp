import React from 'react'
import {SafeAreaView,Text,TextInput,ScrollView,StyleSheet,View,Image} from 'react-native'
import Searchresult from '../components/searchresult'
import Discovereduser from '../components/discovereduser'
import  Header  from '../components/header'
import { ForwardIcon } from 'react-native-heroicons/solid'
import { Discovered } from '../mockdata/Discoveredpeople'
import Discoveredusers from '../components/discoveredusers'
import * as Icons from "react-native-heroicons/solid"
import { useState,useEffect } from 'react'
import axios from "axios";
/* import spinner component */

const Aroundyou = () => {
  
  const [aroundYou,setAroundYou] = useState([])

  const aroundyou = async () => {
    try {
      const response = await axios.get('api/v1/user/aroundYou');
      setAroundYou(response.data)
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  };

  const search = async () => {
    try {
      const response = await axios.get('api/v1/news/getTopStories');
      setNewsItems(response.data.articles);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  };

  const follow = async () => {
    try {
      const response = await axios.get('api/v1/news/getTopStories');
      setNewsItems(response.data.articles);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  };

  useEffect(() => {
    aroundyou()
  },[])

  return (
    <SafeAreaView>
        <Header title={'Search'} />

        <View style={styles.bodyContainer}>
        <View style={styles.customSearchInput}> 
        <Icons.MagnifyingGlassIcon width={20} height={20} color="black"/> 
        <TextInput placeholder='search' style={styles.searchInput} />
        <Icons.PaperAirplaneIcon width={20} height={20} color="black" />
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('../assets/searchillus.jpg')} resizeMode='contain' style={{ width: '100%', height: '100%' }}  />
        </View>
     
        <View style={styles.discoverContainer}>
        <Text style={styles.discoverpeople}> Discover people </Text>
        <Discoveredusers data={aroundYou} />
        </View>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  bodyContainer:{
    width:'100%',
    padding:3
  },
  Creativity:{
    fontSize:20,
    marginLeft:15,
  },
  customSearchInput:{
    width:'95%',
    alignItems:'center',
    justifyContent:'space-between',
    height:45,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'grey',
    padding:10,
    borderRadius:5,
    marginLeft:10,
    marginTop:5
  },
  searchInput:{
    width:'70%',
    fontSize:18,
    color:'black'
  },
  imageContainer:{
    width:320,
    height:320
  },
  discoverContainer:{
    width:'100%'
  },
  discoverpeople:{
    fontSize:18,
    marginBottom:20
  }
})

export default Aroundyou