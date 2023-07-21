import React from 'react'
import {SafeAreaView,Text,TextInput,TouchableOpacity,StyleSheet,View} from 'react-native'
import  Header  from '../components/header'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import uploadImageToFirebase from '../utils/uploadImage'
import useApp from '../hooks/useApp';

const Post = () => {
  const {token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])
  const [postImg, setSelectedImage] = useState('')
  const [postAuthor, setAuthor] = useState('')
  const [postTitle,setPostTitle]= useState('')
  const [postBody,setPostBody]= useState('')
  const [error,setError] = useState("")
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
        const response = await axios.post('api/v1/post/publish', {postImg:downloadURL,postAuthor,postTitle,postBody});
        setError(response.data)
        setSelectedImage('')
        setAuthor('')
        setPostTitle('')
        setPostBody('')
        setError('')
        console.log(response.data);
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
    <SafeAreaView>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
        <Header title={'Post'}/>
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={postBody}
        onChangeText={text => setPostBody(text)}
        placeholder="post something..."
        placeholderTextColor={'black'}
        />
        <TextInput
        style={styles.otherinput}
        onChangeText={text => setPostTitle(text)}
        value={postTitle}
        placeholder="title"
        placeholderTextColor={'black'}
        />
        <TextInput
        style={styles.otherinput}
        onChangeText={text => setAuthor(text)}
        value={postAuthor}
        placeholder="username"
        placeholderTextColor={'black'}
        />
        <View style={styles.buttonsComponent}>
        <TouchableOpacity style={styles.button} onPress={handleImageSelection}>
          <Text style={styles.buttonTxt}>AttachMedia</Text> 
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonTxt}>Publish</Text>
        </TouchableOpacity>
        </View>
        </View>
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
    padding:10,
    position:'relative',
    width:'100%',
    height:'88%'
  },
  input:{
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    color: '#1F2937',
    textAlignVertical: 'top',
    marginBottom: 20,
    width: '85%',
    height:150
  },
  otherinput:{
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    color: '#1F2937',
    textAlignVertical: 'top',
    marginBottom: 20,
    width: '85%',
    height:50
  },
  button:{
    alignItems: 'center',
    backgroundColor: 'rgb(15, 20, 25)',
    padding: 10,
    height: 70,
    width:170,
    margin: 12,
    marginTop:20,
    borderRadius:8,
    margin:10,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonsComponent:{
    width:'100%',
    flexDirection:'row',
    position:'absolute',
    bottom:20,
    marginLeft:5
  },
  buttonTxt:{
    fontSize:14,
    color:'white'
  }
})

export default Post