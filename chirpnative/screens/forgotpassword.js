
import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { useState, } from 'react';
import axios from "axios";

export default function Forgotpassword() {

    const [emailaddress,setEmailaddress] = useState("")
    const [error,setError] = useState("")

    const submit = async () => {
      try {
        const formData = { emailaddress };
        if(!emailaddress ) {
          setError(" field cant be empty")
        }
        const response = await axios.post('api/v1/user/forgotPassword', formData);
        setError(response.data)
        setEmailaddress('')
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
        <Text style={styles.headerTxt}>ForgotPassword</Text>
        </View>
        <View style={styles.rinputs}>
        
        <Text style={styles.forgotTxt}>  *** enter your email *** </Text> 

        <TextInput
        style={styles.rinput}
        value={emailaddress}
        onChangeText={text => setEmailaddress(text)}
        placeholder="email address"
        />
        
        <TouchableOpacity style={styles.fpbutton} onPress={submit}>
        <Text style={styles.fpsignuptxt}> submit </Text>
        </TouchableOpacity>
        </View>
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
    justifyContent: 'center'
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
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: 'rgb(15, 20, 25)',
      padding: 10,
      height: 55,
      width:'93%',
      margin: 12,
      marginTop:40,
      
    },
    fpsignuptxt:{
      fontSize:18,
      color:'white'
    },
    forgotTxt:{
      fontSize: 19,
      marginLeft:40,
      marginBottom:50,
      color:'black'
    },
    footerOtherTxt:{
      fontSize: 16,
      color:'#1D98F0',
      
    },
  rinput: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
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