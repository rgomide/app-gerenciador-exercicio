import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ABOUT, HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'

const Home = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <Home.Navigator initialRouteName={HOME}>
      <Home.Screen name={HOME} component={HomeScreen} options={{ title: 'Início', headerLeft: () => <></> }} />
      <Home.Screen name={ABOUT} component={AboutScreen} options={{ title: 'Sobre' }} />
    </Home.Navigator>
  )
}

export default HomeStackScreen
