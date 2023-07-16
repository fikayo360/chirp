import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import ProfilePlaceholder from '../components/Profiletextplace'
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
      setUser(parsedValue)
    } catch (error) {
      console.log('Error getting user:', error);
      setUser(null);
    }
  };

  useEffect(()=> {
    getUser()
  },[])
 
  return (
    <View style={styles.header}>
    <TouchableOpacity onPress={toggleSidebar}><Icons.Bars3Icon width={windowWidth * 0.07} height={windowWidth * 0.07} color="black" /></TouchableOpacity>
    <Text style={styles.Txt}>{props.title}</Text>
    <ProfilePlaceholder username={userr.user.username}/>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        paddingTop:34,
        borderBottomColor:'grey',
        borderBottomWidth:0.5
      },
      Txt:{
        fontSize:20
      }
})
export default Header