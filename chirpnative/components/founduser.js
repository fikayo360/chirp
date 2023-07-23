import React from 'react'
import {View,TouchableOpacity,Text,StyleSheet,Image,Dimensions} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import ProfilePlaceholder from './Profiletextplace'

const Founduser = (props) => {
  const windowWidth = Dimensions.get('window').width;
  const handleFollow = () => {
    props.follow(props.data.username); 
  };
  return (
    <View style={[styles.container,
      {width:windowWidth * 0.5,
      height:windowWidth * 0.5,
      margin: windowWidth * 0.009,
      borderRadius:windowWidth * 0.02,
      borderWidth:1}]}>

      {props.data.profilepic?(
        <View style={{
            width:windowWidth * 0.20,
            height:windowWidth * 0.20
        }}>
        <Image resizeMode='cover' style={{ width: '100%', height: '100%',borderRadius:windowWidth * 0.5 }} source={{ uri: props.data.profilepic }} />
        </View>
        ):(
          <ProfilePlaceholder username={props?.data?.username} width={windowWidth * 0.2} height={windowWidth * 0.2}/>
        )}
      
      <Text>{props.data.username}</Text>
      <TouchableOpacity style={[styles.button,
      {
        height:windowWidth* 0.1,
        width:windowWidth * 0.35,
        borderRadius:windowWidth * 0.4,
        marginTop:windowWidth * 0.05
      }]} onPress={handleFollow}> 
        <Text style={[styles.buttonTxt,{fontSize:windowWidth * 0.04}]}>follow</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    borderColor:'grey',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    
  },
  button:{
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgb(15, 20, 25)'
  },
  buttonTxt:{
    color:'white'
  }
})

export default Founduser