import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native'
import truncateText from '../utils/truncate'
import * as Icons from "react-native-heroicons/solid"



const NewscategoryItem = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      
       <View style={styles.imgcontainer}><Image resizeMode='contain' style={{ width: '100%', height: '100%' }} 
       source={{uri:props.data.urlToImage}}/></View>
        <Text>{props.data.author}</Text>
        <Text>{ truncateText(props.data.title,20)}</Text>
        <View>
          <Text>{props.data.publishedAt}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:'grey',
    position:'relative'
  },
 imgcontainer:{
  width:360,
  height:240
 },
iconcontainer:{
  flexDirection:'row',
  position:'absolute',
  justifyContent:'space-between',
  width:'25%',
  right:0
},
iconsubcontainer:{
  flexDirection:'row'
}
 });

export default NewscategoryItem