import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'
import { useEffect } from "react"
import truncateText from '../utils/truncate'
import { format as timeAgo } from 'timeago.js';

const Wallcomponent = ({data,likePost,savePost}) => {
  let postData = {
          SavedPostImg:data.postImg,
          SavedPostAuthor:data.postAuthor,
          SavedPostTitle:data.postTitle,
          SavedPostBody:data.postBody
        }
   
    const handleFollow = async() => {
      let likeData = {authorName:data.postAuthor,postId:data._id}
      const result = await likePost(likeData);
      if (result) {
        data.postLikes.push(likeData);
      }
    };
    
  return (
      <View style={styles.wallcontainer}>

      <View style={styles.wallheader}><ProfilePlaceholder username={data.postAuthor}/>
      <Text style={styles.wallheaderTxt}>{data.postAuthor}</Text>
      </View>

      <View style={styles.wallimgcontainer}>
      <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} 
      source={{uri:data.postImg}}/>
      </View>

      <Text style={styles.body}>{truncateText(data.postBody,120)}</Text>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>{timeAgo(data.createdAt)}</Text>
        <View style={styles.iconcontainer}>
        <TouchableOpacity style={styles.iconsubcontainer} onPress={handleFollow}>
          <Icons.HeartIcon width={20} height={20} color="black" /><Text>{data.postLikes.length}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconsubcontainer}><Icons.ChatBubbleLeftIcon width={20} height={20} color="black" /><Text>{data.postComments.length}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconsubcontainer} onPress={()=>savePost(postData)}>
          <Icons.BookmarkIcon width={20} height={20} color="black" /></TouchableOpacity>
        </View>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  body:{
    marginBottom:20,
    fontSize:15,
    
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
    width:'100%',
    height:'100%',
    padding:15,
    position:'relative',
  },
 wallimgcontainer:{
  width:'80%',
  height:'30%'
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