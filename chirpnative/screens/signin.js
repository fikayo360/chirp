import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView,Dimensions,ScrollView,Image} from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import useApp from '../hooks/useApp';
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import * as Font from 'expo-font'; 

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
      fontFamily:'Poppins-Black'
  }
  const ctaStyles = {height:windowWidth * 0.18,borderRadius: windowWidth * 0.5,padding:windowWidth * 0.03,alignItems:'center',marginTop: windowWidth * 0.09}
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [notification,setNotification] = useState("")
    const [passwordAttempt,setPasAttempt] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const getDetails = () => {
      console.log({ token, currentUser, setToken, setCurrentUser });
    };

    const clearError = () => {
      setError("")
    }
    const clearNotification = () => {
      setNotification("")
    }

    const handleLogin = async () => {
      try {
        if (!username || !password) {
          setIsLoading(false)
          setError("All fields are required");
        } else {
          const formData = { username, password };
          setIsLoading(true)
          const response = await axios.post('api/v1/user/login', formData);
          const restoken = response.data.cookie
          const sesUser = response.data
          login(sesUser, restoken)
          setIsLoading(false)
          setUsername('');
          setPassword('');
          setError('');
          navigation.navigate('Home');
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error.response.data);
        setError(error.response.data);
        if(error.response.data === 'wrong password'){
          setPasAttempt((prevAttempts) => prevAttempts + 1)
          console.log(passwordAttempt);
        }
      }
    };

    useEffect(()=>{
      getDetails()
    },[])

    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    };
  
    if (!fontsLoaded) {
      loadFonts();
      return null; 
    }

  return (
    <ScrollView style={styles.container}>
      {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
      {notification !== "" && (<NotificationAlert text={notification} clearNotification={clearNotification}/>)}
      <Spinner visible={isLoading} textStyle={{ color: '#FFF' }} />
        <View style={[styles.header, {height:headerHeight,padding:windowWidth * 0.01,paddingTop:windowWidth * 0.07}]}>
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01,fontFamily:'Poppins-Black'}]}>ChirpLogin</Text>
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
        <Text style={[styles.signuptxt,{fontSize: windowWidth * 0.06,fontFamily:'Poppins-Black'}]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() =>{ 
          setError("")
          navigation.navigate('forgotPassword')
        }
          }><Text style={[styles.footerTxt,{fontSize: windowWidth * 0.05,marginTop:windowWidth * 0.08,marginBottom:windowWidth * 0.03,color:'red',fontFamily:'Poppins-Black'}]}>
          {passwordAttempt >= 2 && ('forgot password')}</Text></TouchableOpacity>
        </View>
       
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
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