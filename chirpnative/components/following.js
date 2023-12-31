import React from 'react'
import Followingcomponent from '../components/followingcomponent'
import {ScrollView,StyleSheet} from 'react-native'

const Following = (props) => {
  return (
    <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
     {
        props.data && props.data.map((item,index) => (
            <Followingcomponent data={item} key={index.toString()}/>
        ))
        }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:10
  }
})

export default Following