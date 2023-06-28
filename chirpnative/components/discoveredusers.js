import React from 'react'
import Discovereduser from './discovereduser'
import {View,ScrollView,StyleSheet} from 'react-native'

const Discoveredusers = (props) => {
    return (
        <ScrollView style={styles.Discovered} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
        props.data && props.data.map(item => (
            <Discovereduser data={item} key={item.id}/>
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