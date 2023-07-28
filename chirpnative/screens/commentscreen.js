import {React,useState,useEffect,useCallback} from 'react'
import * as Icons from "react-native-heroicons/solid"
import {SafeAreaView,TextInput,ScrollView,StyleSheet,View,TouchableOpacity,Text,Dimensions,ActivityIndicator,Image} from 'react-native'
import Header from '../components/header'
import ProfilePlaceholder from '../components/Profiletextplace'
import axios from 'axios'
import CommentItems from '../components/comments'
import { RefreshControl } from "react-native";
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp'

const Commentscreen = () => {
  const { token,postId,currentUser } = useApp()
  const [PostId,setPostId] = useState('')
  const [error,setError] = useState("");
  const [notification,setNotification] = useState("")
  const [refreshing, setRefreshing] = useState(false);
  const [loading,setLoading] = useState(true)
  const [PostcommentAuthor,setPostCommentAuthor] = useState("")
  const [PostcommentBody,setPostcommentBody] = useState("")
  const [PostcommentProfilePic,setpic] = useState("")
  const [items,setItems] = useState([])
  const [ProfilePic,setProfilePic] = useState("")
  const windowWidth = Dimensions.get('window').width;

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

  const getUser = () => {
    setPostId(postId) 
    setPostCommentAuthor(currentUser.user.username)
    setProfilePic(currentUser.user.profilepic || '')
    setpic(ProfilePic)
  };

  useEffect(()=> {
    getUser()
  },[])

  const createComment = async () => {
    setLoading(true)
    try {
      console.log({PostId,PostcommentAuthor,PostcommentBody,ProfilePic});
      if(!PostcommentBody){
        setError('fields cant be empty')
        setLoading(false)
        return
      }
      const response = await axios.post('api/v1/post/commentPost', {PostId,PostcommentAuthor,PostcommentBody,PostcommentProfilePic})
      console.log(response.data);
      setPostcommentBody('')
      setNotification(response.data)
      setLoading(false)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
        setLoading(false)
      } 
    }
  };

  const getComments = async () => {
    try {
      console.log(postId);
      const response = await axios.get('api/v1/post/getComments', {params: {PostId:postId}});
      if(response.data.postComments.length === 0){
        setError('no items found yet')
        return
      }
      console.log(response.data.postComments);
       setItems(response.data.postComments)
       setLoading(false)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data)
        setLoading(false)
      } 
    }
  }

  const onRefresh = useCallback(async()=>{
    setLoading(true)
    setRefreshing(true);
    getComments()
    setRefreshing(false);
  },[])

  useEffect(() => {
    getComments();
  }, []);
  
  return (
        <SafeAreaView style={styles.container}>
          {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
          {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
          {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}       

        <View style={styles.body}>
        <View style={[styles.upperContainer,{height:windowWidth * 0.40,padding:windowWidth * 0.04,paddingRight:windowWidth*0.03}]}>
        {ProfilePic?(<Image resizeMode='cover' style={{ width: windowWidth*0.1, height: windowWidth*0.1,borderRadius:windowWidth * 0.5 }} source={{ uri:ProfilePic }} />):
        <ProfilePlaceholder username={'fikayo'} width={windowWidth*0.1} height={windowWidth*0.1}/>}

        <View style={[styles.textinputContainer,{height:windowWidth * 0.25,borderRadius:windowWidth* 0.01,
        padding:windowWidth * 0.02,marginRight:windowWidth*0.03,marginLeft:windowWidth * 0.01}]}>
        <TextInput
        style={[styles.input,{fontSize:windowWidth * 0.05}]}
        multiline={true}
        value={PostcommentBody}
        onChangeText={(value) => setPostcommentBody(value)}
        placeholder="add comment"
        placeholderTextColor={'black'}

        /> 
        <TouchableOpacity style={[styles.paperIconCont,{top:windowWidth * 0.04, right:windowWidth * 0.02}]} onPress={createComment}><Icons.PaperAirplaneIcon width={windowWidth * 0.06} height={windowWidth * 0.06} color="black" /></TouchableOpacity>
        </View>
        </View>
        {items.length > 0 && ( 
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <CommentItems data={items} />
        </ScrollView>)}
        </View>

        </SafeAreaView>
      
  )
}

const styles = StyleSheet.create({
  container:{
 flex: 1,
  },
  errorContainer:{
    alignItems: 'center',
    marginTop:40,
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
  scrollContainer:{
    width:'100%',
    height:'70%'
  },
  paperIconCont:{
    position:'absolute'
  },
  textinputContainer:{
    width:'88%',
    borderWidth:1,
    borderColor:'grey',
    flexDirection:'row',
    justifyContent:'space-between',
    position:'relative'
  },
  upperContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'grey',
    borderBottomWidth:0.5
  },
  input:{
    borderColor: '#9CA3AF',
    color: '#1F2937',
    textAlignVertical: 'top'
  },
  body:{
    width: '100%',
    height:'80%'
  }
})

export default Commentscreen