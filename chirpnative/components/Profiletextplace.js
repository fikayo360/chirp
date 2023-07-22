import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'


const ProfilePlaceholder = ({username,width,height}) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={[styles.wrapper,{height:height, width:width, borderWidth:0.5, borderRadius:windowWidth*0.5}]}>
        <Text style={[styles.text,{fontSize:windowWidth*0.06}]}>{username[0].toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
  text:{
    color:'white'
  },
  wrapper:{
    backgroundColor:'#A4508B',
    borderColor:'#A4508B',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default ProfilePlaceholder