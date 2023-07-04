import { StyleSheet, Text, View,Image } from 'react-native';

export const Splashscreen = () => {
  return (
   <View style={styles.container}> 
    <Text style={styles.firstText}> Chirrp  </Text>
     
   </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#0C6291',
    },

    firstText: {
        marginTop:30,
        color: '#30292F',
        fontSize: 30,
        fontWeight: 'bold'
    }
    
  });