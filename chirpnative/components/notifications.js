import React from 'react'
import Notificationcomponent from '../components/notificationcomponent'
import { View } from 'react-native'

const Notifications = (props) => {
  return (
    <View>
    {
      props.data && props.data.map((item,index) =>
     (
        <Notificationcomponent data={item} key={index.toString()}/>
    ))
    }
</View>
  )
}

export default Notifications