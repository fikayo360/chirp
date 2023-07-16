import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import ProfilePlaceholder from '../components/Profiletextplace'
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Header = (props) => {
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const toggleSidebar = () => {
    navigation.toggleDrawer();
  }

 
  const getUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('user');
      console.log(currentUser);
      setUser(currentUser);
      //console.log(user);
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
    <TouchableOpacity onPress={toggleSidebar}><Icons.Bars3Icon width={30} height={30} color="black" /></TouchableOpacity>
    <Text style={styles.Txt}>{props.title}</Text>
    <ProfilePlaceholder username={'mor'}/>
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