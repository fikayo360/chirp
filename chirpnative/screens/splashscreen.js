import { StyleSheet, Text, View,Image } from 'react-native';

export const Splashscreen = () => {
  return (
   <View style={styles.container}> 
    <Text style={styles.firstText}> Chirrp  </Text>
    <Image source={require('../assets/anime2.png')} resizeMode='contain' style={{ width: 300, height: 300 }} />
   </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#21295c',
    },

    firstText: {
        marginTop:30,
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
    
  });