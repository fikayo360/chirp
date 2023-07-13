import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView,ScrollView,Image,Dimensions} from 'react-native';
import { useState, } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword() {
  const windowWidth = Dimensions.get('window').width;
  const headerFontSize = windowWidth * 0.07;
  const imageWidth = windowWidth * 0.14
  const headerHeight = windowWidth * 0.2
  const inputStyles = {
      height: windowWidth * 0.20,
      padding: windowWidth * 0.05,
      borderRadius: windowWidth * 0.03,
      margin: windowWidth * 0.05,
      fontSize: windowWidth * 0.05,
  }
  const ctaStyles = {height:windowWidth * 0.18,borderRadius: windowWidth * 0.5,padding:windowWidth * 0.03,alignItems:'center',marginTop: windowWidth * 0.09}
    const [newPassword,setNewPassword] = useState("")
    const [token,setToken] = useState("")
    const [error,setError] = useState("")
    
    const submit = async () => {
      try {
        const emailaddress = await AsyncStorage.getItem('email');
        const formData = { emailaddress,newPassword,token };
        console.log(formData);
        if(!emailaddress || !newPassword || !token) {
          setError(" fields cant be empty")
        }
        const response = await axios.post('api/v1/user/changePassword',formData);
        await AsyncStorage.removeItem('email');
        setError(response.data)
        setNewPassword('')
        setToken('')
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else{
          setError(error.Error)
        }
      }
    };

  return (
    <ScrollView style={styles.container}>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
      <View style={[styles.header, {height:headerHeight,padding:windowWidth * 0.01,paddingTop:windowWidth * 0.07}]}>
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01}]}>{'ForgotPassword'}</Text>
        <Image style={{ width:imageWidth, height:imageWidth, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
        </View>

        <View style={[styles.rinputs,{paddingTop:windowWidth * 0.4}]}>
        

        <TextInput
        style={styles.rinput}
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        placeholder="newpassword"
        />

         <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        value={token}
        onChangeText={text => setToken(text)}
        placeholder="token"
        />
        
        <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.signuptxt}>change password</Text>
        </TouchableOpacity>

        </View>
      
    </ScrollView>
  );
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
    flex: 1,
    position:'relative'
  },
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(15, 20, 25)',
      padding: 10,
      height: 55,
      width:'93%',
      margin: 12,
      marginTop:50,
      borderRadius:5
    },
    signuptxt:{
      fontSize:20,
      color:'white'
    },
    footerTxt:{
      fontSize: 17,
      marginTop:23,
      marginLeft:100,
      color:'#1D98F0',
    },
    footerOtherTxt:{
      fontSize: 16,
      color:'#1D98F0',
    },
    input:{
      margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor:'black'
    },
  rinput: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor:'black'
  },
  header: {
    width:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTxt: {
    color:'#191919',
    fontWeight:'bold'
  },
  rinputs: {
    justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height:'80%'
  },
  cta: {
    width:'80%',
    height:50,
    marginTop: 40
  },

  signupBtn: {
    width:'94%',
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)'
  }
});