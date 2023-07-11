import React from 'react'
import {View,TouchableOpacity,Text,StyleSheet,Image} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import ProfilePlaceholder from './Profiletextplace'

const Discovereduser = (props) => {
  const handleFollow = () => {
    props.follow(props.data.username); 
  };
  return (
    <View style={styles.container}>
      <View style={styles.xIconContainer}><Icons.XMarkIcon width={15} height={15} color="black"/></View>
      <View style={styles.ImgContainer}>
        {props.data.profilePic ? (
          <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: props.data.profilePic }} />
        ) : (
          <ProfilePlaceholder username={props.data.username} />
        )}
      </View>
      <Text>{props.data.username}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFollow}> 
        <Text style={styles.buttonTxt}>follow</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    width:160,
    height:200,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:10,
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    margin: 5
  },
  ImgContainer:{
    width:100,
    height:100,
    borderWidth:0.8,
    borderRadius:50,
    marginBottom:10
  },
  xIconContainer:{
    position:'absolute',
    top:3,
    right:3
  },
  button:{
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgb(15, 20, 25)',
    height:30,
    width:130,
    margin: 12,
    borderRadius:5
  },
  buttonTxt:{
    fontSize:15,
    color:'white'
  }
})

export default Discovereduser