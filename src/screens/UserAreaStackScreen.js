import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ABOUT, HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'
import Ionicons from '@expo/vector-icons/Ionicons';

const UserArea = createBottomTabNavigator()

const UserAreaStackScreen = () => {
  return (
    <UserArea.Navigator initialRouteName={HOME}>
      <UserArea.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          title: 'Início', headerLeft: () => <></>,
          tabBarIcon: () => {
            return <Ionicons name='home' size={20} />
          }
        }}
      />
      <UserArea.Screen name={ABOUT} component={AboutScreen} options={{
        title: 'Sobre',
        tabBarIcon: () => {
          return <Ionicons name='barbell-sharp' size={20} />
        }
      }} />
    </UserArea.Navigator>
  )
}

export default UserAreaStackScreen
