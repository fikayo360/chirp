import {View,Text,StyleSheet,Dimensions,Image} from 'react-native'

const ErrorComponent = (props) => {
    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={[styles.errorContainer,{padding:windowWidth * 0.01}]}>
            <Text style={[styles.errorText,{fontSize:windowWidth * 0.03}]}>{props.text}</Text>
            <Image style={{ width:10, height:10,}} source={require('../assets/anime2.png')} resizeMode='cover' />
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
        height:'8%',
        top:80
      },
      errorText:{
        color:'white',
        fontWeight:'bold'
      }
})