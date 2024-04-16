import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './src/service/supabase'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from './src/screens/AuthScreen'
import HomeScreen from './src/screens/HomeScreen'
import AuthContext from './src/contexts/AuthContext'
import { HOME, AUTH } from './src/config/screensName'

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
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AUTH}>
          <Stack.Screen name={AUTH} component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name={HOME} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}