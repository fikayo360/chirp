import { StyleSheet, Text,View,TouchableOpacity,SafeAreaView,TextInput} from 'react-native';
import { useState } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    const [error,setError] = useState("")
    
    const handleLogin = async () => {
      try {
        const formData = { username, password, email };
        
        if(!username || !password || !email || !confirm) {
          setError("All fields are required");
        }
        else if(password!== confirm) {
          setError("Passwords do not match");
        }
        console.log(formData);
        setUsername('') 
        setPassword('') 
        setEmail('') 
        setConfirm('')
         
        const response = await axios.post('/api/v1/user/signup', formData);
        // await AsyncStorage.setItem('token', response.data.cookie);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data); 
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request); 
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
       {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
        <View style={styles.header}>
        <Text style={styles.headerTxt}>{`Chirp Signup`}</Text>
        </View>
        <View style={styles.inputs}>
        <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="username"
        />
        <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        />
        <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="password"
        />
        <TextInput
        style={styles.input}
        onChangeText={text => setConfirm(text)}
        value={confirm}
        placeholder="confirm password"
        />
        </View>

        <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.signuptxt}>SignUp</Text>
        </TouchableOpacity>
       <Text style={styles.footerTxt}>already a user <Text style={styles.footerOtherTxt}>Login</Text> </Text>
        </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
      width: '100%',
      height:'100%',
      position:'relative'
    },
    errorContainer:{
      alignItems: 'center',
      marginTop:50,
      backgroundColor: 'rgb(15, 20, 25)',
      padding: 10,
      height: 55,
      position:"absolute",
      width:'90%',
      bottom:20,
      left:15
    },
    errorText:{
      fontSize: 15,
      color:'white'
    },
    footer:{
      justifyContent:'center',
      position: 'absolute',
      bottom: 20,
      width:'100%'
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(15, 20, 25)',
      padding: 10,
      height: 55,
      width:'93%',
      margin: 12,
      borderRadius:5,   
    },
    signuptxt:{
      fontSize:20,
      color:'white'
    },
    footerTxt:{
      fontSize: 17,
      color:'black',
      marginTop:23,
      marginLeft:100,
    },
    footerOtherTxt:{
      fontSize: 16,
      color:'#1D98F0',
      
    },
  input: {
    height: 54,
    margin: 12,
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
  inputs: {
    marginTop: 100
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