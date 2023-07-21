import React from 'react'
import ProfilePlaceholder from './Profiletextplace'
import {View,Text,StyleSheet} from 'react-native'



const CommentComponent = (props) => {
   
    return (
        <View style={styles.container}>     
        <ProfilePlaceholder username={props.data.PostcommentAuthor} />
        <View>

        <View style={styles.textHeader}>
        <Text> {props.data.PostcommentAuthor} </Text>
        </View>

        <Text> {props.data.PostcommentBody} </Text>
        </View>    

        </View>
      )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        padding:5,
        width:'100%',
        height:100
    },
    textHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    }
})

export default CommentComponent