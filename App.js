import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './src/service/supabase'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from './src/screens/AuthScreen'
import UserAreaStackScreen from './src/screens/UserAreaStackScreen'
import AuthContext from './src/contexts/AuthContext'
import { AUTH, USER_AREA } from './src/config/screensName'
import appTheme from './src/styles/appTheme'

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session || {})
    })
  }, [])

  return (
    <AuthContext.Provider value={{ session }}>
      <NavigationContainer theme={appTheme} >
        <Stack.Navigator initialRouteName={AUTH} screenOptions={{ headerShown: false }}  >
          <Stack.Screen name={AUTH} component={AuthScreen} />
          <Stack.Screen name={USER_AREA} component={UserAreaStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}