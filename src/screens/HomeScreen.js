import { Text, View, Button, StyleSheet } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import { supabase } from '../service/supabase'
import { AUTH } from '../config/screensName'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'

const HomeScreen = (props) => {
  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)

  const onLogout = async () => {
    await supabase.auth.signOut()
    navigation.navigate(AUTH)
  }

  return (
    <View style={styles.boxModel.mainContainer}>
      <View style={styles.flex.gap5}>
        <Text>Wellcome {user.email}</Text>
        <Button title="Sair" onPress={onLogout} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...boxModel,
  ...flex
})

export default HomeScreen
