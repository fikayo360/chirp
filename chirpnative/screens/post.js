import React from 'react'
import {SafeAreaView,Text,TextInput,TouchableOpacity,StyleSheet,View,Dimensions,ScrollView,Image} from 'react-native'
import  Header  from '../components/header'
import { useState,useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import uploadImageToFirebase from '../utils/uploadImage'
import useApp from '../hooks/useApp';

const Post = () => {
  const windowWidth = Dimensions.get('window').width;
  const {token,currentUser} = useApp();
  const [postImg, setSelectedImage] = useState('')
  const [postAuthor, setAuthor] = useState('')
  const [postTitle,setPostTitle]= useState('')
  const [postBody,setPostBody]= useState('')
  const [error,setError] = useState("")

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthor(currentUser.user.username)
  },[])
  
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
    
     try {
      uploadImageToFirebase(postImg)
      .then(async(downloadURL) => {
        console.log({postImg:downloadURL,postAuthor,postTitle,postBody});
        const response = await axios.post('api/v1/post/publish', {postImg:downloadURL,postAuthor,postTitle,postBody});
        setError('post created')
        setSelectedImage('')
        setAuthor('')
        setPostTitle('')
        setPostBody('')
        setError('')
    })
    .catch((error) => {
      // Handle the error
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
    <Header title={'Post'}/>
    <ScrollView style={styles.container} >
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
       
        <View style={[styles.body,{paddingVertical:windowWidth * 0.16}]}>
          {
            postImg && 
            (<View style={[{width:windowWidth *0.8,borderRadius:windowWidth * 0.02,alignSelf:'center',height:windowWidth * 0.6,borderWidth: 1.4,marginBottom:windowWidth * 0.05}]} >
            <Image style={[styles.img,{opacity:0.6}]} resizeMode='cover' source={{uri:postImg}}  />
            </View>)
          } 
     
        <TextInput
        style={[styles.input,
          {borderRadius: windowWidth * 0.02,
          borderWidth: 2,
          paddingHorizontal: windowWidth * 0.03,
          paddingVertical:windowWidth * 0.02,
          height:windowWidth * 0.5,
          fontSize: windowWidth * 0.05,
          marginBottom: windowWidth * 0.1}]}
        multiline={true}
        numberOfLines={4}
        value={postBody}
        onChangeText={text => setPostBody(text)}
        placeholder="post something..."
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
          <Text style={styles.buttonTxt}>AttachMedia</Text> 
        </TouchableOpacity>  
        <TouchableOpacity style={[styles.button,{
        padding: windowWidth * 0.05,
        height: windowWidth * 0.16,
        width:windowWidth * 0.48,
        borderRadius:windowWidth * 0.4,}]} onPress={submit}>
          <Text style={styles.buttonTxt}>Publish</Text>
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
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute'
  },
  buttonTxt:{
    fontSize:14,
    color:'white'
  }
})

export default Post