import React from 'react'
import {View,Text,StyleSheet,Dimensions,Image} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'
import * as Font from 'expo-font'; 
import { useState } from 'react';

const Notificationcomponent = (props) => {
  const windowWidth = Dimensions.get('window').width;
  const [fontsLoaded, setFontsLoaded] = useState(false);
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
    <View style={[styles.container,{height:windowWidth * 0.23,padding:windowWidth * 0.02}]}>
      {
        props.data.ProfilePic?<Image style={{borderRadius:windowWidth * 0.5,borderWidth:2,borderColor:'#0B0500', 
        width:windowWidth * 0.1, height:windowWidth * 0.1}} source={{ uri: props.data.ProfilePic }} resizeMode='cover' /> :
        (<ProfilePlaceholder username={props.data.username} width={windowWidth * 0.1} height={windowWidth * 0.1} />)
      }
    
    <View style={{marginLeft:windowWidth * 0.03}}>
    <Text style={[styles.notificationTitle,{fontSize:windowWidth * 0.06,marginBottom:windowWidth * 0.02,fontFamily:'Poppins-Black'}]}> {props.data.username} </Text>
    <Text style={[styles.otherTxt,{fontSize:windowWidth * 0.04,fontFamily:'Poppins-Black'}]}> {props.data.body} </Text>
    </View>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    width:'100%',
    flexDirection:'row',
    borderBottomColor:'grey',
    borderBottomWidth:1
  }
})
export default Notificationcomponent