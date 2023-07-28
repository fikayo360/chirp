import {View,Text,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native'

const NotificationAlert = (props) => {
    const windowWidth = Dimensions.get('window').width;
    
    return (
        <View style={[styles.notificationContainer,{padding:windowWidth * 0.01}]}><Text style={[styles.notificationText,{fontSize:windowWidth * 0.03}]}>{props.text}</Text>
        <TouchableOpacity onPress={() => props.clearNotification() }><Image style={{ width:windowWidth * 0.04, height:windowWidth * 0.04,}} 
            source={require('../assets/close.png')} resizeMode='cover' /></TouchableOpacity>
        </View>
    )
    
}

export default NotificationAlert

const styles = StyleSheet.create({
    notificationContainer:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000022',
        position:"absolute",
        width:'95%',
        height:'8%',
        zIndex:1,
        top:80
      },
      notificationText:{
        color:'white',
        fontWeight:'bold'
      }
})