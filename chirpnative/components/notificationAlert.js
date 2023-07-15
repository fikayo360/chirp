import {View,Text,StyleSheet,Dimensions} from 'react-native'

const NotificationAlert = (props) => {
    const windowWidth = Dimensions.get('window').width;
    
    return (
        <View style={[styles.notificationContainer,{padding:windowWidth * 0.01}]}><Text style={[styles.notificationText,{fontSize:windowWidth * 0.03}]}>{props.text}</Text></View>
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
        top:80
      },
      notificationText:{
        color:'white',
        fontWeight:'bold'
      }
})