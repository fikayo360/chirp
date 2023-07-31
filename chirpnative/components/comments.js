import React from 'react'
import {View} from 'react-native'
import CommentComponent from '../components/commentComponent'


const CommentItems = (props) => {
  return (
    <View>
    
    {
        
    props.data && props.data.map((item,index) =>
     (
        
        <CommentComponent data={item} key={index.toString()} />
    ))
    }
</View>
  )
}

export default CommentItems