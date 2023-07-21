import * as Icons from "react-native-heroicons/solid"
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native'
import truncateText from '../utils/truncate'
import { format as timeAgo } from 'timeago.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from "react";
import useApp from "../hooks/useApp";

const Wallcomponent = ({data,likePost,savePost}) => {
  const {savePostId,postId} = useApp()
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const authorFontSize = windowWidth * 0.055
  const otherFontSize = windowWidth * 0.04
  const [likes,setLikes] =useState([])
  const [comments,setComments] = useState([])

  const navigate2Article = () => {
    navigation.navigate('article');
  };

  const navigate2comments = async() => {
    savePostId(data._id)
    console.log(postId);
    //navigation.navigate('comment');
  };

  useEffect(()=> {
    setLikes(data.postLikes)
    setComments(data.postComments)
  },[])
  
  let postData = {
          SavedPostImg:data.postImg,
          SavedPostAuthor:data.postAuthor,
          SavedPostTitle:data.postTitle,
          SavedPostBody:data.postBody
        }
   
    const handleFollow = async() => {
      let likeData = {authorName:data.postAuthor,postId:data._id}
      likePost(likeData)
      if(likes.length === 0){
        likes.push(likeData)
      }
    };
    
  return (
      <View style={[styles.container,{paddingHorizontal: windowWidth * 0.02,marginTop: windowWidth * 0.07,borderBottomWidth:1,paddingBottom: windowWidth * 0.04}]}>
      <TouchableOpacity onPress={navigate2Article} style={[styles.imgContainer,{alignSelf:'center',height:windowWidth * 0.8}]} >
      <Image style={[styles.img,{borderRadius:windowWidth * 0.03}]} resizeMode='cover' source={{uri:data.postImg}} />
      </TouchableOpacity>
      <Text style={[{fontSize:authorFontSize}]}>{data.postAuthor}</Text>
      <View style={[styles.bodyContainer]}><Text style={[{fontSize:otherFontSize}]}>{truncateText(data.postBody,120)}</Text></View>

      <View style={[styles.footer,{paddingHorizontal:windowWidth * 0.0}]}>
        <Text style={[{fontSize:otherFontSize}]}>{timeAgo(data.createdAt)}</Text>
        <View style={styles.icons}>
        <TouchableOpacity style={[styles.iconContainer,{marginRight:windowWidth * 0.02}]} onPress={handleFollow}>
          <Icons.HeartIcon width={windowWidth * 0.05} height={windowWidth * 0.05} color="black" /><Text>{likes.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigate2comments} style={[styles.iconContainer,{marginRight:windowWidth * 0.02}]} >
            <Icons.ChatBubbleLeftIcon width={windowWidth * 0.05} height={windowWidth * 0.05} color="black" /><Text>{comments.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconContainer,{marginRight:windowWidth * 0.02}]} onPress={()=>{savePost(postData)}}>
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