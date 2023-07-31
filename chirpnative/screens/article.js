import React from 'react'
import {View,Text,SafeAreaView,StyleSheet,Image,ScrollView,Dimensions} from 'react-native'
import { sampleArticle } from '../mockdata/article'
import * as Icons from "react-native-heroicons/solid"
import Header from '../components/header'
import useApp from "../hooks/useApp";
import { useState,useEffect } from 'react'
import * as Font from 'expo-font'; 

const Article = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const {article} = useApp()
  const windowWidth = Dimensions.get('window').width;
  useEffect(()=>{
    console.log(article);
  },[])
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    loadFonts();
    return null; 
  }
  return (
    <SafeAreaView style={styles.container}>
        <Header title={'Article'} />
        <ScrollView style={[styles.bodycontainer,{padding:windowWidth * 0.03}]}>
        <Text style={[styles.title,{fontSize:windowWidth*0.06,marginBottom:windowWidth*0.04,fontFamily:"Poppins-Black"}]}>{article.postTitle}</Text>
        <View>

        {article.postImg && (<View style={[styles.imgContainer,{ height:windowWidth * 0.8,marginBottom:windowWidth*0.06}]}>
        <Image resizeMode='cover' style={{ width: '100%', height: '100%' }} 
        source={{uri:article.postImg}}/>
        </View>) }

        <Text style={[styles.writtenBy,{fontSize:windowWidth*0.05,marginBottom:windowWidth*0.03,fontFamily:"Poppins-Black"}]}>written by {article.postAuthor}</Text>

        <View style={styles.articleBodyContainer}>
        <Text style={{fontSize:windowWidth*0.04,fontFamily:"Poppins-Black"}}>
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
    width:'100%'
  },
  bodycontainer:{
    width:'100%',
    height:'90%'
  },
  title:{
   
    fontWeight:'bold'
  },
  imgContainer:{
    width:'98%'
  },
  articleBodyContainer:{
    width:'100%',
    height:'60%',
  },
  writtenBy:{
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