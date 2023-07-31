import {View,Text,StyleSheet,Dimensions,Image,TouchableOpacity} from 'react-native'
import * as Font from 'expo-font'; 
import { useState } from 'react';

const ErrorComponent = (props) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const windowWidth = Dimensions.get('window').width;

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
        <View style={[styles.errorContainer,{padding:windowWidth * 0.01,paddingHorizontal:windowWidth * 0.05,borderRadius:windowWidth * 0.03,top:windowWidth*0.25}]}>
            <Text style={[styles.errorText,{fontSize:windowWidth * 0.04,fontFamily:"Poppins-Black"}]}>{props.text}</Text>
            <TouchableOpacity onPress={() => props.clearError() }><Image style={{ width:windowWidth * 0.045, height:windowWidth * 0.045}} 
            source={require('../assets/close.png')} resizeMode='cover' /></TouchableOpacity>
        </View>
    )
}

export default ErrorComponent

const styles = StyleSheet.create({
    errorContainer:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#DA3E52',
        position:"absolute",
        width:'95%',
        height:'10%',
        zIndex:1,
        flexDirection: 'row',
      },
      errorText:{
        color:'white',
        fontWeight:'bold'
      }
})