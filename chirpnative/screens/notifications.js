import React from 'react'
import {SafeAreaView,ScrollView,StyleSheet} from 'react-native'
import Header from '../components/header'
import Notifications from '../components/notifications'
import axios from 'axios'
import { useState,useEffect } from 'react'

const AppNotifications = () => {
  const [items,setItems] = useState([])
  const [error,setError] = useState("")


const getNotifications = async () => {
  try {
    const response = await axios.get('api/v1/notification/getAll')
    setItems(response.data)
    console.log(items);
  } catch (error) {
    if (error.response) {
      setError(error.response.data)
    } 
  }
};

useEffect(()=>{
  getNotifications()
},[])

  return (
    <SafeAreaView>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
    <Header title={'Notifications'}/>
      <ScrollView>
      <Notifications data={items}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  errorContainer:{
    alignItems: 'center',
    marginTop:40,
    backgroundColor: 'rgb(15, 20, 25)',
    padding: 10,
    height: 40,
    position:"absolute",
    width:'90%',
    top:50,
    left:15,
    borderRadius:10
  },
  errorText:{
    fontSize: 15,
    color:'white'
  }
})

export default AppNotifications