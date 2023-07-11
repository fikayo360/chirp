import React from 'react'
import Savedpost from '../components/savedpost'
import { View } from 'react-native'
import { useEffect } from 'react'

const Savedposts = (props) => {
  const [items,setItems] = useState([])
  const [error,setError] = useState("")

  const getSavedPost = async () => {
    try {
      const response = await axios.get('api/v1/post/getFriendsPost')
      setItems(response.data)
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } 
    }
  };

  useEffect(()=>{
    getSavedPost()
  },[])

  
  return (
    <View>
      {
          props.data && props.data.map((item,index) => (
            <Savedpost data={item} key={index} />
           ))
      }
  </View>
  )}

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

export default Savedposts