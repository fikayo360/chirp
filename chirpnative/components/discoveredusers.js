import React from 'react'
import Discovereduser from './discovereduser'
import {View,ScrollView,StyleSheet} from 'react-native'

const Discoveredusers = (props) => {
    
    return (
        <ScrollView style={styles.Discovered} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
         props.data.length > 0 && props.data.map((item) => (
            <Discovereduser data={item} follow={props.follow}/>
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