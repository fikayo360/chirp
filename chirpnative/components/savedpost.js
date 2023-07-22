import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'


const Savedpost = (props) => {
  const windowWidth = Dimensions.get('window').width;
    return (
      (
        <View style={[styles.wallcontainer,{ padding:windowWidth * 0.02}]}>
        <View style={[styles.wallheader,{marginBottom:windowWidth * 0.02}]}>
        <ProfilePlaceholder username={'fifk'}/>
        <Text style={[styles.wallheaderTxt,{fontSize:windowWidth*0.055}]}>{props.data.SavedPostAuthor}</Text>
        </View>
        <View style={[{height:windowWidth * 0.9}]}>
        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} 
        source={{uri:props.data.SavedPostImg}}/>
        </View>
        <Text style={[styles.title,{fontSize:windowWidth * 0.05}]}>{props.data.SavedPostTitle}</Text>
        <View style={{width:'100%'}}><Text style={[styles.title,{fontSize:windowWidth * 0.04}]}>{props.data.SavedPostBody}</Text></View>
        <View style={[styles.footer,{width:'100%',height:windowWidth * 0.12,paddingLeft:windowWidth * 0.005,}]}>
          <Text style={[styles.timestamp,{fontSize:windowWidth * 0.05}]}>{[props.data.createdAt.slice(0,10)]}</Text>
          <View style={styles.iconcontainer}>
          <TouchableOpacity style={styles.iconsubcontainer} onPress={()=>props.deleteSavedPost(props.data._id) }>
            <Icons.TrashIcon width={windowWidth * 0.06} height={windowWidth * 0.06} color="black" />
          </TouchableOpacity>
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
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  wallheader:{
    flexDirection:'row',
    alignItems:'center'
  },
  wallheaderTxt:{
    marginLeft:10
  },
  wallcontainer:{
    width:'100%',
    position:'relative',
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