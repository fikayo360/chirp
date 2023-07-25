import React, { useState } from 'react';
import { View, Text, StyleSheet,Dimensions,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import useApp from '../hooks/useApp';
import * as Font from 'expo-font'; 


function Sidebar(props) {
    const windowWidth = Dimensions.get('window').width;
    const [selectedView, setSelectedView] = useState('topStories');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    if (!fontsLoaded) {
      loadFonts();
      return null; 
    }

    const isViewSelected = (view) => {
      return selectedView === view;
    };
    const navigation = useNavigation();
    const { logout } = useApp();
    const signOut = async () => {
      logout()
      navigation.navigate('Login')
    }
  return (
    <View style={[styles.container,{}]}>
      <View style={[styles.header, {height:'10%',paddingTop:windowWidth*0.05,paddingHorizontal:windowWidth*0.02}]}>
        <Text style={[styles.headerTxt,{fontSize:windowWidth*0.05,marginLeft:windowWidth * 0.01,fontFamily:'Poppins-Black'}]}>Chirp</Text>
        <Image style={{ width:windowWidth *0.1, height:windowWidth*0.1, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={[styles.drawerItemWrap,isViewSelected('topStories') && styles.selectedItem, { borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25} ]} >
        <DrawerItem
          label="topStories"
          pressColor="transparent"
          pressOpacity={0.8}
          onPress={() => {
            setSelectedView('topStories')
            props.navigation.navigate('topStories')
          }}
          style={[styles.drawerItem,{marginRight:windowWidth*0.05}]}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>

        <View style={[styles.drawerItemWrap,isViewSelected('technology') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="technology"
          onPress={() =>{
             setSelectedView('technology');
             props.navigation.navigate('technology',{cat: 'technology'})
            }}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>

        <View style={[styles.drawerItemWrap,isViewSelected('entertainment') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="entertainment"
          onPress={() => {
          setSelectedView('entertainment');
          props.navigation.navigate('entertainment',{cat: 'entertainment'})}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>

        <View style={[styles.drawerItemWrap,isViewSelected('sport') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="sport"
          onPress={() => {
          setSelectedView('sport');
          props.navigation.navigate('sport',{cat: 'sport'})}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>

        <View style={[styles.drawerItemWrap,isViewSelected('business') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="business"
          onPress={() => {
          setSelectedView('business');
          props.navigation.navigate('business',{cat: 'business'})}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>

        <View style={[styles.drawerItemWrap,isViewSelected('community') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="community"
          onPress={() => {
          setSelectedView('community');
          props.navigation.navigate('community')}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>
        <View style={[styles.drawerItemWrap,isViewSelected('createPost') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="createPost"
          onPress={() => {
          setSelectedView('createPost');
          navigation.navigate('createPost')}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>
        <View style={[styles.drawerItemWrap,isViewSelected('savedPost') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="savedPost"
          onPress={() => {
          setSelectedView('savedPost')
          props.navigation.navigate('savedPost')}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>
        <View style={[styles.drawerItemWrap,isViewSelected('search') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="search"
          onPress={() => {
          setSelectedView('search')
          props.navigation.navigate('search')}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>
        <View style={[styles.drawerItemWrap,isViewSelected('notifications') && styles.selectedItem,{ borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="notifications"
          onPress={() => {
          setSelectedView('notifications');
          props.navigation.navigate('notifications')}}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>
        <View style={[styles.drawerItemWrap,{borderTopRightRadius: windowWidth*0.25, borderBottomRightRadius: windowWidth*0.25}]} >
        <DrawerItem
          label="logout"
          onPress={signOut}
          style={styles.drawerItem}
          pressColor="transparent"
          pressOpacity={0.8}
          labelStyle={{
            fontSize:windowWidth*0.04,
            fontWeight:'bold',
            color:'black',
            fontFamily:'Poppins-Black'
          }}
        />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ECF0F1'
  },
  drawerItemWrap:{
    width:'95%',
  },
  drawerItem: {
    width:'70%'
  },
  drawerItemLabel: {
    color: 'white',
    marginLeft: 10,
    fontWeight:'bold'
  },
  selectedItem: {
    backgroundColor:'#3B60E4'
  },
  header: {
    width:'100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth:0.5
  },
  headerTxt: {
    color:'#191919',
  }
});

export default Sidebar;