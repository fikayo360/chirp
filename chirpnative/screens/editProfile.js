import React from 'react'
import {View,Text,TextInput,SafeAreaView,StyleSheet,Image,ScrollView} from 'react-native'
import * as Icons from "react-native-heroicons/solid"


const EditProfile = () => {
  return (
    <SafeAreaView  >
    
    <View style={styles.header}>
    < Icons.XMarkIcon width={20} height={20} color="black" />
    <Text style={styles.editProfileTxt}>Edit profile </Text>
    < Icons.CheckIcon width={20} height={20} color="black" />
    </View>

    <ScrollView style={styles.container}>

    <View style={styles.secondContainer}>
    <View style={styles.imgContainer}>
     <Image source={require('../assets/culars.jpg')} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
    </View>
    <Text style={styles.editProfileText}> EDIT </Text>
    </View>

    <View style={styles.formComponents}>

    <View style={styles.formComponent}>
        <Text style={styles.formLabel}> Name</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}> Username</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}> Phone Number </Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>Bio</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>Zip code</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}> Location</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>
    <View style={styles.formComponent}>
        <Text style={styles.formLabel}>change phrase</Text>
        <TextInput style={ styles.formInput} placeholder='enter name'/>
    </View>

    </View>

    </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:20,
        height:'85%'
    },
    header:{
        width:'100%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5,
        marginTop:15
       
    },
    editProfileText:{
        fontSize:16,
        fontWeight:'bold'
    },
    secondContainer:{
        width:'100%',

        height:150,
        alignItems:'center'
    },
    imgContainer:{
        width:100,
        height:100,
        borderRadius:100/ 2,
        marginBottom:5
    },
    editProfileTxt:{
        fontSize:18
    },
    formComponents:{
        width:'100%'  
    },
    formComponent:{
        width:'95%',
        height:70
    },
    formLabel:{
        fontSize:16
    },
    formInput:{
        width:'100%',
        height:30,
        borderBottomColor:'grey',
        borderBottomWidth:0.5,
        padding:3,
        fontSize:13
        
    }
})
export default EditProfile