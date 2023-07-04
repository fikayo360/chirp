import { StyleSheet, Text,View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import { useState, } from 'react';

export default function ChangePassword() {
   
    const [newPassword,setNewPassword] = useState("")
    const [token,setToken] = useState("")
    

    const onChangeNumber = () => {}

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTxt}> ChangePassword</Text>
        </View>
        <View style={styles.rinputs}>
        
        <TextInput
        style={styles.rinput}
        onChangeText={text => setNewPassword(text)}
        value={newPassword}
        placeholder=" newpassword"
        />

        <TextInput
        style={styles.rinput}
        onChangeText={text => setToken(text)}
        value={token}
        placeholder="token"
        />
        
        <TouchableOpacity style={styles.button} onPress={()=>{}}>
        <Text style={styles.signuptxt}>change password</Text>
        </TouchableOpacity>

        </View>
      
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