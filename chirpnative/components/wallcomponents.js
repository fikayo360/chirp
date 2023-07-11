import React from 'react'
import { View } from 'react-native'
import Wallcomponent from '../components/wallcomponent'

const Wallcomponents = (props) => {
  return (
    <View>
    {
      props?.data.length > 0 && props.data.map(item => (
       <Wallcomponent key={item._id} data={item} likePost={props.likePost} savePost={props.savePost}/>
      ))
    }
  </View>
  )
}

export default Wallcomponents