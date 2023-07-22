import React from 'react'
import ProfilePlaceholder from './Profiletextplace'
import {View,Text,StyleSheet,Dimensions} from 'react-native'



const CommentComponent = (props) => {
    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={[styles.container,{height:windowWidth * 0.20,padding:windowWidth * 0.02}]}>     
        <ProfilePlaceholder username={props.data.PostcommentAuthor} />
        <View>

        <View style={[styles.textHeader,{marginBottom:windowWidth * 0.03}]}>
        <Text style={[{fontSize:windowWidth*0.05}]}> {props.data.PostcommentAuthor} </Text>
        </View>

        <Text style={[{fontSize:windowWidth*0.031}]}> {props.data.PostcommentBody} </Text>
        </View>    

        </View>
      )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'100%'
    },
    textHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    }
})

export default CommentComponent