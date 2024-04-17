import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ABOUT, HOME } from '../config/screensName'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'

const UserArea = createNativeStackNavigator()

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