import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ABOUT, HOME, WORKOUT_AREA } from '../config/screensName'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import WorkoutArea from './WorkoutArea'

const UserArea = createBottomTabNavigator()

const UserAreaStackScreen = () => {
  return (
    <UserArea.Navigator initialRouteName={HOME}>
      <UserArea.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          title: 'Início',
          headerTintColor: '#F28B0C',
          headerLeft: () => <></>,
          tabBarIcon: ({ focused }) => {
            const color = focused ? '#F28B0C' : '#fff'
            return <Ionicons name="home" color={color} size={20} />
          },
          tabBarActiveTintColor: '#F28B0C',
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      />
      <UserArea.Screen
        name={WORKOUT_AREA}
        component={WorkoutArea}
        options={{
          title: 'Treino',
          headerTintColor: '#F28B0C',
          tabBarIcon: ({ focused }) => {
            const color = focused ? '#F28B0C' : '#fff'
            return <Ionicons name="barbell-sharp" color={color} size={20} />
          },
          headerShown: true,
          tabBarActiveTintColor: '#F28B0C',
          tabBarInactiveTintColor: '#fff',
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
          headerTintColor: '#F28B0C',
          tabBarIcon: ({ focused }) => {
            const color = focused ? '#F28B0C' : '#fff'
            return <Ionicons name="information-circle" color={color} size={20} />
          },
          tabBarActiveTintColor: '#F28B0C',
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      />
    </UserArea.Navigator>
  )
}

export default UserAreaStackScreen
