
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChangePassword from './screens/changepassword';
import Forgotpassword from './screens/forgotpassword';
import Register from './screens/register';
import Login from './screens/signin';
import  Splashscreen  from './screens/splashscreen';
import Newscategory from './screens/newscategory';
import Aroundyou from './screens/aroundyou';
import Post from './screens/post';
import Wall from './screens/wall';
import Article from './screens/article';
import Savedpost from './screens/savedpost';
import Notifications from './screens/notifications';
import Home from './screens/home';
import Commentscreen from './screens/commentscreen';
import EditProfile from './screens/editProfile';
import Profile from './screens/profile';
import Webview from './screens/webview';
import Sidebar from './components/sidebar';
import { AppProvider } from './appContext';

axios.defaults.baseURL = 'https://chirpserver.onrender.com/';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App =  () => {
  
  const MainFlow = () => (
    <Drawer.Navigator
        initialRouteName="topStories"
        drawerContent={props => <Sidebar {...props} />}
      >
        <Drawer.Screen name="topStories" component={Home} options={{ headerShown: false }}/>
        <Drawer.Screen name="technology" component={Newscategory} options={{ headerShown: false }}/>
        <Drawer.Screen name="entertainment" component={Newscategory} options={{ headerShown: false }}/>
        <Drawer.Screen name="sport" component={Newscategory} options={{ headerShown: false }}/>
        <Drawer.Screen name="business" component={Newscategory} options={{ headerShown: false }}/>
        <Drawer.Screen name="community" component={Wall} options={{ headerShown: false }}/>
        <Drawer.Screen name="createPost" component={Post} options={{ headerShown: false }}/>
        <Drawer.Screen name="savedPost" component={Savedpost} options={{ headerShown: false }}/>
        <Drawer.Screen name="search" component={Aroundyou} options={{ headerShown: false }}/>
        <Drawer.Screen name="notifications" component={Notifications} options={{ headerShown: false }}/>
      </Drawer.Navigator>
  );

  return (
    <AppProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splashscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="changePassword" component={ChangePassword} options={{ headerShown: false }}/>
        <Stack.Screen name="forgotPassword" component={Forgotpassword} options={{ headerShown: false }} />
        <Stack.Screen name="article" component={Article} options={{ headerShown: false }}/>
        <Stack.Screen name="comment" component={Commentscreen}  />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="editProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="webview" component={Webview} />
        <Stack.Screen name="Home" component={MainFlow} options={{ headerShown: false }} />
        <Stack.Screen name="logout" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}

export default App;
