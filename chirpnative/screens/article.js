import React from 'react'
import {View,Text,SafeAreaView,StyleSheet,Image,ScrollView} from 'react-native'
import { sampleArticle } from '../mockdata/article'
import * as Icons from "react-native-heroicons/solid"
import Header from '../components/header'

const Article = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'Article'} />
        <ScrollView style={styles.bodycontainer}>
        <Text style={styles.title}>{sampleArticle.title}</Text>

        <View>

        <View style={styles.imgContainer}>
        <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} 
        source={{uri:sampleArticle.img}}/>
        </View>
        <Text style={styles.writtenBy}>written by {sampleArticle.author}</Text>
        
        <View style={styles.iconcontainer}>
          <View style={styles.iconsubcontainer}><Icons.HeartIcon width={20} height={20} color="black" /><Text>{10}</Text></View>
          <View style={styles.iconsubcontainer}><Icons.ChatBubbleLeftIcon width={20} height={20} color="black" /><Text>{13}</Text></View>
        </View>

        <View style={styles.articleBodyContainer}>
        <Text style={styles.articleBody}>
        {sampleArticle.articleBody}
        </Text>
        </View>

        </View>  
        </ScrollView> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%'
  },
  bodycontainer:{
    width:'100%',
    height:'89%',
    paddingHorizontal:10
  },
  title:{
    fontSize:25,
    fontWeight:'bold'
  },
  imgContainer:{
    width:'98%',
    height:350
  },
  articleBodyContainer:{
    width:'100%',
    height:'60%',
    lineHeight:3
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