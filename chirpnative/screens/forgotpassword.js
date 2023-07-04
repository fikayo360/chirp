
import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { useState, } from 'react';

export default function Forgotpassword() {

    const [emailaddress,setEmailaddress] = useState("")
    

    const onChangeNumber = () => {}

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTxt}>ForgotPassword</Text>
        </View>
        <View style={styles.rinputs}>
        
        <Text style={styles.forgotTxt}>  *** enter your email *** </Text> 

        <TextInput
        style={styles.rinput}
        onChangeText={text => setUsername(text)}
        value={emailaddress}
        placeholder="email address"
        />
        
        <TouchableOpacity style={styles.fpbutton} onPress={()=>{}}>
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