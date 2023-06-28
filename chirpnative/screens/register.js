import { StyleSheet, Text,View,TouchableOpacity,SafeAreaView,TextInput} from 'react-native';
import { useState } from 'react';

export default function Register() {
    const [username,setUsername] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    const [secretPhrase,setSecretPhrase] = useState("")

    const onChangeNumber = () => {}

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTxt}>Chirp Signup</Text>
        </View>
        <View style={styles.inputs}>
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={username}
        placeholder="username"
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={phoneNumber}
        placeholder="PhoneNumber"
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={email}
        placeholder="Email"
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
        placeholder="password"
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={confirm}
        placeholder="confirm password"
        />
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={secretPhrase}
        placeholder="Secret phrase"
        />
        <TouchableOpacity style={styles.button} onPress={()=>{}}>
        <Text style={styles.signuptxt}>SignUp</Text>
        </TouchableOpacity>
        </View>
       <Text style={styles.footerTxt}>already a user <Text style={styles.footerOtherTxt}>Login</Text> </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
      marginTop:20,
      borderRadius:5
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
    marginTop: 30
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