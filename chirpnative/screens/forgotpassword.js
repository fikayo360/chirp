
import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView,ScrollView,Image,Dimensions} from 'react-native';
import { useState, } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Forgotpassword() {
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

    const [emailaddress,setEmailaddress] = useState("")
    const [error,setError] = useState("")

    const setTokenToAsyncStorage = async (value) => {
      try {
        await AsyncStorage.setItem('email', value);
        console.log('email saved successfully');
      } catch (error) {
        console.log('Error saving token:', error);
      }
    };

    const submit = async () => {
      try {
        const formData = { emailaddress };
        if(!emailaddress ) {
          setError(" field cant be empty")
        }
        const response = await axios.post('api/v1/user/forgotPassword', formData);
        setError(response.data)
        setTokenToAsyncStorage(emailaddress)
        setEmailaddress('')
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
        <Text style={[styles.headerTxt,{fontSize:headerFontSize,marginLeft:windowWidth * 0.01}]}>{'ForgotPassword'}</Text>
        <Image style={{ width:imageWidth, height:imageWidth, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
        </View>

        <View style={[styles.rinputs,{paddingTop:windowWidth * 0.4}]}>
        <Text style={[styles.forgotTxt,{fontSize:windowWidth * 0.07}]}>  *** enter your email *** </Text> 

        <TextInput
        style={[styles.rinput, inputStyles ]}
        value={emailaddress}
        onChangeText={text => setEmailaddress(text)}
        placeholder="email address"
        />
        
        <TouchableOpacity style={[styles.fpbutton,ctaStyles]} onPress={submit}>
        <Text style={[styles.fpsignuptxt,{fontSize:windowWidth * 0.05}]}> submit </Text>
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
    fpbutton: {
      backgroundColor: 'rgb(15, 20, 25)',
      justifyContent: 'center',
      width:'95%'
    },
    fpsignuptxt:{
      color:'white'
    },
    forgotTxt:{
      color:'black'
    },
    footerOtherTxt:{
      fontSize: 16,
      color:'#1D98F0',
      
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