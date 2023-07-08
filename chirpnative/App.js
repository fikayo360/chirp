
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ChangePassword from './screens/changepassword';
import Forgotpassword from './screens/forgotpassword';
import Register from './screens/register';
import Login from './screens/signin';
import { Splashscreen } from './screens/splashscreen';

import Newscategory from './screens/newscategory';
import Aroundyou from './screens/aroundyou';
import Post from './screens/post';
import Wall from './screens/wall';
import Article from './screens/article';
import Savedpost from './screens/savedpost';
import Notifications from './screens/notifications';
import AppNotifications from './screens/notifications';
import Home from './screens/home';
import Commentscreen from './screens/commentscreen';
import EditProfile from './screens/editProfile';
import Profile from './screens/profile';
import Webview from './screens/webview';
axios.defaults.baseURL = 'https://74b6-105-112-190-69.eu.ngrok.io/';


export default function App() {
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
      return null; 
    }
  };
  
  // Set the bearer token for Axios requests
  const setBearerToken = async () => {
    const token = await getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('no token provided');
    }
  };

  setBearerToken();

  return (
    <>
    <Aroundyou/>
    </>
  );
}

