import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,SafeAreaView,Image} from 'react-native'
import ProfilePlaceholder from '../components/Profiletextplace'
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from "react";
import useApp from "../hooks/useApp";
import * as Font from 'expo-font'; 


const Header = (props) => {
  const {currentUser} = useApp();
  const [userr, setUser] = useState({});
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const toggleSidebar = () => {
    navigation.toggleDrawer();
  }

  const getUser = () => {
    setUser(currentUser.user)
      console.log(`current user is ${currentUser.user.username}`)
  };

  useEffect(()=> {
    getUser()
  },[])
 
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
    <SafeAreaView style={[styles.header,{paddingHorizontal:windowWidth * 0.05,paddingTop: windowWidth * 0.05}]}>
    <TouchableOpacity onPress={toggleSidebar}><Icons.Bars3Icon width={windowWidth * 0.1} height={windowWidth * 0.1} color="black" /></TouchableOpacity>
    <Text style={[styles.Txt,{fontSize:windowWidth * 0.05,fontFamily:'Poppins-Black'}]}>{props.title}</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      {
        userr.profilepic?<Image style={{borderRadius:windowWidth * 0.5,borderWidth:2,borderColor:'#0B0500', 
        width:windowWidth * 0.1, height:windowWidth * 0.1}} source={{ uri: userr.profilepic }} resizeMode='cover' /> :
        (<ProfilePlaceholder username={userr.username || "fikayo"} width={windowWidth*0.1} height={windowWidth*0.1} />)
      }
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height:'10%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor:'grey',
        borderBottomWidth:0.5
      }
})
export default Header