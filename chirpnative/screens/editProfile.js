import React from 'react'
import {View,Text,TextInput,SafeAreaView,StyleSheet,Image,ScrollView,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native'
import * as Icons from "react-native-heroicons/solid"
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import uploadImageToFirebase from '../utils/uploadImage'
import { useState,useEffect } from 'react';
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import useApp from '../hooks/useApp';

const EditProfile = () => {
  const windowWidth = Dimensions.get('window').width;
  const {token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

    const [phonenumber,setPhonenumber] = useState('')
    const [profilepic,setProfilePic] = useState('')
    const [Bio,setBio] = useState('')
    const [country,setCountry] = useState('')
    const [state,setState] = useState('')
    const [zipcode,setZipcode] = useState('')
    const [error,setError] = useState("");
    const [notification,setNotification] = useState("")
    const [loading,setLoading] = useState(false)

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
      setLoading(true);
      if(!phonenumber||!profilepic||!Bio,!country||!state||!zipcode){
        setError('fields cant be empty');
      }
        try {
         uploadImageToFirebase(profilepic)
         .then(async(downloadURL) => {
           const response = await axios.post('api/v1/user/updateProfile', {phonenumber,profilepic:downloadURL,Bio,country,state,zipcode});
           setNotification(response.data)
           setPhonenumber("")
           setProfilePic("")
           setBio("")
           setCountry("")
           setState("")
           setZipcode("")
           console.log(response.data);
           setLoading(false)
       })
       .catch((error) => {
         console.log('Error:', error);
       });
       } catch (error) {
         if (error.response) {
           setError(error.response.data);
           setLoading(false);
         } 
       }
     };

  return (
    <SafeAreaView  >
    {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
    {loading && <ActivityIndicator size="large" color="black" style={{position:'absolute',top:'50%',left:'50%'}}/>}
    {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
    <View style={[styles.header,{height:'10%',paddingHorizontal:windowWidth*0.03,marginTop:windowWidth*0.02}]}>
    <Text style={{fontSize:windowWidth*0.05}}>complete profile </Text>
    <TouchableOpacity onPress={submit}>< Icons.CheckIcon width={windowWidth*0.08} height={windowWidth*0.08} color="black" /></TouchableOpacity>
    </View>

    <ScrollView style={[styles.container,{padding:windowWidth*0.02}]}>

    <View style={styles.secondContainer}>
    {profilepic?
    (<View style={[{width:windowWidth *0.38,alignSelf:'center',height:windowWidth * 0.35,marginBottom:windowWidth * 0.05}]} >
    <Image style={{width:'100%',height:'100%',borderRadius:windowWidth * 0.5,}} resizeMode='cover' source={{ uri:profilepic }}/>
   </View>):
  (<TouchableOpacity style={{
    width:windowWidth*0.25,
    height:windowWidth*0.25,
    borderRadius:0.5,
    marginTop:windowWidth*0.05,
    marginBottom:windowWidth*0.05}} onPress={handleImageSelection}>
  <Image source={require('../assets/photo1.png')} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
  </TouchableOpacity>)
    }
    </View>
    <View style={styles.formComponents}>
    <View style={[styles.formComponent,{height:windowWidth*0.15, marginBottom:windowWidth*0.15}]}>
        <Text style={{ fontSize:windowWidth*0.05}} >Phone Number </Text>
        <TextInput style={[ styles.formInput,{
        padding:windowWidth*0.03,
        fontSize: windowWidth*0.05,
        height:windowWidth*0.15
      }]}
       placeholder='enter number' value={phonenumber} onChangeText={text => setPhonenumber(text)}/>
    </View>
    <View style={[styles.formComponent,{height:windowWidth*0.15, marginBottom:windowWidth*0.15}]}>
    <Text style={{ fontSize:windowWidth*0.05}}>Bio</Text>
        <TextInput
        style={[styles.input,{
          padding:windowWidth*0.03,
          fontSize: windowWidth*0.05,
          height:windowWidth*0.15}]}
        multiline={true}
        numberOfLines={4}
        value={Bio}
        onChangeText={text => setBio(text)}
        placeholder="enter bio..."
        />
    </View>

    <View style={[styles.formComponent,{height:windowWidth*0.15, marginBottom:windowWidth*0.15}]}>
        <Text style={{ fontSize:windowWidth*0.05}}>country</Text>
        <TextInput style={[ styles.formInput,{
        padding:windowWidth*0.03,
        fontSize: windowWidth*0.05,
        height:windowWidth*0.15
      }]} placeholder='enter country' value={country} onChangeText={text => setCountry(text)}/>
    </View>

    <View style={[styles.formComponent,{height:windowWidth*0.15, marginBottom:windowWidth*0.15}]}>
    <Text style={{ fontSize:windowWidth*0.05}}>state</Text>
        <TextInput style={[ styles.formInput,{
        padding:windowWidth*0.03,
        fontSize: windowWidth*0.05,
        height:windowWidth*0.15
      }]} placeholder='enter state' value={state} onChangeText={text => setState(text)}/>
    </View>

    <View style={[styles.formComponent,{height:windowWidth*0.15, marginBottom:windowWidth*0.15}]}>
    <Text style={{ fontSize:windowWidth*0.05}}>Zip code</Text>
        <TextInput style={[ styles.formInput,{
        padding:windowWidth*0.03,
        fontSize: windowWidth*0.05,
        height:windowWidth*0.15
      }]} placeholder='enter name' value={zipcode} onChangeText={text => setZipcode(text)}/>
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
        height:'85%'
    },
    header:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    input:{
        borderBottomColor:'grey',
        borderBottomWidth:0.5,
        color: '#1F2937',
        textAlignVertical: 'top',
        width: '100%',
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
    formComponents:{
        width:'100%',
        height:'80%'
    },
    formComponent:{
        width:'100%'
    },
    formInput:{
        width:'100%',
        borderBottomColor:'grey',
        borderBottomWidth:0.5
    }
})
export default EditProfile