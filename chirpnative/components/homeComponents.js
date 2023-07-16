import React from 'react'
import { View } from 'react-native'
import NewscategoryItem from './newscategoryItem'

const HomeComponents = (props) => {
  return (
    <View>
    {
      props.data && props.data.map((item,index) =>
     (
        <NewscategoryItem data={item} key={item._id}/>
    ))
    }
</View>
  )
}

export default HomeComponents