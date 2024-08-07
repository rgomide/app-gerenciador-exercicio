import { Text, View, Button, StyleSheet, TextInput } from 'react-native'
import AuthContext from '../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { supabase } from '../service/supabase'
import { AUTH, ABOUT } from '../config/screensName'
import colors from '../styles/appTheme'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'
import {
  deleteTreino,
  getIdTreinoByName,
  insertTreino,
  selectTreinosByUsuario,
  updateTreino
} from '../service/treinoService'
import { getIdUsuario } from '../service/usuarioService'
import { insertRotina, selectRotinasByTreino } from '../service/rotinaService'

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
        <Text style={{ color: '#fff', fontSize: 24 }}>Bem vindo: {user.email}</Text>
        <Button title="Sobre" disabled={loading} onPress={onNavigateToAbout} />
        <Button title="Sair" disabled={loading} onPress={onLogout} />
        <Button
          title="select treinos"
          onPress={async () => {
            const id_usuario = (await getIdUsuario(context.session.user.email)).data[0].id
            const { data } = await selectTreinosByUsuario(id_usuario)
            data.forEach((treino) => {
              console.log(treino.nome)
            })
          }}
        />
        <Button
          title="select rotinas"
          onPress={async () => {
            const { data } = await selectRotinasByTreino(32)
            data.forEach((rotina) => {
              console.log(rotina.nome_rotina)
            })
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...boxModel,
  ...flex
})

export default HomeScreen
