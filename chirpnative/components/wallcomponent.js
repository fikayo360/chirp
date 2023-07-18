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
      <View style={styles.container}>

      <View style={[styles.heading,{paddingHorizontal: windowWidth * 0.02}]}>
      <Image style={{borderRadius:windowWidth * 0.5,
      width:windowWidth * 0.12, height:windowWidth * 0.12}} source={require('../assets/anime2.png')} resizeMode='cover' />
      <Text >{data.postAuthor}</Text>
      </View>

      <View style={[styles.imgContainer,{alignSelf:'center',height:windowWidth * 0.6}]} >
      <Image style={styles.img} resizeMode='cover' source={{uri:data.postImg}} />
      </View>

      <Text>{truncateText(data.postBody,120)}</Text>
      <View>
        <Text>{timeAgo(data.createdAt)}</Text>
        <View>
        <TouchableOpacity  onPress={handleFollow}>
          <Icons.HeartIcon width={20} height={20} color="black" /><Text>{data.postLikes.length}</Text></TouchableOpacity>
        <TouchableOpacity ><Icons.ChatBubbleLeftIcon width={20} height={20} color="black" /><Text>{data.postComments.length}</Text></TouchableOpacity>
        <TouchableOpacity  onPress={()=>savePost(postData)}>
          <Icons.BookmarkIcon width={20} height={20} color="black" /></TouchableOpacity>
        </View>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%'
  },
  heading:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  imgContainer:{
    width:'90%'
  },
  img:{
    width:'100%',
    height:'100%'
  }
})
export default Wallcomponent