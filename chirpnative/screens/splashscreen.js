import { StyleSheet, Text, View,Image,Dimensions } from 'react-native';

export const Splashscreen = () => {

  const windowWidth = Dimensions.get('window').width;
  const fontSize = windowWidth * 0.2;
  const imageWidth = windowWidth * 0.84
  return (
   <View style={styles.container}> 
    <Text style={[styles.firstText, { fontSize }]}> #Chirrp  </Text>
    <Image source={require('../assets/anime2.png')} resizeMode='contain' style={{ width: imageWidth, height: imageWidth }} />
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
        color: '#EBE9E9',
        fontSize: 40,
        fontWeight: 'bold'
    }
    
  });