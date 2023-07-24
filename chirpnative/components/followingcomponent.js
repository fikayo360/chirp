import React from 'react'
import {View,Text,Dimensions,StyleSheet,Image} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'

const Followingcomponent = (props) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    
    <View style={[styles.wrapper,{
      width:windowWidth * 0.3,
      height:windowWidth * 0.3,
      borderRadius:windowWidth*0.5,
      marginRight:windowWidth*0.02
      }
      ]}>
      {props.data.profilepic?
          (<View style={{width:windowWidth * 0.15, height:windowWidth * 0.15}}>
          <Image resizeMode='cover' style={{ width: '100%', height: '100%',borderRadius:windowWidth * 0.5 }} source={{ uri: props.data.profilepic }} />
          </View>):
          (<ProfilePlaceholder username={'fikayo'} width={windowWidth * 0.15} height={windowWidth * 0.15} />)
          }
    <Text style={{fontSize:windowWidth * 0.03,marginTop:windowWidth*0.02}}>{props.data.username} </Text>
    </View>
   
  )
}

const styles= StyleSheet.create({
  wrapper:{
    justifyContent:'center',
    alignItems:'center',
    borderColor:'grey',
    borderWidth:1
  }
})

export default Followingcomponent