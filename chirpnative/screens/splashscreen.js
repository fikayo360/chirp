import { StyleSheet, Text, View } from 'react-native';

export const Splashscreen = () => {
  return (
   <View style={styles.container}> 
    <Text style={styles.firstText}> Chirrrrp!!  </Text>
   </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'rgb(29, 155, 240)',
    },

    firstText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
    
  });