import React from 'react'
import {SafeAreaView,Text,TextInput,TouchableOpacity,StyleSheet,View} from 'react-native'
import  Header  from '../components/header'
import { useState } from 'react'
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'
import uploadImageToFirebase from '../utils/uploadImage'

const Post = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleClick = () => {
    ImagePicker.show({
      title: 'Select an Image',
      multiple: false,
      // Choose from camera or gallery
      mediaType: 'photo',
      // Resize the image to a maximum of 1024x1024
      width: 1024,
      height: 1024,
    }, (error, res) => {
      if (error) {
        console.log(error);
      } else {
        setImage(res);
      }
    });
  };
  const submit = async () => {
  {/*
    try {
      const response = await axios.post('api/v1/post/publish');
      setNewsItems(response.data.articles);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  */}
    
  };

  return (
    <SafeAreaView>
        <Header title={'Post'}/>
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder="post something..."
        placeholderTextColor={'black'}
        />
        <View style={styles.buttonsComponent}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonTxt}>AttachMedia</Text> 
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Publish</Text>
        </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    position:'relative',
    width:'100%',
    height:'88%'
  },
  input:{
    borderColor: '#9CA3AF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    color: '#1F2937',
    textAlignVertical: 'top',
    marginBottom: 20,
    width: '100%',
    height:'75%'
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