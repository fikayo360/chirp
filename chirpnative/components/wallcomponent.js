import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'


const Wallcomponent = (props) => {
  let postData = {
          SavedPostImg:props.data.postImg,
          SavedPostAuthor:props.data.postAuthor,
          SavedPostTitle:props.data.postTitle,
          SavedPostBody:props.data.postBody
        }
   
    const handleFollow = () => {
      let likeData = {authorName:props.data.postAuthor,postId:props.data._id}
      props.likePost(likeData); 
      props.data.postLikes.push(likeData)
    };
  return (
      <View style={styles.wallcontainer}>
      <View style={styles.wallheader}><ProfilePlaceholder username={'fikayo'}/>
      <Text style={styles.wallheaderTxt}>{props.data.postAuthor}</Text></View>
      <View style={styles.wallimgcontainer}>
      <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} 
      source={{uri:props.data.postImg}}/></View>
      <Text style={styles.title}>{props.data.postAuthor}</Text>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{props.data.createdAt}</Text>
        <View style={styles.iconcontainer}>
        <TouchableOpacity style={styles.iconsubcontainer} onPress={handleFollow}>
          <Icons.HeartIcon width={20} height={20} color="black" /><Text>{props.data.postLikes.length}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconsubcontainer}><Icons.ChatBubbleLeftIcon width={20} height={20} color="black" /><Text>{0}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconsubcontainer} onPress={()=>props.savePost(postData)}>
          <Icons.BookmarkIcon width={20} height={20} color="black" /></TouchableOpacity>
        </View>
      </View>
  </View>
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
export default Wallcomponent