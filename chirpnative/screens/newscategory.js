
import React from 'react'
import {StyleSheet,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl} from 'react-native'
import NewscategoryItems from '../components/newscategoryItems'
import { useState,useEffect,useCallback } from "react"
import Header from '../components/header'
import axios from "axios";
import useApp from '../hooks/useApp'


const Newscategory = ({route}) => {
  const {cat} = route.params
  const [data,setData]= useState([])
  const [refreshing, setRefreshing] = useState(false);
  const { token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const submit = async () => {
    try {
      const response = await axios.get(`api/v1/news/getNewsCategory/${cat}`);
      console.log(response.data.articles);
      setData(response.data);
    } catch (error) {
      if (error.response) {
        //setError(error.response.data);
        console.log(error.response.data);
      } 
    }
  };

  const onRefresh = useCallback(async()=>{
    setRefreshing(true);
    submit()
    setRefreshing(false);
  },[])

 useEffect(() => {
  submit()
 },[])

  return (
    
    <SafeAreaView style={styles.container}>
        <Header title={cat} />
        {data.length > 0? (
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <NewscategoryItems data={data} />
          </ScrollView>
        ):<ActivityIndicator size="large" color="black" style={{marginTop:'70%'}}/>}
    </SafeAreaView>
  
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Newscategory