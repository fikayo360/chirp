import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { useState, } from 'react';

export default function ChangePassword() {
    const [emailaddress,setEmailaddress] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [token,setToken] = useState("")
    const [error,setError] = useState("")
    
    const submit = async () => {
      try {
        const formData = { emailaddress,newPassword,token };
        if(!emailaddress || newPassword || token) {
          setError(" fields cant be empty")
        }
        const response = await axios.post('api/v1/user/changePassword', formData);
        setError(response.data)
        setEmailaddress('')
        setNewPassword('')
        setToken('')
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
        <Text style={styles.headerTxt}> ChangePassword</Text>
        </View>
        <View style={styles.rinputs}>

        <TextInput
        style={styles.rinput}
        value={emailaddress}
        onChangeText={text => setEmailaddress(text)}
        placeholder="email address"
        />
        <TextInput
        style={styles.rinput}
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        placeholder="newpassword"
        />

        <TextInput
        style={styles.rinput}
        onChangeText={text => setToken(text)}
        value={token}
        maxLength={50}
        placeholder="token"
        />
        
        <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.signuptxt}>change password</Text>
        </TouchableOpacity>

        </View>
      
    </SafeAreaView>
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
    justifyContent: 'center'
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(15, 20, 25)',
      padding: 10,
      height: 55,
      width:'93%',
      margin: 12,
      marginTop:50,
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
    height: 60,
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
  rinputs: {
    marginTop: 130
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