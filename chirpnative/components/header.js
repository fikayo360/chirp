import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import ProfilePlaceholder from '../components/Profiletextplace'

const Header = (props) => {
  return (
    <View style={styles.header}>
    <Icons.Bars3Icon width={30} height={30} color="black" />
    <Text style={styles.Txt}>{props.title}</Text>
    <ProfilePlaceholder username={'morayo'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:20,
        paddingTop:34,
        borderBottomColor:'grey',
        borderBottomWidth:0.5
      },
      Txt:{
        fontSize:20
      }
})
export default Header