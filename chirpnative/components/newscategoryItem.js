import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native'
import truncateText from '../utils/truncate'
import { format as timeAgo } from 'timeago.js';
import { useNavigation } from '@react-navigation/native';
import * as Icons from "react-native-heroicons/solid"
import * as Font from 'expo-font'; 
import { useState } from 'react';


const NewscategoryItem = (props) => {
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const handleNavigate = () => {
    navigation.navigate('webview', { url:props.data.url });
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
    <TouchableOpacity onPress={handleNavigate} style={[styles.container,{height:windowWidth * 0.20,margin:windowWidth * 0.02,paddingLeft:windowWidth * 0.01,fontSize:windowWidth * 0.03}]}>
      <Image style={{borderRadius:windowWidth * 0.5,width:windowWidth * 0.12, height:windowWidth * 0.12}} source={require('../assets/anime2.png')} resizeMode='cover' />
        
        <View style={[styles.body]}>
        <Text style={[styles.textSize,{fontSize:windowWidth * 0.04,fontFamily:'Poppins-Black'}]}>{props.data.author || props.data.source.name || props.data.source.name}</Text>
         <Text style={[styles.textSize,{fontSize:windowWidth * 0.030,fontFamily:'Poppins-Black'}]}>{ truncateText(props.data.title,41)}</Text>
          <Text style={[styles.textSize,{fontSize:windowWidth * 0.030,fontFamily:'Poppins-Black'}]}>{props.data.publishedAt.slice(0,10)}</Text>
        </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    borderBottomWidth:1,
    borderBottomColor:'grey',
    position:'relative',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  body:{
    width:'84%'
  },
  textSize:{
    color:'black',
  },
iconcontainer:{
  flexDirection:'row',
  position:'absolute',
  justifyContent:'space-between',
  width:'25%',
  right:0
},
iconsubcontainer:{
  flexDirection:'row'
}
 });

export default NewscategoryItem