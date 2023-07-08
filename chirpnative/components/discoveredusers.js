import React from 'react'
import Discovereduser from './discovereduser'
import {View,ScrollView,StyleSheet} from 'react-native'

const Discoveredusers = ({items}) => {
    return (
        <ScrollView style={styles.Discovered} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
        items && items.map(item => (
            <Discovereduser data={item} />
        ))
        }
        </ScrollView>
        )
}

const styles= StyleSheet.create({
    Discovered:{
        width:'100%',
        marginTop:10
    }
})




export default Discoveredusers