import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ABOUT, HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'

const UserArea = createBottomTabNavigator()

const UserAreaStackScreen = () => {
  return (
    <UserArea.Navigator initialRouteName={HOME}>
      <UserArea.Screen
        name={HOME}
        component={HomeScreen}
        options={{ title: 'Início', headerLeft: () => <></> }}
      />
      <UserArea.Screen name={ABOUT} component={AboutScreen} options={{ title: 'Sobre' }} />
    </UserArea.Navigator>
  )
}

export default UserAreaStackScreen
