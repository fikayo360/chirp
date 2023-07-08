
import React from 'react'
import {StyleSheet,SafeAreaView,ScrollView} from 'react-native'
import NewscategoryItems from '../components/newscategoryItems'
import { useState,useEffect } from "react"
import Header from '../components/header'


const Newscategory = () => {

  const [data,setData]= useState([])
  let category = 'business'
 
  const submit = async () => {
    try {
      const response = await axios.get(`api/v1/news/getNewsCategory/general`);
      console.log(response.data);
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
        <Header title={'Category'} />
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