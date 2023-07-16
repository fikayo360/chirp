import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,SafeAreaView} from 'react-native'
import ProfilePlaceholder from '../components/Profiletextplace'
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = (props) => {
  const [userr, setUser] = useState({});
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const toggleSidebar = () => {
    navigation.toggleDrawer();
  }

  const getUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('user');
      console.log(currentUser);
      //const parsedValue = JSON.parse(currentUser);
      //console.log(parsedValue);
      setUser(parsedValue);
    } catch (error) {
      console.log('Error getting user:', error);
      setUser(null);
    }
  };

  useEffect(()=> {
    //getUser()
    //console.log(userr.user.username);
  },[])
 
  return (
    <SafeAreaView style={[styles.header,{paddingHorizontal:windowWidth * 0.05,paddingTop: windowWidth * 0.05}]}>
    <TouchableOpacity onPress={toggleSidebar}><Icons.Bars3Icon width={windowWidth * 0.085} height={windowWidth * 0.085} color="black" /></TouchableOpacity>
    <Text style={[styles.Txt,{fontSize:windowWidth * 0.05}]}>{props.title}</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}><ProfilePlaceholder username={userr?.user?.username || "fikayo"}/></TouchableOpacity>
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