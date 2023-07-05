import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    let passwordAttempt = 2

    const handleLogin = async () => {
      try {
        const formData = { username, password };
        console.log(formData);
        if(!username || !password || !email ) {
          setError("All fields are required")
        }
        
        const response = await axios.post('api/v1/user/login', formData);
        console.log(response.data)
        await AsyncStorage.setItem('token', response.data.cookie);
        setUsername('') 
        setPassword('') 
        setEmail('') 
        setConfirm('')
        setError("")
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } 
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
        <View style={styles.header}>
        <Text style={styles.headerTxt}>Chirp Login</Text>
        </View>
        <View style={styles.rinputs}>
        <TextInput
        style={styles.rinput}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="username"
        />
        
        <TextInput
        style={styles.rinput}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="password"
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.signuptxt}>Login</Text>
        </TouchableOpacity>
        </View>
       <Text style={styles.footerTxt}>{passwordAttempt === 2 && ('forgotpassword')}</Text>
    </SafeAreaView>
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
    justifyContent: 'center'
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(15, 20, 25)',
      padding: 10,
      height: 55,
      width:'93%',
      margin: 12,
      marginTop:40,
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
  rinput: {
    height: 70,
    margin: 15,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    borderColor:'black'
  },
  header: {
    justifyContent: 'center',
    marginTop: 50
  },
  headerTxt: {
    marginLeft:13,
    fontSize: 25,
    color:'#1D98F0',
    fontWeight:'bold'
  },
  rinputs: {
    marginTop: 170
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