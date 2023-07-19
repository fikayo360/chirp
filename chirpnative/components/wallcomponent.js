import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native'
import ProfilePlaceholder from './Profiletextplace'
import { useEffect } from "react"
import truncateText from '../utils/truncate'
import { format as timeAgo } from 'timeago.js';

const Wallcomponent = ({data,likePost,savePost}) => {
  const windowWidth = Dimensions.get('window').width;

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
      <View style={[styles.container,{paddingHorizontal: windowWidth * 0.02,marginTop: windowWidth * 0.05}]}>
      <View style={[styles.imgContainer,{alignSelf:'center',height:windowWidth * 0.8}]} >
      <Image style={styles.img} resizeMode='cover' source={{uri:data.postImg}} />
      </View>
      <Text>{data.postAuthor}</Text>
      <View style={styles.bodyContainer}><Text>{truncateText(data.postBody,120)}</Text></View>

      <View style={[styles.footer,{paddingHorizontal:windowWidth * 0.0}]}>
        <Text>{timeAgo(data.createdAt)}</Text>
        <View style={styles.icons}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleFollow}>
          <Icons.HeartIcon width={windowWidth * 0.05} height={windowWidth * 0.05} color="black" /><Text>{data.postLikes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}><Icons.ChatBubbleLeftIcon width={windowWidth * 0.05} height={windowWidth * 0.05} color="black" /><Text>{data.postComments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconContainer,{marginRight:windowWidth * 0.05}]} onPress={()=>{savePost(postData)}}>
          <Icons.BookmarkIcon width={windowWidth * 0.05} height={windowWidth * 0.05} color="black" /></TouchableOpacity>
        </View>
      </View>
      {/*
      <
      */}
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%'
  },
  imgContainer:{
    width:'98%'
  },
  img:{
    width:'100%',
    height:'100%'
  },
  bodyContainer:{
    width:'100%'
  },
  footer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  icons:{
    flexDirection:'row'
  },
  iconContainer:{
    flexDirection:'row'
  }
})
export default Wallcomponent