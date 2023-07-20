import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from '../hooks/useApp';

function Sidebar(props) {
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const { logout } = useApp();
    const signOut = async () => {
      logout()
      navigation.navigate('Login')
    }
  return (
    <View style={[styles.container,{ paddingTop: windowWidth * 0.07}]}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="topStories"
          onPress={() => props.navigation.navigate('topStories')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="technology"
          onPress={() => props.navigation.navigate('technology',{cat: 'technology'})}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="entertainment"
          onPress={() => props.navigation.navigate('entertainment',{cat: 'entertainment'})}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="sport"
          onPress={() => props.navigation.navigate('sport',{cat: 'sport'})}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="business"
          onPress={() => props.navigation.navigate('business',{cat: 'business'})}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="community"
          onPress={() => navigation.navigate('community')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="createPost"
          onPress={() => navigation.navigate('createPost')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="savedPost"
          onPress={() => props.navigation.navigate('savedPost')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="search"
          onPress={() => props.navigation.navigate('search')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="notifications"
          onPress={() => props.navigation.navigate('notifications')}
          style={styles.drawerItem}
        />
        <DrawerItem
          label="logout"
          onPress={signOut}
          style={styles.drawerItem}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3EFF5'
  },
  drawerItem: {
    marginTop:15
  },
  drawerItemLabel: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  }
});

export default Sidebar;