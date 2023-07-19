import {React,useState,useEffect} from 'react'
import * as Icons from "react-native-heroicons/solid"
import {SafeAreaView,TextInput,ScrollView,StyleSheet,View,TouchableOpacity,Text} from 'react-native'
import Header from '../components/header'
import ProfilePlaceholder from '../components/Profiletextplace'
import axios from 'axios'
import CommentItems from '../components/comments'

const Commentscreen = () => {
  const [error,setError] = useState("")
  const [PostId,setPostId] = useState("64ad27f684d5529baf5f7ffa")
  const [PostcommentAuthor,setPostCommentAuthor] = useState("fikayo")
  const [PostcommentBody,setPostcommentBody] = useState("")
  const [items,setItems] = useState([ ])

  const [ProfilePic,setProfilePic] = useState("https://firebasestorage.googleapis.com/v0/b/chirp-3e947.appspot.com/o/images%2F1688932202963?alt=media&token=cd511d7a-600a-4b4d-b7d7-b842d055d3a5")
 
  const createComment = async () => {
    try {
      const response = await axios.post('api/v1/post/commentPost', {PostId,PostcommentAuthor,PostcommentBody,ProfilePic})
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
      const response = await axios.get('api/v1/post/getComments', { params: { PostId } });
       setItems(response.data.postComments)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  }
  
  useEffect(() => {
    getComments();
  }, []);
  
  return (
        <SafeAreaView>
          {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
        <View style={styles.upperContainer}>
        <ProfilePlaceholder username={'fikayo'}/>

        <View style={styles.textinputContainer}>
        <TextInput
        style={styles.input}
        multiline={true}
        value={PostcommentBody}
        onChangeText={(value) => setPostcommentBody(value)}
        placeholder="add comment"
        placeholderTextColor={'black'}
        /> 
        <TouchableOpacity style={styles.paperIconCont} onPress={createComment}><Icons.PaperAirplaneIcon width={20} height={20} color="black" /></TouchableOpacity>
        </View>
        </View>
        
        <ScrollView style={styles.scrollContainer}>
          <CommentItems data={items} />
        </ScrollView>  

        </SafeAreaView>
      
  )
}

const styles = StyleSheet.create({
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
    position:'absolute',
    top:10,
    right:5
  },
  textinputContainer:{
    width:'90%',
    marginLeft:10,
    height:95,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:5,
    padding:5,
    flexDirection:'row',
    justifyContent:'space-between',
    position:'relative'
  },
  upperContainer:{
    width:'100%',
    height:150,
    flexDirection:'row',
    padding:17,
    paddingTop:25,
    borderBottomColor:'grey',
    borderBottomWidth:0.5
  },
  input:{
    borderColor: '#9CA3AF',
    borderRadius: 5,
    fontSize:17,
    color: '#1F2937',
    textAlignVertical: 'top'
  },

})

export default Commentscreen