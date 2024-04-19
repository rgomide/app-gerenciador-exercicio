import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ABOUT, HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'
import Ionicons from '@expo/vector-icons/Ionicons'

const UserArea = createBottomTabNavigator()

const UserAreaStackScreen = () => {
  return (
    <UserArea.Navigator initialRouteName={HOME}>
      <UserArea.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          title: 'Início',
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => {
            const color = focused ? 'blue' : 'black'
            return <Ionicons name="home" color={color} size={20} />
          },
          tabBarActiveTintColor: 'blue',
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      />
      <UserArea.Screen
        name={ABOUT}
        component={AboutScreen}
        options={{
          title: 'Sobre',
          tabBarIcon: ({ focused }) => {
            const color = focused ? 'blue' : 'black'
            return <Ionicons name="barbell-sharp" color={color} size={20} />
          },
          tabBarActiveTintColor: 'blue',
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      />
    </UserArea.Navigator>
  )
}

export default UserAreaStackScreen
