import React, { useState } from 'react';
import { View, Text, StyleSheet,Dimensions,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import useApp from '../hooks/useApp';

function Sidebar(props) {
    const windowWidth = Dimensions.get('window').width;
    const [active,setActive] = useState(false)
    let bgcolor = '#A6A6A8'
    const navigation = useNavigation();
    const { logout } = useApp();
    const signOut = async () => {
      logout()
      navigation.navigate('Login')
    }
  return (
    <View style={[styles.container,{}]}>
      <View style={[styles.header, {height:'10%',paddingTop:windowWidth*0.05}]}>
        <Text style={[styles.headerTxt,{fontSize:windowWidth*0.05,marginLeft:windowWidth * 0.01}]}>Chirp</Text>
        <Image style={{ width:windowWidth *0.1, height:windowWidth*0.1, marginRight:windowWidth * 0.01}} source={require('../assets/anime2.png')} resizeMode='cover' />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={{width:'90%',borderEndStartRadius:5,borderEndEndRadius:5,backgroundColor:active && '#A6A6A8'}} >
        <DrawerItem
          label="topStories"
          onPress={() => {
            setActive(true)
            props.navigation.navigate('topStories')
          }}
          style={[styles.drawerItem,{marginRight:windowWidth*0.05}]}
        />
        </View>

        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="technology"
          onPress={() => props.navigation.navigate('technology',{cat: 'technology'})}
          style={styles.drawerItem}
        />
        </View>

        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="entertainment"
          onPress={() => props.navigation.navigate('entertainment',{cat: 'entertainment'})}
          style={styles.drawerItem}
        />
        </View>

        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="sport"
          onPress={() => props.navigation.navigate('sport',{cat: 'sport'})}
          style={styles.drawerItem}
        />
        </View>

        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="business"
          onPress={() => props.navigation.navigate('business',{cat: 'business'})}
          style={styles.drawerItem}
        />
        </View>

        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="community"
          onPress={() => navigation.navigate('community')}
          style={styles.drawerItem}
        />
        </View>
        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="createPost"
          onPress={() => navigation.navigate('createPost')}
          style={styles.drawerItem}
        />
        </View>
        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="savedPost"
          onPress={() => props.navigation.navigate('savedPost')}
          style={styles.drawerItem}
        />
        </View>
        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="search"
          onPress={() => props.navigation.navigate('search')}
          style={styles.drawerItem}
        />
        </View>
        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="notifications"
          onPress={() => props.navigation.navigate('notifications')}
          style={styles.drawerItem}
        />
        </View>
        <View style={{width:'90%',backgroundColor:'#A6A6A8',borderEndStartRadius:5,borderEndEndRadius:5}}>
        <DrawerItem
          label="logout"
          onPress={signOut}
          style={styles.drawerItem}
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
  drawerItem: {
    width:'70%'
  },
  drawerItemLabel: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
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
    fontWeight:'bold',
  }
});

export default Sidebar;