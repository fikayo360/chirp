import React from 'react'
import { View } from 'react-native'
import Wallcomponent from '../components/wallcomponent'

const Wallcomponents = (props) => {
  return (
    <View>
    {
      props.data && props.data.map(item => (
       <Wallcomponent data={item} />
      ))
    }
  </View>
  )
}

export default Wallcomponents