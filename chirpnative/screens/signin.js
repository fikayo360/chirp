import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { useState } from 'react';

export default function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    let passwordAttempt = 2

    const handlelogin = async(e) => {

      if (!password || !username ){
        console.log('error');
      }
          try{
          let formdata =  {username,password}
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
        <Text style={styles.headerTxt}>Chirp Login</Text>
        </View>
        <View style={styles.rinputs}>
        <TextInput
        style={styles.rinput}
        onChangeText={text => setUsername(text)}
        value={username}
        placeholder="username"
        />
        
        <TextInput
        style={styles.rinput}
        onChangeText={text => setUsername(text)}
        value={password}
        placeholder="password"
        />
        
        <TouchableOpacity style={styles.button} onPress={handlelogin}>
        <Text style={styles.signuptxt}>Login</Text>
        </TouchableOpacity>
        </View>
       <Text style={styles.footerTxt}>{passwordAttempt === 2 && ('forgotpassword')}</Text>
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
      marginTop:40,
      borderRadius:5
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
  rinput: {
    height: 70,
    margin: 15,
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