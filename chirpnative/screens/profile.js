import {React,useState} from 'react'
import {View,Text,ScrollView,SafeAreaView,StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator,RefreshControl} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import Header from '../components/header'
import ProfilePlaceholder from '../components/Profiletextplace'
import Discoveredusers from '../components/discoveredusers'
import { Discovered } from '../mockdata/Discoveredpeople'
import NewscategoryItems from '../components/newscategoryItems'
import { useNavigation } from '@react-navigation/native';
import Following from '../components/following'
import Wallcomponents from '../components/wallcomponent'
import axios from 'axios'
import {useEffect,useCallback }from 'react'
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp'

const Profile = () => {
  const windowWidth = Dimensions.get('window').width;
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])
  const navigation = useNavigation();
  const [friends,setFriends] = useState([])
  const [sessionUser,setSessionUser] = useState({})
  const [posts,setPosts] = useState([])
  const [aroundYou,setAroundYou] = useState([])
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [loading,setLoading] = useState(true)


  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

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
  
  const getUserProfile = async () => {
    try{
      
      const response = await axios.get('api/v1/user/getUser');
       setSessionUser(response.data)
       console.log(response.data);
       setLoading(false)
    }catch(error) {
      if (error.response) {
        setError(error.response.data)
        setLoading(false)
      } 
    }
  }

  const getUserPost = async () => {
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
      console.log(response.data)
      setAroundYou(response.data)
    } catch(error) {
      setError(error.response.data)
    }
  };

  const follow = async (username) => {
    try {
      const response = await axios.get(`api/v1/user/follow/${username}`);
      setNotification(response.data)
      console.log(response.data);
    } catch(error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  const onRefresh = useCallback(async()=>{
    setLoading(true)
    setRefreshing(true);
    getUserProfile()
    getFriends();
    getUserPost()
    getAround()
    setRefreshing(false);
  },[])

  useEffect(() => {
    getFriends();
    getUserProfile()
    getUserPost()
    getAround()
  }, []);

  return (
    <SafeAreaView style={[styles.container,{padding:windowWidth * 0.02}]}>
      {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
      {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
      
        <ScrollView style={styles.wrapper} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={[styles.profileQuickInfo,{padding:windowWidth*0.03, height:windowWidth * 0.3,marginBottom:windowWidth * 0.07}]}>
          <View style={{alignItems:'center'}}>
          {sessionUser.profilepic?
          (<View style={{width:windowWidth * 0.20, height:windowWidth * 0.20}}>
          <Image resizeMode='cover' style={{ width: '100%', height: '100%',borderRadius:windowWidth * 0.5 }} source={{ uri: sessionUser.profilepic }} />
          </View>):
          (<View style={{marginBottom:windowWidth*0.02}}><ProfilePlaceholder username={'fikayo'} width={windowWidth * 0.16} height={windowWidth * 0.16} /></View>)
          }
          <TouchableOpacity onPress={() => navigation.navigate('editProfile')}><Text style={styles.imgtext}>Edit</Text></TouchableOpacity>
          </View>

          <View style={styles.quickInfoContainer}>
             <View style={styles.profileQuickInfoAnalContainer}>
              <Text style={{fontSize:windowWidth * 0.045,marginBottom:windowWidth * 0.02}}>posts</Text>
              <Text style={{fontSize:windowWidth * 0.045}}>{posts.length}</Text>
              </View>

            <View style={styles.profileQuickInfoAnalContainer}>
              <Text style={{fontSize:windowWidth * 0.045,marginBottom:windowWidth * 0.02}}>Following</Text>
              <Text style={{fontSize:windowWidth * 0.045}}>{friends.length}</Text>
            </View>
          </View>
        </View>
          
        {sessionUser?( <View style={styles.bioContainer}>
          <Text style={[styles.contHeaderTxt, {marginBottom:windowWidth * 0.02,fontSize:windowWidth*0.05}]}>Bio</Text>
          <Text style={{fontSize:windowWidth * 0.03,marginBottom:windowWidth * 0.02}}>{sessionUser.Bio?sessionUser.Bio:<Text>no Bio</Text>}</Text>
          <Text style={[styles.contHeaderTxt,{fontSize:windowWidth*0.05,marginBottom:windowWidth * 0.02}]}>Username</Text>
          <Text style={{fontSize:windowWidth*0.03,marginBottom:windowWidth * 0.02}}>{sessionUser.username?sessionUser.username:<Text>no username</Text>}</Text>
          <Text style={{fontSize:windowWidth*0.05, fontSize:20,marginBottom:windowWidth * 0.02}}>Email</Text>
          <Text style={{fontSize:windowWidth*0.03,marginBottom:windowWidth * 0.02}}>{sessionUser.email?sessionUser.email:<Text>no email</Text>}</Text>
          <Text style={{fontSize:windowWidth*0.05, fontSize:20,marginBottom:windowWidth * 0.02}}>State</Text>
          <Text style={{fontSize:windowWidth*0.03,marginBottom:windowWidth * 0.02}}>{sessionUser.state?sessionUser.state:<Text>no state</Text>}</Text>
          <Text style={{fontSize:windowWidth*0.05, fontSize:20,marginBottom:windowWidth * 0.02}}>Country</Text>
          <Text style={{fontSize:windowWidth*0.03,marginBottom:windowWidth * 0.02}}>{sessionUser.country?sessionUser.country:<Text>no country</Text>}</Text>
          <Text style={{fontSize:windowWidth*0.05, fontSize:20,marginBottom:windowWidth * 0.02}}>Zip</Text>
          <Text style={{fontSize:windowWidth*0.03,marginBottom:windowWidth * 0.02}}>{sessionUser.zipcode?sessionUser.zipcode:<Text>no zipcode</Text>}</Text>
        </View>):<ActivityIndicator size="large" color="black" style={{marginTop:'10%'}}/>}
       

        {aroundYou.length === 0 && (<View style={{height:windowWidth*0.7,marginTop:windowWidth*0.07}}>
          <Text style={{fontSize:windowWidth*0.05}}>Discover People</Text>
          {aroundYou.length>0?(<Discoveredusers data={aroundYou} follow={follow} />):<ActivityIndicator size="large" color="black" style={{marginTop:'10%'}}/>}
        </View>)}
        {friends.length>0 && ( 
        <View style={{height:windowWidth*0.4,width:'100%',marginBottom:windowWidth*0.03}}>
          <Text style={{fontSize:windowWidth*0.05}}>following</Text>
          {friends.length>0?(<Following data={friends} />):<ActivityIndicator size="large" color="black" style={{marginTop:'10%'}}/>}
        </View>)}
       
        
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
  container:{
    flex: 1
  },
  wrapper:{
    width:'100%',
    height:'90%'
  },
  profileQuickInfo:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  imgtext:{
    fontSize:18
  },
  profileQuickInfoAnalContainer:{
  flexDirection:'column',
  alignItems:'center'
  },
  quickInfoContainer:{
    width:'60%',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bioContainer:{
    width:'100%'
  },
  people:{
    width:'100%'
  },
  following:{
    width:'100%'
  },
  posts:{
    width:'100%',
    justifyContent:'center'
  }
})

export default Profile