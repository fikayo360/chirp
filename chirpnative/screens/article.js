import React from 'react'
import {View,Text,SafeAreaView,StyleSheet,Image,ScrollView,Dimensions} from 'react-native'
import { sampleArticle } from '../mockdata/article'
import * as Icons from "react-native-heroicons/solid"
import Header from '../components/header'
import useApp from "../hooks/useApp";
import { useState,useEffect } from 'react'

const Article = () => {
  const {savePostId,article,saveArticle} = useApp()
  const windowWidth = Dimensions.get('window').width;
  useEffect(()=>{
    console.log(article);
  },[])
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'Article'} />
        <ScrollView style={[styles.bodycontainer,{padding:windowWidth * 0.03}]}>
        <Text style={[styles.title,{fontSize:windowWidth*0.06}]}>{article.postTitle}</Text>
        <View>

        {article.postImg &&
         (<View style={styles.imgContainer}>
        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} 
        source={{uri:article.postImg}}/>
        </View>)}

        <Text style={styles.writtenBy}>written by {article.postAuthor}</Text>

        <View style={styles.articleBodyContainer}>
        <Text style={styles.articleBody}>
        {article.postBody}
        </Text>
        </View>

        </View>  
        </ScrollView> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  bodycontainer:{
    width:'100%',
    height:'90%'
  },
  title:{
   
    fontWeight:'bold'
  },
  imgContainer:{
    width:'90%',
    height:'80%'
  },
  articleBodyContainer:{
    width:'100%',
    height:'60%',
  },
  articleBody:{
    fontSize:16
  },
  writtenBy:{
    fontSize:14,
    fontWeight:'bold'
  },
  iconcontainer:{
    flexDirection:'row',
    position:'absolute',
    justifyContent:'space-between',
    width:'25%',
    right:0
  },
  iconsubcontainer:{
    flexDirection:'row'
  }
})

export default Article