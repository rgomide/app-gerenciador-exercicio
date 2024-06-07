import { Text, View, Button, StyleSheet } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { supabase } from '../service/supabase'
import { AUTH, ABOUT } from '../config/screensName'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false)

  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)
  const context = useContext(AuthContext)

  console.log('userId', context.session.user.id)

  useEffect(() => {
    navigation.setOptions({ headerBackVisible: false })
  }, [])

  const onLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    navigation.navigate(AUTH)
    setLoading(false)
  }

  const onNavigateToAbout = () => {
    navigation.navigate(ABOUT)
  }

  return (
    <View style={styles.boxModel.mainContainer}>
      <View style={styles.flex.gap5}>
        <Text>Bem vindo: {user.email}</Text>
        <Button title="Sobre" disabled={loading} onPress={onNavigateToAbout} />
        <Button title="Sair" disabled={loading} onPress={onLogout} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...boxModel,
  ...flex
})

export default HomeScreen
