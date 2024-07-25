import { Text, View, Button, StyleSheet, TextInput } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { supabase } from '../service/supabase'
import { AUTH, ABOUT } from '../config/screensName'
import colors from '../styles/appTheme'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'
import { insertTreino } from '../service/treinoService'
import { getIdUsuario } from '../service/usuarioService'

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState()
  const [usuarioId, setUsuarioId] = useState()

  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)
  const context = useContext(AuthContext)

  console.log('userId', context.session.user.id)

  useEffect(() => {
    navigation.setOptions({ headerBackVisible: false })
    loadIdUsuario()
  }, [])

  const loadIdUsuario = async () => {
    const { data } = await getIdUsuario(context.session.user.email)
    setUsuarioId(data[0].id)
  }

  const loadInsertTreino = async () => {
    await insertTreino(usuarioId, nome)
    setNome('')
  }

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
    <View style={[styles.boxModel.mainContainer, { backgroundColor: '#0D0D0D' }]}>
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
