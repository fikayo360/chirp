import React from 'react'
import {View,StyleSheet} from 'react-native'

const Seperator = () => {
  return (
    <View style={styles.line}>
    </View>
  )
}

const styles = StyleSheet.create({
 line:{
    borderWidth: 1,
    borderColor: "grey"
}
});

export default Seperator