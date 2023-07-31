import React from 'react'
import Discovereduser from './discovereduser'
import {View,ScrollView,StyleSheet} from 'react-native'

const Discoveredusers = (props) => {
    
    return (
        <ScrollView style={styles.Discovered} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
         props.data.length > 0 && props.data.map((item,index) => (
            <Discovereduser data={item} follow={props.follow} key={index.toString()}/>
        ))
        }
        </ScrollView>
        )
}

const styles= StyleSheet.create({
    Discovered:{
        width:'100%'
    }
})




export default Discoveredusers