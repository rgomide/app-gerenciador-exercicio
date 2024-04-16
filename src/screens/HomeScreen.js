import { Text, View, Button } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import { supabase } from '../service/supabase'
import { AUTH } from '../config/screensName'

const HomeScreen = (props) => {
  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)

  const onLogout = async () => {
    await supabase.auth.signOut()
    navigation.navigate(AUTH)
  }

  return (
    <View>
      <Text>Wellcome {user.email}</Text>
      <Button title="Sair" onPress={onLogout} />
    </View>
  )
}

export default HomeScreen
