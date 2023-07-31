import { StyleSheet, Text,View,TouchableOpacity,TextInput,Image,Dimensions,ScrollView} from 'react-native';
import { useState,useEffect } from 'react';
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import ErrorComponent from '../components/errorComponent';
import NotificationAlert from '../components/notificationAlert';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Font from 'expo-font'; 

export default function Register() {
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
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirm,setConfirm] = useState("")
  const [error,setError] = useState("")
  const [notification,setNotification] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const clearError = () => {
    setError("")
  }
  const clearNotification = () => {
    setNotification("")
  }

    const handleLogin = async () => {
      try {
        const formData = { username, password, email };
        if(!username || !password || !email || !confirm) {
          setIsLoading(false)
          setError("All fields are required")
          return
        }
        else if(password!== confirm) {
          setIsLoading(false)
          setError("Passwords do not match");
          return
        }
        setIsLoading(true)
        const response = await axios.post('api/v1/user/signup', formData);
        setIsLoading(false)
        setUsername('') 
        setPassword('') 
        setEmail('') 
        setConfirm('')
        setError("")
        navigation.navigate('Login')
      } catch (error) {
        if (error.response) {
          setIsLoading(false)
          setError(error.response.data);
        } 
      }
    };
    useFocusEffect(() => {
      const handleBackPress = () => {
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backHandler.remove();
    });

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
       <Spinner visible={isLoading} textStyle={{ color: 'blue' }} />
        <View style={[styles.header, {height:headerHeight,padding:windowWidth * 0.01,paddingTop:windowWidth * 0.07}]}>
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01, fontFamily:'Poppins-Black'}]}>{`ChirpSignup`}</Text>
        <Image style={{ width:imageWidth, height:imageWidth, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
        </View>

        <View style={[styles.inputs,{paddingTop:windowWidth * 0.25}]}>
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
        <Text style={[styles.signuptxt,{fontSize: windowWidth * 0.06, fontFamily:'Poppins-Black'}]}>signup</Text>
        </TouchableOpacity>
        <View style={{width:'80%',alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
        
       <Text style={[styles.footerTxt,{fontSize: windowWidth * 0.04,marginTop:windowWidth * 0.08,marginBottom:windowWidth * 0.03, fontFamily:'Poppins-Black'}]}>
        already a user 
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.footerOtherTxt}><Text style={[styles.login,{marginTop:windowWidth*0.054,
          marginLeft:windowWidth*0.025,fontSize: windowWidth * 0.04, fontFamily:'Poppins-Black'}]}>Login</Text>
        </TouchableOpacity> 

        </View>
        </View>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
 
    container:{
      flex: 1,
      position:'relative'
    },
    footer:{
      alignItems: 'center',
      justifyContent:'center',
      position: 'absolute',
      bottom: 20,
      width:'100%',
      height:'12%'
    },
    login:{
      color:'#006992'
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
  input: {
    borderColor:'black',
    width:'95%',
    borderWidth: 2,
    fontFamily:'Poppins-Black'
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