import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'

const Followingcomponent = (props) => {
  return (
 
    <View style={styles.wrapper}>
    <ProfilePlaceholder username={'fikayo'} />
    

    <Text style={styles.text}>{props.data.name} </Text>
    </View>
   
  )
}

const styles= StyleSheet.create({
  wrapper:{
    width:100,
    height:100,
    marginHorizontal:10,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'grey',
    borderWidth:1,
    borderRadius:50
  },
  text:{
    fontSize:15,
    marginTop:10
  }
})

export default Followingcomponent