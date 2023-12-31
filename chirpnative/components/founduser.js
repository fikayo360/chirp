import React from 'react'
import {View,TouchableOpacity,Text,StyleSheet,Image,Dimensions} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'
import { useState,useEffect } from 'react'
import * as Font from 'expo-font'; 

const Founduser = ({data,follow}) => {
  const windowWidth = Dimensions.get('window').width;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(()=>{
    console.log(data);
  },[])

  const handleFollow = () => {
    follow(data.username); 
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
      {width:'80%',
      height:windowWidth * 0.5,
      paddingLeft:windowWidth * 0.13,
     }]}>

      {data.profilepic?(
        <View style={{
            width:windowWidth * 0.20,
            height:windowWidth * 0.20,
            alignItems:'center',
            
        }}>
        <Image resizeMode='cover' style={{ width: '100%', height: '100%',borderRadius:windowWidth * 0.5 }} source={{ uri: data.profilepic }} />
        <Text style={{fontFamily:'Poppins-Black'}}>{data.username}</Text>
        </View>
        ):(
          <ProfilePlaceholder username={data.username} width={windowWidth * 0.2} height={windowWidth * 0.2}/>
        )}
      
      
      <TouchableOpacity style={[styles.button,
      {
        height:windowWidth* 0.08,
        width:windowWidth * 0.25,
        borderRadius:windowWidth * 0.4,
        marginTop:windowWidth * 0.05,
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
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
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

export default Founduser