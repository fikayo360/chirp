
import React from 'react'
import {StyleSheet,SafeAreaView,ScrollView} from 'react-native'
import NewscategoryItems from '../components/newscategoryItems'
import { useState,useEffect } from "react"
import Header from '../components/header'
import axios from "axios";
import useApp from '../hooks/useApp'


const Newscategory = ({route}) => {
  const {cat} = route.params
  const [data,setData]= useState([])

  const { token} = useApp();

  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },[])

  const submit = async () => {
    try {
      const response = await axios.get(`api/v1/news/getNewsCategory/${cat}`);
      console.log(response.data.articles);
      setData(response.data.articles);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } 
    }
  };

 useEffect(() => {
  submit()
 },[])

  return (
    <SafeAreaView style={styles.container}>
        <Header title={cat} />
        <ScrollView>
        <NewscategoryItems data={data} />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
    }
})

export default Newscategory