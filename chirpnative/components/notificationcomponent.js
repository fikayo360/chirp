import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'

const Notificationcomponent = (props) => {
  return (
    <View style={styles.container}>
    <ProfilePlaceholder username={'fikayo'}/>
    <View style={styles.notificationWrap}>
    <Text style={styles.notificationTitle}> {props.data.notificationTitle} </Text>
    <Text style={styles.otherTxt}> {props.data.NotificationBody} </Text>
    </View>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    width:'100%',
    height:80,
    flexDirection:'row',
    borderBottomColor:'grey',
    borderBottomWidth:1,
    padding:4
  },
  notificationTitle:{
    fontSize:20,
    marginBottom:10
  },
  otherTxt:{
    fontSize:15
  },
  
})
export default Notificationcomponent