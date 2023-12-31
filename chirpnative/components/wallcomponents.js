import React from 'react'
import { View } from 'react-native'
import Wallcomponent from '../components/wallcomponent'
import { useState,useEffect } from 'react'

const Wallcomponents = (props) => {
  useEffect(()=>{
    console.log(props);
  },[])
  return (
    <View>
    {
       props.data.map((item,index) => (
       <Wallcomponent key={index.toString()} data={item} likePost={props.likePost} savePost={props.savePost}/>
      ))
    }
  </View>
  )
}

export default Wallcomponents