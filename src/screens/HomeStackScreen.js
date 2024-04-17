import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'

const Home = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <Home.Navigator initialRouteName={HOME}>
      <Home.Screen name={HOME} component={HomeScreen} options={{ headerLeft: () => <></> }} />
    </Home.Navigator>
  )
}

export default HomeStackScreen
