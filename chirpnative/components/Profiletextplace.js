import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { useState,useEffect } from 'react'

let cwidth;
let cheight;

const ProfilePlaceholder = ({username,width,height}) => {
  return (
    <View style={styles.wrapper}>
        <Text style={styles.text}>{username[0].toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
  text:{
    fontSize:15,
    color:'white'
  },
  wrapper:{
    height:30,
    width:30,
    backgroundColor:'#A4508B',
    borderColor:'#A4508B',
    borderWidth:0.3,
    borderRadius:50 / 2,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default ProfilePlaceholder