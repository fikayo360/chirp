import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'


const Savedpost = (props) => {
 
    return (
      (
        <View style={styles.wallcontainer}>
        <View style={styles.wallheader}><ProfilePlaceholder username={'fifk'}/>
        <Text style={styles.wallheaderTxt}>{props.data.SavedPostAuthor}</Text></View>
        <View style={styles.wallimgcontainer}>
        <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} 
        source={{uri:props.data.SavedPostImg}}/></View>
        <Text style={styles.title}>{props.data.SavedPostTitle}</Text>
        <Text style={styles.title}>{props.data.SavedPostBody}</Text>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>{props.data.createdAt}</Text>
          <View style={styles.iconcontainer}>
          <TouchableOpacity style={styles.iconsubcontainer} onPress={()=>props.deleteSavedPost(props.data._id) }><Icons.TrashIcon width={20} height={20} color="black" /></TouchableOpacity>
          </View>
        </View>
    </View>
    )
      )
}

const styles = StyleSheet.create({
  title:{
    marginBottom:20
  },
  timestamp:{
    fontSize:15
  },
  footer:{
    justifyContent:'center'
  },
  wallheader:{
    flexDirection:'row',
    alignItems:'center'
  },
  wallheaderTxt:{
    fontSize:18,
    marginLeft:10
  },
  wallcontainer:{
    padding:15,
    position:'relative',
  },
 wallimgcontainer:{
  width:360,
  height:240
 },
iconcontainer:{
  flexDirection:'row',
  position:'absolute',
  justifyContent:'space-between',
  width:'40%',
  right:20
},
iconsubcontainer:{
  flexDirection:'row',
  margin:10
}
})

export default Savedpost