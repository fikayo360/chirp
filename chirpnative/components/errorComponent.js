import {View,Text,StyleSheet,Dimensions} from 'react-native'
const ErrorComponent = (props) => {
    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={[styles.errorContainer,{padding:windowWidth * 0.05,borderRadius:windowWidth * 0.03}]}><Text style={[styles.errorText,{fontSize:0.05}]}>{props.text}</Text></View>
    )
}

export default ErrorComponent

const styles = StyleSheet.create({
    errorContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CC2936',
        position:"absolute",
        width:'100%',
        height:'8%',
        bottom:0
      },
      errorText:{
        color:'white'
      }
})