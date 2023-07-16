import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
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
      const parsedValue = JSON.parse(currentUser);
      setUser(parsedValue);
    } catch (error) {
      console.log('Error getting user:', error);
      setUser(null);
    }
  };

  useEffect(()=> {
    getUser()
    console.log(userr.user.username);
  },[])
 
  return (
    <View style={styles.header}>
    <TouchableOpacity onPress={toggleSidebar}><Icons.Bars3Icon width={windowWidth * 0.085} height={windowWidth * 0.085} color="black" /></TouchableOpacity>
    <Text style={styles.Txt}>{props.title}</Text>
    <ProfilePlaceholder username={userr.user.username}/>
    </View>
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
      },
      Txt:{
        fontSize:20
      }
})
export default Header