
import React from 'react'
import {View} from 'react-native'
import NewscategoryItem from '../components/newscategoryItem'

const NewscategoryItems = (props) => {
  return (
    <View>
      {
        props.data && props.data.map((item,index) => (
         <NewscategoryItem data={item} key={index.toString()} />
        ))
        }
    </View>
      )
}

export default NewscategoryItems