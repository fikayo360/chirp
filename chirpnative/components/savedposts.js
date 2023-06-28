import React from 'react'
import Savedpost from '../components/savedpost'
import { View } from 'react-native'

const Savedposts = (props) => {
  return (
    <View>
      {
          props.data && props.data.map((item,index) => (
            <Savedpost data={item} key={index} />
           ))
      }
  </View>
  )
 
}

export default Savedposts