import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView,ScrollView,Image,Dimensions} from 'react-native';
import { useState, } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ErrorComponent from '../components/errorComponent';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; 

export default function ChangePassword() {
  
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
    const [newPassword,setNewPassword] = useState("")
    const [emailaddress,setEmailaddress] = useState("")
    const [token,setToken] = useState("")
    const [error,setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const clearError = () => {
      setIsLoading(false)
      setError("")
    }
    const submit = async () => {
      try {
        
        const formData = { emailaddress,newPassword,token };
        console.log(formData);

        if(!newPassword || !token) {
          setIsLoading(false)
          setError(" fields cant be empty")
          return
        }

        setIsLoading(true)
        const response = await axios.post('api/v1/user/changePassword',formData);
        setIsLoading(false)
        setNewPassword('')
        setToken('')
        setIsLoading(false)
        navigation.navigate('Login')
      } catch (error) {
        if (error.response.data) {
          setIsLoading(false)
          setError(error.response.data);
        } 
      }
    };

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
      <Spinner visible={isLoading} textStyle={{ color: '#FFF' }} />
      <View style={[styles.header, {height:headerHeight,padding:windowWidth * 0.01,paddingTop:windowWidth * 0.07}]}>
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01,fontFamily:'Poppins-Black'}]}>{'changePassword'}</Text>
        <Image style={{ width:imageWidth, height:imageWidth, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
        </View>

        <View style={[styles.rinputs,{paddingTop:windowWidth * 0.4}]}>
        <TextInput
        style={[styles.rinput, inputStyles ]}
        onChangeText={text => setEmailaddress(text)}
        value={emailaddress}
        placeholder="enter email address"
        />
        <TextInput
        style={[styles.rinput, inputStyles ]}
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        placeholder="newpassword"
        secureTextEntry
        />

         <TextInput
        style={[styles.rinput, inputStyles ]}
        multiline={true}
        numberOfLines={4}
        value={token}
        onChangeText={text => setToken(text)}
        placeholder="paste your token here"
        secureTextEntry
        />
        
        <TouchableOpacity style={[styles.button,ctaStyles]} onPress={submit}>
        <Text style={[styles.signuptxt,{fontSize:windowWidth * 0.05,fontFamily:'Poppins-Black'}]}>change password</Text>
        </TouchableOpacity>

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
    borderColor:'black',
    width:'95%',
    borderWidth: 2
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