import {React,useState} from 'react'
import {View,Text,ScrollView,SafeAreaView,StyleSheet} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import Header from '../components/header'
import ProfilePlaceholder from '../components/Profiletextplace'
import Discoveredusers from '../components/discoveredusers'
import { Discovered } from '../mockdata/Discoveredpeople'
import NewscategoryItems from '../components/newscategoryItems'
import {newsItems} from '../mockdata/newsitems'
import { userFollowing } from '../mockdata/following'
import Following from '../components/following'

const Profile = () => {
  
  return (
    <SafeAreaView>
        <Header title={'Fikayo'} />

        <ScrollView style={styles.wrapper}>

        <View style={styles.profileQuickInfo}>

          <View >
          <View style={styles.imgContainer}><ProfilePlaceholder username={'fikayo'} /></View>
          <Text style={styles.imgtext}>Edit</Text>
          </View>

          <View style={styles.quickInfoContainer}>
             <View style={styles.profileQuickInfoAnalContainer}>
              <Text style={styles.quickinfoTxtUpper}>posts</Text>
              <Text style={styles.quickInfoTxtLower}>{30}</Text>
              </View>

              <View style={styles.profileQuickInfoAnalContainer}>
              <Text style={styles.quickinfoTxtUpper}>Followers</Text>
              <Text style={styles.quickInfoTxtLower}>{30}</Text>
              </View>

            <View style={styles.profileQuickInfoAnalContainer}>
              <Text style={styles.quickinfoTxtUpper}>Following</Text>
              <Text style={styles.quickInfoTxtLower}>{30}</Text>
            </View>
          </View>

        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.contHeaderTxt}>Bio</Text>
          <Text>eihrejhejhehjebjhejbjhrebfnejhjbenjhebjhebjhbnejkn</Text>
        </View>

        <View style={styles.people}>
          <Text style={styles.contHeaderTxt}>Discover People</Text>
          <Discoveredusers data={Discovered} />
        </View>

        <View style={styles.following}>
          <Text style={styles.contHeaderTxt}>following</Text>
          <Following data={userFollowing} />
        </View>

        <View style={styles.posts}>
          <Text style={styles.contHeaderTxt}>Posts</Text>

          <NewscategoryItems data={newsItems} />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    width:'100%',
    height:'89%',
    paddingHorizontal:5
  },
  profileQuickInfo:{
    width:'100%',
    padding:5,
    height:180,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  imgContainer:{
    marginBottom:10
  },
  imgtext:{
    fontSize:18
  },
  profileQuickInfoAnalContainer:{
flexDirection:'column'
  },
  quickinfoTxtUpper:{
    fontSize:16,
    marginBottom:10
  },
  quickInfoTxtLower:{
    fontSize:14
  },
  quickInfoContainer:{
    width:'60%',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bioContainer:{
    width:'100%',
    marginBottom:20
  },
  people:{
    width:'100%',
    height:300,
  },
  following:{
    width:'100%',
    height:200
  },
  posts:{
    width:'100%',
    justifyContent:'center'
  },
  contHeaderTxt:{
    fontSize:20,
    marginBottom:10
  }
})

export default Profile