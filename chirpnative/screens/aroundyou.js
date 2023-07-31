import React from 'react'
import {SafeAreaView,Text,TextInput,ScrollView,StyleSheet,View,Image,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native'
import Searchresult from '../components/searchresult'
import Founduser from '../components/founduser'
import  Header  from '../components/header'
import { ForwardIcon } from 'react-native-heroicons/solid'
import Discoveredusers from '../components/discoveredusers'
import * as Icons from "react-native-heroicons/solid"
import { useState,useEffect } from 'react'
import axios from "axios";
import useApp from '../hooks/useApp'
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import * as Font from 'expo-font'; 
/* import spinner component */

const Aroundyou = () => {
  const {token} = useApp();
  const windowWidth = Dimensions.get('window').width;
  const [items,setItems] = useState([])
  const [username,setUsername] = useState('')
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [discovered,setDiscovered] = useState({})
  const [loading,setLoading] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const getAround = async () => {
    try {
      const response = await axios.get('api/v1/user/aroundYou');
      if(response.data === "no items found"){
        setNotification('no items found')
      }
      setItems(response.data);
      console.log(response.data); 
    } catch (error) {
      setError(error.response.data)
    }
  };

  useEffect(() => {
    getAround()
  },[])
  
  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

  const search = async () => {
    setLoading(true)
    const formData = {username}
    if(!username){
      setError('fields cant be empty')
      setLoading(false)
      return
    }
    try {
      const response = await axios.post('api/v1/user/search', formData);
      if(response.data === 'user not does not exist'){
        setLoading(false)
        setError('user not does not exist')
      }
      setDiscovered(response.data);
      setUsername('')
      setLoading(false)
    } catch (error) {
      if (error.response) {
        setLoading(false)
        setError(error.response.data)
      } 
    }
  };

  const follow = async (username) => {
    console.log('hi you got here');
    try {
      const response = await axios.get(`api/v1/user/follow/${username}`);
      setNotification(response.data)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    loadFonts();
    return null; 
  }

  return (
    <SafeAreaView>
      {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
      {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
        <Header title={'Search'} />
        <ScrollView style={[styles.bodyContainer,{height:'90%',padding:windowWidth *0.03}]}>
        <View style={[styles.customSearchInput,{
          padding:windowWidth * 0.04,
          borderRadius:windowWidth * 0.01,
          alignSelf:'center',
          marginTop:windowWidth * 0.06,
          marginBottom:windowWidth * 0.09,
          height:windowWidth * 0.15}]}> 
        <Icons.MagnifyingGlassIcon width={windowWidth * 0.07} height={windowWidth * 0.07} color="black"/> 
        <TextInput
        style={[styles.searchInput,{fontSize:windowWidth * 0.038,fontFamily:'Poppins-Black'}]}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="username"
        />
        <TouchableOpacity onPress={search}><Icons.PaperAirplaneIcon width={windowWidth * 0.07} height={windowWidth * 0.07} color="black" /></TouchableOpacity>
        </View>
       
        <>{discovered.username?(<View style={{alignSelf:'center'}}><Founduser data={discovered} follow={follow} /></View>):
        (<View style={{width:windowWidth * 0.6,height:windowWidth * 0.6,alignSelf:'center',marginBottom:windowWidth * 0.2}}>
          <Image source={require('../assets/search3.png')} resizeMode='cover' style={{ width: '100%', height: '100%' }}  />
        </View>)}</>

       {items.length > 0 && (<View style={[styles.discoverContainer,{marginTop:windowWidth*0.05}]}>
        <Text style={{fontSize:windowWidth * 0.06,marginBottom:windowWidth * 0.05,fontFamily:'Poppins-Black'}}> People </Text>
        {items.length>0?(<Discoveredusers data={items} follow={follow} />):<ActivityIndicator size="large" color="black" style={{marginTop:'10%'}}/>}
        </View>)}

        </ScrollView>
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
    width:'100%'
  },
  Creativity:{
    fontSize:20,
    marginLeft:15,
  },
  customSearchInput:{
    width:'95%',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'grey'
  },
  searchInput:{
    width:'70%',
    color:'black'
  },
  discoverContainer:{
    width:'100%'
  },
  discoverpeople:{
    
  }
})

export default Aroundyou