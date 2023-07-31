import React from 'react'
import ProfilePlaceholder from './Profiletextplace'
import {View,Text,StyleSheet,Dimensions,Image} from 'react-native'
import { useState } from 'react'
import * as Font from 'expo-font'; 

const CommentComponent = (props) => {
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

    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={[styles.container,{height:windowWidth * 0.20,padding:windowWidth * 0.02}]}>     
        {props.data.PostcommentProfilePic?(<Image resizeMode='cover' style={{ width: windowWidth*0.1, height: windowWidth*0.1,borderRadius:windowWidth * 0.5 }}
         source={{ uri:props.data.PostcommentProfilePic }} />):
        <ProfilePlaceholder username={props.data.PostcommentAuthor} width={windowWidth*0.1} height={windowWidth*0.1}/>}
        <View>

        <View style={[styles.textHeader,{marginBottom:windowWidth * 0.03}]}>
        <Text style={[{fontSize:windowWidth*0.05,fontFamily:'Poppins-Black'}]}> {props.data.PostcommentAuthor} </Text>
        </View>

        <Text style={[{fontSize:windowWidth*0.031,fontFamily:'Poppins-Black'}]}> {props.data.PostcommentBody} </Text>
        </View>    

        </View>
      )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'100%'
    },
    textHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    }
})

export default CommentComponent