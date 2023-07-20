import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView,Dimensions,ScrollView,Image} from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import useApp from '../hooks/useApp';

export default function Login() {
  const { token, currentUser, setToken, setCurrentUser,login, logout} = useApp();
  const navigation = useNavigation();
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
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [passwordAttempt,setPasswordAttempt] = useState(0)
    const [isLoading, setIsLoading] = useState(false);

    const getDetails = () => {
      console.log({ token, currentUser, setToken, setCurrentUser });
    };

    const handleLogin = async () => {
      try {
        if (!username || !password) {
          setError("All fields are required");
        } else {
          const formData = { username, password };
          setIsLoading(true)
          const response = await axios.post('api/v1/user/login', formData);
          const restoken = response.data.cookie
          const sesUser = response.data
          console.log({restoken,sesUser});
          login(sesUser, restoken)
          console.log('user details saved');
          setIsLoading(false)
          setUsername('');
          setPassword('');
          setError('');
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log(error);
        {
          /*
          if (error.response.data) {
          setIsLoading(false)
          setError(error.response.data);
          console.log(error.response.data);
        }
        else if (error.response.data === "wrong password"){
          setIsLoading(false)
          setPasswordAttempt(current => current + 1)
          console.log(passwordAttempt)
        }
         else {
          setE
           */
        
        //error("An error occurred. Please try again later.");
        }
      }
    };

    useEffect(()=>{
      getDetails()
    },[])

  return (
    <ScrollView style={styles.container}>
      {error !== "" && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
      <Spinner visible={isLoading} textStyle={{ color: '#FFF' }} />
        <View style={[styles.header, {height:headerHeight,padding:windowWidth * 0.01,paddingTop:windowWidth * 0.07}]}>
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01}]}>ChirpLogin</Text>
        <Image style={{ width:imageWidth, height:imageWidth, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
        </View>

        <View style={[styles.rinputs,{paddingTop:windowWidth * 0.2}]}>
        <TextInput
        style={[styles.rinput, inputStyles ]}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="username"
        />
        
        <TextInput
        style={[styles.rinput, inputStyles ]}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="password"
        secureTextEntry
        />
        
        <TouchableOpacity style={[styles.button,ctaStyles]} onPress={handleLogin}>
        <Text style={[styles.signuptxt,{fontSize: windowWidth * 0.06}]}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.footerTxt,{fontSize: windowWidth * 0.04,marginTop:windowWidth * 0.08,marginBottom:windowWidth * 0.03}]}>{passwordAttempt >= 2 && ('forgotpassword')}</Text>
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
    backgroundColor: 'rgb(15, 20, 25)',
    justifyContent: 'center',
    width:'95%'
  },
    signuptxt:{
      fontSize:20,
      color:'white'
    },
    footerTxt:{
      color:'black'
    },
    footerOtherTxt:{
      fontSize: 16,
      color:'#1D98F0',
      
    },
    rinput: {
      borderColor:'black',
      width:'95%',
      borderWidth: 2,
    },
  rinputs: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'80%'
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
  reportErrorinputs: {
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