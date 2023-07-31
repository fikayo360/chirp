import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'
import * as Font from 'expo-font'; 
import { useState } from 'react';

const Savedpost = (props) => {
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
      (
        <View style={[styles.wallcontainer,{ padding:windowWidth * 0.02}]}>
        <View style={[styles.wallheader,{marginBottom:windowWidth * 0.02}]}>
        <ProfilePlaceholder username={props.data.SavedPostAuthor} width={windowWidth*0.1} height={windowWidth*0.1}/>
        <Text style={[styles.wallheaderTxt,{fontSize:windowWidth*0.055,marginLeft:windowWidth*0.06,fontFamily:'Poppins-Black'}]}>{props.data.SavedPostAuthor}</Text>
        </View>
        <View style={[{height:windowWidth * 0.9}]}>
        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} 
        source={{uri:props.data.SavedPostImg}}/>
        </View>
        <Text style={[styles.title,{fontSize:windowWidth * 0.05, marginBottom:windowWidth*0.02,fontFamily:'Poppins-Black' }]}>{props.data.SavedPostTitle}</Text>
        <View style={{width:'100%'}}><Text style={[styles.title,{fontSize:windowWidth * 0.04}]}>{props.data.SavedPostBody}</Text></View>
        <View style={[styles.footer,{width:'100%',height:windowWidth * 0.12,paddingLeft:windowWidth * 0.005,paddingHorizontal:windowWidth*0.7}]}>
          <Text style={[styles.timestamp,{fontSize:windowWidth * 0.04,fontFamily:'Poppins-Black'}]}>{[props.data.createdAt.slice(0,10)]}</Text>
          <View style={styles.iconcontainer}>
          <TouchableOpacity style={[styles.iconsubcontainer,{}]} onPress={()=>props.deleteSavedPost(props.data._id) }>
            <Icons.TrashIcon width={windowWidth * 0.05} height={windowWidth * 0.05} color="black" />
          </TouchableOpacity>
          </View>
        </View>
    </View>
    )
      )
}

const styles = StyleSheet.create({
  footer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  wallheader:{
    flexDirection:'row',
    alignItems:'center'
  },
  wallheaderTxt:{
    
  },
  wallcontainer:{
    width:'100%',
    position:'relative',
  },
iconcontainer:{
  flexDirection:'row',
  position:'absolute',
  justifyContent:'space-between',
  width:'40%',
  right:20
},
iconsubcontainer:{
  flexDirection:'row'
}
})

export default Savedpost