import { StyleSheet, Text,View,TouchableOpacity,SafeAreaView,TextInput} from 'react-native';
import { useState } from 'react';

export default function Register() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    

    const handlelogin = async(e) => {

      if (!password || !username  || confirm ||email){
          //
      }
          try{
          let formdata =  {username,password,email}
          console.log(formdata);
          /*
          const res = await axios.post("https://fksocial.onrender.com/v1/user/login",formdata)
          localStorage.setItem('token',res.data.token)
           */
          
          }catch(err){
            /* console.log(err.response.data) */
          }
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTxt}>{`Chirp Signup ${email}`}</Text>
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
       
        <TouchableOpacity style={styles.button} onPress={handlelogin}>
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