import {React,useState} from 'react'
import * as Icons from "react-native-heroicons/solid"
import {SafeAreaView,TextInput,ScrollView,StyleSheet,View,Text} from 'react-native'
import Header from '../components/header'
import { commentsData } from '../mockdata/comments'
import ProfilePlaceholder from '../components/Profiletextplace'
import CommentItems from '../components/comments'

const Commentscreen = () => {
  const [text, setText] = useState('');
  return (

        <SafeAreaView>
        <Header title={'Comments'} />
        <View style={styles.upperContainer}>
        <ProfilePlaceholder username={'fikayo'}/>

        <View style={styles.textinputContainer}>
        <TextInput
        style={styles.input}
        multiline={true}
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder="add comment"
        placeholderTextColor={'black'}
        /> 
        <View style={styles.paperIconCont}><Icons.PaperAirplaneIcon width={20} height={20} color="black" /></View>
        </View>
        </View>
        
        <ScrollView style={styles.scrollContainer}>
          <CommentItems data={commentsData} />
        </ScrollView>  

        </SafeAreaView>
      
  )
}

const styles = StyleSheet.create({
  scrollContainer:{
    width:'100%',
    height:'70%'
  },
  paperIconCont:{
    position:'absolute',
    top:10,
    right:5
  },
  textinputContainer:{
    width:'90%',
    marginLeft:10,
    height:95,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:5,
    padding:5,
    flexDirection:'row',
    justifyContent:'space-between',
    position:'relative'
  },
  upperContainer:{
    width:'100%',
    height:150,
    flexDirection:'row',
    padding:17,
    paddingTop:25,
    borderBottomColor:'grey',
    borderBottomWidth:0.5
  },
  input:{
    borderColor: '#9CA3AF',
    borderRadius: 5,
    fontSize:17,
    color: '#1F2937',
    textAlignVertical: 'top'
  },

})

export default Commentscreen