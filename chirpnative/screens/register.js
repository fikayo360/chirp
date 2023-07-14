import { StyleSheet, Text,View,TouchableOpacity,ActivityIndicator,TextInput,Image,Dimensions,ScrollView} from 'react-native';
import { useState } from 'react';
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

export default function Register() {

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
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirm,setConfirm] = useState("")
  const [error,setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  
    
    const handleLogin = async () => {
      try {
        const formData = { username, password, email };
        setIsLoading(true)
        if(!username || !password || !email || !confirm) {
          setError("All fields are required")
        }
        else if(password!== confirm) {
          setError("Passwords do not match");
        }
        const response = await axios.post('api/v1/user/signup', formData);
        setIsLoading(!isLoading)
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
    
    <ScrollView style={styles.container}>
       {error !== "" && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}

        <View style={[styles.header, {height:headerHeight,padding:windowWidth * 0.01,paddingTop:windowWidth * 0.07}]}>
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01}]}>{`ChirpSignup`}</Text>
        <Image style={{ width:imageWidth, height:imageWidth, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
        </View>

        <View style={[styles.inputs,{paddingTop:windowWidth * 0.4}]}>
        <TextInput
        style={[styles.input, inputStyles ]}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="username"
        />
        <TextInput
        style={[styles.input, inputStyles ]}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        />
        <TextInput
       style={[styles.input, inputStyles ]}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="password"
        secureTextEntry
        />
        <TextInput
        style={[styles.input, inputStyles ]}
        onChangeText={text => setConfirm(text)}
        value={confirm}
        secureTextEntry
        placeholder="confirm password"
        />
         <TouchableOpacity style={[styles.button,ctaStyles]} onPress={handleLogin}>
        <Text style={[styles.signuptxt,{fontSize: windowWidth * 0.06}]}>
          {isLoading?(<Spinner visible={isLoading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />):'signup'}</Text>
        </TouchableOpacity>
       <Text style={[styles.footerTxt,{fontSize: windowWidth * 0.04,marginTop:windowWidth * 0.08,marginBottom:windowWidth * 0.03}]}>
        already a user <Text style={styles.footerOtherTxt}>Login</Text> </Text>
        </View>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  keyboard:{
    flex: 1,
  },
    container:{
      flex: 1,
      position:'relative'
    },
    errorContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:60,
      backgroundColor: 'black',
      padding: 10,
      height: 40,
      position:"absolute",
      width:'90%',
      height:'8%',
      top:50,
      left:15,
      borderRadius:10
    },
    errorText:{
      fontSize: 15,
      color:'white'
    },
    footer:{
      alignItems: 'center',
      justifyContent:'center',
      position: 'absolute',
      bottom: 20,
      width:'100%',
      height:'12%'
    },
    button: {
      backgroundColor: 'rgb(15, 20, 25)',
      justifyContent: 'center',
      width:'95%'
    },
    signuptxt:{
      color:'white'
    },
    footerTxt:{
      color:'black'
    },
    footerOtherTxt:{
      color:'#1D98F0'
    },
  input: {
    borderColor:'black',
    width:'95%',
    borderWidth: 2,
  },
  header: {
    width:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTxt: {
    color:'#191919',
    fontWeight:'bold',
  },
  inputs: {
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