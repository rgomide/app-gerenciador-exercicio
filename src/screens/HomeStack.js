import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'

const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={HOME}>
      <Home.Screen name={HOME} component={HomeScreen} />
    </Home.Navigator>
  )
}

export default HomeStack
