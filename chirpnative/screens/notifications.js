import React from 'react'
import {SafeAreaView,ScrollView,StyleSheet,Dimensions,ActivityIndicator,RefreshControl} from 'react-native'
import Header from '../components/header'
import Notifications from '../components/notifications'
import axios from 'axios'
import { useState,useEffect,useCallback } from 'react'
import useApp from '../hooks/useApp'

const AppNotifications = () => {
  const {token} = useApp();
  const [items,setItems] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [error,setError] = useState("")
  const windowWidth = Dimensions.get('window').width;
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])
  
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

const onRefresh = useCallback(async()=>{
  setRefreshing(true);
  getNotifications()
  setRefreshing(false);
},[])

  return (
    <SafeAreaView style={styles.container}>
      {error && (<View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>)}
    <Header title={'Notifications'}/>
    {items.length > 0?
    (<ScrollView style={styles.body} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Notifications data={items}/>
    </ScrollView>):<ActivityIndicator size="large" color="black" style={{marginTop:'70%'}}/>}
      
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
  },
  container:{
    flex:1,
  },
  body:{
    height:'90%',
    width:'100%'
  }
})

export default AppNotifications