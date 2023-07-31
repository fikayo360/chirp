import React from 'react'
import {View,TouchableOpacity,Text,StyleSheet,Image,Dimensions} from 'react-native'
import { useState } from 'react'
import * as Icons from "react-native-heroicons/solid"
import ProfilePlaceholder from './Profiletextplace'
import * as Font from 'expo-font'; 

const Discovereduser = (props) => {
  const windowWidth = Dimensions.get('window').width;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleFollow = () => {
    props.follow(props.data.username); 
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
    <View style={[styles.container,
      {
      width:windowWidth * 0.5,
      height:windowWidth * 0.5,
      margin: windowWidth * 0.009,
      borderRadius:windowWidth * 0.02,
      borderWidth:1}]}>

      {props.data.profilePic?(
        <View style={styles.ImgContainer}>
        <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: props.data.profilePic }} />
        </View>
        ):(
          <ProfilePlaceholder username={props.data.username} width={windowWidth * 0.2} height={windowWidth * 0.2} />
        )
        }
      
      <Text style={{fontFamily:'Poppins-Black'}}>{props.data.username}</Text>
      <TouchableOpacity style={[styles.button,
      {
        height:windowWidth* 0.1,
        width:windowWidth * 0.35,
        borderRadius:windowWidth * 0.4,
        marginTop:windowWidth * 0.05
      }]} onPress={handleFollow}> 
        <Text style={[styles.buttonTxt,{fontSize:windowWidth * 0.04,fontFamily:'Poppins-Black'}]}>follow</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    borderColor:'grey',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    
  },
  ImgContainer:{
    width:100,
    height:100,
    borderWidth:0.8,
    borderRadius:50,
    marginBottom:10
  },
  xIconContainer:{
    position:'absolute',
    top:3,
    right:3
  },
  button:{
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgb(15, 20, 25)'
  },
  buttonTxt:{
    color:'white'
  }
})

export default Discovereduser