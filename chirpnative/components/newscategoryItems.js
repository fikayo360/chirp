
import React from 'react'
import {View} from 'react-native'
import NewscategoryItem from '../components/newscategoryItem'

const NewscategoryItems = (props) => {
  return (
    <View>
      {
        props.data && props.data.map(item => (
         <NewscategoryItem data={item} key={item._id} />
        ))
        }
    </View>
      )
}

export default NewscategoryItems