import React from 'react'
import {SafeAreaView,Text,TextInput,TouchableOpacity,StyleSheet,View,Dimensions,ScrollView,Image,ActivityIndicator} from 'react-native'
import  Header  from '../components/header'
import { useState,useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import uploadImageToFirebase from '../utils/uploadImage'
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp';

const Post = () => {
  const windowWidth = Dimensions.get('window').width;
  const {token,currentUser} = useApp();
  const [postImg, setSelectedImage] = useState('')
  const [postAuthor, setAuthor] = useState('')
  const [postTitle,setPostTitle]= useState('')
  const [postBody,setPostBody]= useState('')
  const [error,setError] = useState("")
  const [notification,setNotification] = useState("")
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthor(currentUser.user.username)
  },[])
  
  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

  const handleImageSelection = async () => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      throw new Error('Permission to access media library was denied');
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.uri)
    }
  } catch (error) {
    console.log('Error selecting image:', error);
  }
}

const requestMediaLibraryPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission denied!');
  }
};

requestMediaLibraryPermissions();

  const submit = async () => {
    setLoading(true)
    if(!postBody || !postTitle || !postAuthor){
      setError('fields cant be empty');
      setLoading(false)
      return
    }
     try {
      uploadImageToFirebase(postImg)
      .then(async(downloadURL) => {
        console.log({postImg:downloadURL,postAuthor,postTitle,postBody});
        const response = await axios.post('api/v1/post/publish', {postImg:downloadURL,postAuthor,postTitle,postBody});
        console.log(response.data);
        setNotification(response.data)
        setSelectedImage('')
        setAuthor('')
        setPostTitle('')
        setPostBody('')
        setError('')
        setLoading(false)
    })
    .catch((error) => {
      console.log('Error:', error);
    });
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  };

  return (
    <>
    {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
    {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
    {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
    <Header title={'Post'}/>
    <ScrollView style={styles.container} > 
        <View style={[styles.body,{paddingVertical:windowWidth * 0.16}]}>
          {
            postImg && 
            (<View style={[{width:windowWidth *0.7,borderRadius:windowWidth * 0.02,alignSelf:'center',height:windowWidth * 0.4,borderWidth: 0.5,marginBottom:windowWidth * 0.05}]} >
            <Image style={[styles.img,{opacity:0.6}]} resizeMode='cover' source={{uri:postImg}}  />
            </View>)
          } 
     
        <TextInput
        style={[styles.input,
          {borderRadius: windowWidth * 0.02,
          borderWidth: 2,
          paddingHorizontal: windowWidth * 0.03,
          paddingVertical:windowWidth * 0.02,
          height:windowWidth * 0.6,
          fontSize: windowWidth * 0.05,
          marginBottom: windowWidth * 0.1}]}
        multiline={true}
        numberOfLines={4}
        value={postBody}
        onChangeText={text => setPostBody(text)}
        placeholder="whats on your mind..."
        placeholderTextColor={'black'}
        />
        <TextInput
        style={[styles.otherinput,
          {borderRadius: windowWidth * 0.02,
            borderWidth: 2,
            paddingHorizontal: windowWidth * 0.03,
            paddingVertical:windowWidth * 0.02,
            height:windowWidth * 0.15,
            fontSize: windowWidth * 0.05,
            marginBottom: windowWidth * 0.06}]}
        onChangeText={text => setPostTitle(text)}
        value={postTitle}
        placeholder="title"
        placeholderTextColor={'black'}
        />
       
        </View>
        <View style={[styles.buttonsComponent,{bottom:0,marginTop:windowWidth * 0.03,paddingHorizontal:windowWidth*0.02}]}>
        <TouchableOpacity style={[styles.button,{
        padding: windowWidth * 0.05,
        height: windowWidth * 0.16,
        width:windowWidth * 0.48,
        borderRadius:windowWidth * 0.4,}]} onPress={handleImageSelection}>
          <Text style={[styles.buttonTxt,{ fontSize:windowWidth*0.03}]}>AttachMedia</Text> 
        </TouchableOpacity>  
        <TouchableOpacity style={[styles.button,{
        padding: windowWidth * 0.05,
        height: windowWidth * 0.16,
        width:windowWidth * 0.48,
        borderRadius:windowWidth * 0.4,}]} onPress={submit}>
          <Text style={[styles.buttonTxt,{ fontSize:windowWidth*0.03}]}>Publish</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  body:{
    width: '100%',
    height:'100%',
    alignItems:'center'
  },
  img:{
    width:'100%',
    height:'100%'
  },
  container:{
    position:'relative',
    width:'100%',
    height:'90%'
  },
  input:{
    borderColor: 'black',
    color: '#1F2937',
    textAlignVertical: 'top',
    width: '85%'
  },
  otherinput:{
    borderColor: 'black',
    color: '#1F2937',
    textAlignVertical: 'top',
    width: '85%'
  },
  button:{
    alignItems: 'center',
    backgroundColor: 'rgb(15, 20, 25)',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonsComponent:{
    width:'100%',
    justifyContent:'space-between',
    flexDirection:'row',
    position:'absolute'
  },
  buttonTxt:{
    color:'white'
  }
})

export default Post