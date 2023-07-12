import React from 'react'
import {View,Text,TextInput,SafeAreaView,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import uploadImageToFirebase from '../utils/uploadImage'
import { useState } from 'react';

const EditProfile = () => {
    const [phonenumber,setPhonenumber] = useState('')
    const [profilepic,setProfilePic] = useState('')
    const [Bio,setBio] = useState('')
    const [country,setCountry] = useState('')
    const [state,setState] = useState('')
    const [zipcode,setZipcode] = useState('')
    const [error,setError] = useState("")

    const handleImageSelection = async () => {
        try {
          const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!permissionResult.granted) {
            throw new Error('Permission to access media library was denied');
          }
      
          const pickerResult = await ImagePicker.launchImageLibraryAsync();
          if (!pickerResult.canceled) {
            setProfilePic(pickerResult.uri)
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
        if(!phonenumber || !profilepic || !Bio || !country || !state || !zipcode){
            setError('fields cant be empty');
        }
        try {
         uploadImageToFirebase(profilepic)
         .then(async(downloadURL) => {
           const response = await axios.post('api/v1/user/updateProfile', {phonenumber,profilepic:downloadURL,Bio,country,state,zipcode});
           setError(response.data)
           setPhonenumber("")
           setProfilePic("")
           setBio("")
           setCountry("")
           setState("")
           setZipcode("")
           console.log(response.data);
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
    <SafeAreaView  >
     {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
    <View style={styles.header}>
    <Text style={styles.editProfileTxt}>complete profile </Text>
    <TouchableOpacity onPress={submit}>< Icons.CheckIcon width={30} height={30} color="black" /></TouchableOpacity>
    </View>

    <ScrollView style={styles.container}>

    <View style={styles.secondContainer}>
    <TouchableOpacity style={styles.imgContainer} onPress={handleImageSelection}>
     <Image source={require('../assets/photo1.png')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
    </TouchableOpacity>
    </View>

    <View style={styles.formComponents}>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}> Phone Number </Text>
        <TextInput style={ styles.formInput} placeholder='enter number' value={phonenumber} onChangeText={text => setPhonenumber(text)}/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>Bio</Text>
        <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={Bio}
        onChangeText={text => setBio(text)}
        placeholder="enter bio..."
        placeholderTextColor={'black'}
        />
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>country</Text>
        <TextInput style={ styles.formInput} placeholder='enter country' value={country} onChangeText={text => setCountry(text)}/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>state</Text>
        <TextInput style={ styles.formInput} placeholder='enter state' value={state} onChangeText={text => setState(text)}/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>Zip code</Text>
        <TextInput style={ styles.formInput} placeholder='enter name' value={zipcode} onChangeText={text => setZipcode(text)}/>
    </View>
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
    container:{
        width:'100%',
        padding:20,
        height:'85%'
    },
    header:{
        width:'100%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5,
        marginTop:15
    },
    input:{
        borderBottomColor:'grey',
        borderBottomWidth:0.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        color: '#1F2937',
        textAlignVertical: 'top',
        marginBottom: 20,
        width: '100%',
        height:70
      },
    editProfileText:{
        fontSize:16,
        fontWeight:'bold',
        marginLeft:20
    },
    secondContainer:{
        width:'100%',

        height:150,
        alignItems:'center'
    },
    imgContainer:{
        width:100,
        height:100,
        borderRadius:100/ 2,
        marginTop:10,
        marginBottom:3
    },
    editProfileTxt:{
        fontSize:18
    },
    formComponents:{
        width:'100%',
        height:'70%'
    },
    formComponent:{
        width:'95%',
        height:70,
        marginBottom:30
    },
    formLabel:{
        fontSize:16
    },
    formInput:{
        width:'100%',
        height:30,
        borderBottomColor:'grey',
        borderBottomWidth:0.5,
        padding:3,
        fontSize:13
        
    }
})
export default EditProfile