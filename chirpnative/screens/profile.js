import {React,useState} from 'react'
import {View,Text,ScrollView,SafeAreaView,StyleSheet} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import Header from '../components/header'
import ProfilePlaceholder from '../components/Profiletextplace'
import Discoveredusers from '../components/discoveredusers'
import { Discovered } from '../mockdata/Discoveredpeople'
import NewscategoryItems from '../components/newscategoryItems'
import Following from '../components/following'
import Wallcomponents from '../components/wallcomponent'
import axios from 'axios'
import {useEffect }from 'react'

const Profile = () => {
  const [friends,setFriends] = useState([])
  const [sessionUser,setSessionUser] = useState({})
  const [posts,setPosts] = useState([])
  const [aroundYou,setAroundYou] = useState([])
  const [error,setError] = useState("")

  const getFriends = async () => {
    try {
      const response = await axios.get('api/v1/user/following');
      console.log(response.data);
      setFriends(response.data)
    } catch(error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  }
  
  getUserProfile = async () => {
    try{
      const response = await axios.get('api/v1/user/getUser');
       setSessionUser(response.data)
       console.log(response.data);
    }catch(error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  }

  getUserPost = async () => {
    try{
      const response = await axios.get('api/v1/post/postByUser');
       setPosts(response.data)
       console.log(response.data);
    }catch(error){
      if (error.response) {
        setError(error.response.data)
      } 
    }
  }

  const getAround = async () => {
    try {
      const response = await axios.get('api/v1/user/aroundYou');
      setAroundYou(response.data);
      console.log(response.data)
    } catch(error) {
      console.log(err.response);
    }
  };

  const follow = async (username) => {
    
    try {
      const response = await axios.get(`api/v1/user/follow/${username}`);
      setError(response.data)
      console.log(response.data);
    } catch(error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  useEffect(() => {
    getFriends();
    getUserProfile()
    getUserPost()
    getAround()
  }, []);

  return (
    <SafeAreaView>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
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
              <Text style={styles.quickinfoTxtUpper}>Following</Text>
              <Text style={styles.quickInfoTxtLower}>{0}</Text>
            </View>
          </View>

        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.contHeaderTxt}>Bio</Text>
          <Text>{sessionUser.Bio}</Text>
          <Text style={styles.contHeaderTxt}>Username</Text>
          <Text>{sessionUser.username}</Text>
          <Text style={styles.contHeaderTxt}>Email</Text>
          <Text>{sessionUser.email}</Text>
        </View>

        <View style={styles.people}>
          <Text style={styles.contHeaderTxt}>Discover People</Text>
          <Discoveredusers data={aroundYou} follow={follow} />
        </View>

        <View style={styles.following}>
          <Text style={styles.contHeaderTxt}>following</Text>
          <Following data={friends} />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorContainer:{
    alignItems: 'center',
    marginTop:60,
    backgroundColor: 'rgb(15, 20, 25)',
    padding: 10,
    height: 40,
    position:"absolute",
    width:'90%',
    top:50,
    left:15,
    borderRadius:10
  },
  errorText:{
    fontSize: 15,
    color:'white'
  },
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