import React from 'react'
import {View,Text,Dimensions,StyleSheet,Image} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'

const Followingcomponent = (props) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    
    <View style={[styles.wrapper,{
      width:windowWidth * 0.5,
      height:windowWidth * 0.5,
      marginHorizontal:windowWidth * 0.3,}
      ]}>
      {props.data.profilepic?
          (<View style={{width:windowWidth * 0.1, height:windowWidth * 0.1}}>
          <Image resizeMode='cover' style={{ width: '100%', height: '100%',borderRadius:windowWidth * 0.5 }} source={{ uri: sessionUser.profilepic }} />
          </View>):
          (<ProfilePlaceholder username={'fikayo'} width={windowWidth * 0.16} height={windowWidth * 0.16} />)
          }
    <ProfilePlaceholder username={props.data.username} width={windowWidth*0.1} height={windowWidth*0.1} />
    <Text style={{fontSize:windowWidth * 0.03,marginTop:windowWidth*0.02}}>{props.data.username} </Text>
    </View>
   
  )
}

const styles= StyleSheet.create({
  wrapper:{
    
    justifyContent:'center',
    alignItems:'center',
    borderColor:'grey',
    borderWidth:1,
    borderRadius:50
  }
})

export default Followingcomponent