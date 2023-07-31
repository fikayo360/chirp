import { StyleSheet, Text, View,Image,Dimensions } from 'react-native';
import { useEffect,useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; 

 const Splashscreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Register');
    }, 5000);
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const fontSize = windowWidth * 0.2;
  const imageWidth = windowWidth * 0.84

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    loadFonts();
    return null; 
  }

  return (
   <View style={styles.container}> 
    <Text style={[styles.firstText, { fontSize,fontFamily:'Poppins-Black' }]}> #Chirrp  </Text>
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

  export default Splashscreen