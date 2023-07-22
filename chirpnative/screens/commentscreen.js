import {React,useState,useEffect} from 'react'
import * as Icons from "react-native-heroicons/solid"
import {SafeAreaView,TextInput,ScrollView,StyleSheet,View,TouchableOpacity,Text,Dimensions} from 'react-native'
import Header from '../components/header'
import ProfilePlaceholder from '../components/Profiletextplace'
import axios from 'axios'
import CommentItems from '../components/comments'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from '../hooks/useApp'

const Commentscreen = () => {
  const { token,postId,currentUser } = useApp()
  const [PostId,setPostId] = useState('')
  const [error,setError] = useState("")
  const [PostcommentAuthor,setPostCommentAuthor] = useState("")
  const [PostcommentBody,setPostcommentBody] = useState("")
  const [items,setItems] = useState([])
  const [ProfilePic,setProfilePic] = useState("")
  const windowWidth = Dimensions.get('window').width;

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const getUser = () => {
    setPostId(postId)
    setPostCommentAuthor(currentUser.user.username)
    setProfilePic(currentUser.user.profilepic || '')
  };

  useEffect(()=> {
    getUser()
  },[])


 

  const createComment = async () => {
    try {
      console.log({PostId,PostcommentAuthor,PostcommentBody,ProfilePic});
      const response = await axios.post('api/v1/post/commentPost', {PostId,PostcommentAuthor,PostcommentBody,ProfilePic})
      console.log(response.data);
      setError('Saved')
      setPostcommentBody('')
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  const getComments = async () => {
    try {
      console.log(postId);
      const response = await axios.get('api/v1/post/getComments', {params: {PostId:postId}});
      //console.log(response.data.postComments);
       setItems(response.data.postComments)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        //setError(error.response.data)
      } 
    }
  }


  useEffect(() => {
    getComments();
  }, []);
  
  return (
        <SafeAreaView style={styles.container}>
          {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}

        <View style={styles.body}>
        <View style={[styles.upperContainer,{height:windowWidth * 0.40,padding:windowWidth * 0.04}]}>
        <ProfilePlaceholder username={'fikayo'}/>

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
        
        <ScrollView style={styles.scrollContainer}>
          <CommentItems data={items} />
        </ScrollView>  

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
    width:'90%',
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