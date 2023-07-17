import React from 'react'
import {SafeAreaView,Text,TextInput,ScrollView,StyleSheet,View,Image,TouchableOpacity} from 'react-native'
import Searchresult from '../components/searchresult'
import Discovereduser from '../components/discovereduser'
import  Header  from '../components/header'
import { ForwardIcon } from 'react-native-heroicons/solid'
import Discoveredusers from '../components/discoveredusers'
import * as Icons from "react-native-heroicons/solid"
import { useState,useEffect } from 'react'
import axios from "axios";
import { Discovered } from '../mockdata/Discoveredpeople'
/* import spinner component */

const Aroundyou = () => {

 const [items,setItems] = useState([])
 const [username,setUsername] = useState('')
 const [error,setError] = useState("")
 const [discovered,setDiscovered] = useState({})
 
  const getAround = async () => {
    try {
      const response = await axios.get('api/v1/user/aroundYou');
      setItems(response.data);
      console.log(items)
      
    } catch (error) {
      console.log(err.response);
    }
  };

  const search = async () => {
    const formData = {username}
    if(!username){
      setError('fields cant be empty')
    }
    try {
      const response = await axios.post('api/v1/user/search', formData);
      setDiscovered(response.data);
      //console.log(discovered);
      setUsername('')
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  const follow = async (username) => {
    console.log('hi you got here');
    try {
      const response = await axios.get(`api/v1/user/follow/${username}`);
      setError(response.data)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  useEffect(() => {
    getAround()
  },[])

  return (
    <SafeAreaView>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
        <Header title={'Search'} />
        <View style={styles.bodyContainer}>
        <View style={styles.customSearchInput}> 
        <Icons.MagnifyingGlassIcon width={20} height={20} color="black"/> 
        <TextInput
        style={styles.searchInput}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="username"
        />
        <TouchableOpacity onPress={search}><Icons.PaperAirplaneIcon width={20} height={20} color="black" /></TouchableOpacity>
        </View>
        {<Discovereduser data={discovered}/> && <View style={styles.imageContainer}>
          <Image source={require('../assets/search3.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }}  />
        </View>}
        <View style={styles.discoverContainer}>
        <Text style={styles.discoverpeople}> Discoverd people {items.length} </Text>
        <Discoveredusers data={items} follow={follow} />
        </View>

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorContainer:{
    alignItems: 'center',
    marginTop:60,
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