import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './src/service/supabase'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthScreen from './src/screens/AuthScreen'
import UserAreaStackScreen from './src/screens/UserAreaStackScreen'
import AuthContext from './src/contexts/AuthContext'
import { AUTH, USER_AREA, CREATE_ACCOUNT } from './src/config/screensName'
import appTheme from './src/styles/appTheme'
import CreateAcountScreen from './src/screens/CreateAccountScreen'
import { upsertUsuario } from './src/service/usuarioService'

const Stack = createNativeStackNavigator()

export default function App() {
  // melhorar o nome desse state
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session)
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session)
      if (session) {
        upsertUsuario(session.user.email, session.user.id)
      }
      // verificar se já existe usuário com session.user.email
      // caso não existe, crie um novo usuário na nossa tabela `usuario` com esses dados
      // com upsert e adicione a referência do usuário no state session
      //
      setSession({
        session: session,
        user: session.user
       })
    })
  }, [])

  return (
    <AuthContext.Provider value={{ session }}>
      <NavigationContainer theme={appTheme} >
        <Stack.Navigator initialRouteName={AUTH} screenOptions={{ headerShown: false }}  >
          <Stack.Screen name={AUTH} component={AuthScreen} />
          <Stack.Screen name={CREATE_ACCOUNT} component={CreateAcountScreen} />
          <Stack.Screen name={USER_AREA} component={UserAreaStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
