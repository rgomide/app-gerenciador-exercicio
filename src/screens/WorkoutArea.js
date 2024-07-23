import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import background from '../styles/appTheme'
import { TouchableOpacity } from 'react-native'
import boxModel from '../styles/boxModel'
import { Ionicons } from '@expo/vector-icons'
import RoutineCard from '../components/RoutineCard'
import { Modal, ScrollView } from 'react-native-web'
import textInput from '../styles/textInput'
import { useContext } from 'react'
import { useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { useEffect } from 'react'
import { insertTreino } from '../service/treinoService'
import { getIdUsuario } from '../service/usuarioService'

const WorkoutArea = (props) => {
  //os componentes de rotina são só placeholders pra ver como vai ficar no final.

  const [modalVisible, setModalVisible] = useState(false)
  const [nome, setNome] = useState('')
  const [usuarioId, setUsuarioId] = useState()
  const [loading, setLoading] = useState(false)

  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)
  const context = useContext(AuthContext)

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

  return (
    <ScrollView
      contai
      style={[styles.boxModel.mainContainer, { backgroundColor: '0#D0D0D', flex: 1 }]}
      contentContainerStyle={{ gap: 30 }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '90%',
            top: '30%',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 50,
            justifyContent: 'space-around',
            gap: 20,
            backgroundColor: '#11111D',
            borderRadius: 20
          }}
        >
          <Text style={[styles.mainText, { color: '#E28b0c' }]}>Novo treino vazio</Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome do treino"
            placeholderTextColor={'#C2BEBE'}
            style={[
              styles.textInput.default,
              {
                fontSize: 24,
                color: '#fff',
                borderWidth: 3,
                borderColor: 'F28b0c',
                borderRadius: 8
              }
            ]}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              loadInsertTreino()
              setModalVisible(false)
            }}
            style={[styles.mainBtn, { backgroundColor: '#F28b0c', alignItems: 'center' }]}
          >
            <Text style={[styles.mainText, { textAlign: 'center' }]}>iniciar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'rgba(27, 26, 25, 0.9), flex: 1' }}></View>
      </Modal>

      <View style={{ gap: 10 }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true)
          }}
          style={styles.mainBtn}
        >
          <Ionicons color={'#F28B0C'} name="add-outline" size={25} />
          <Text style={styles.mainText}>iniciar treino vazio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainBtn}>
          <Ionicons color={'#F28B0C'} name="add-outline" size={25} />
          <Text style={styles.mainText}>nova rotina</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 25 }}>
        <RoutineCard
          title="Placeholder title"
          description="Lorem Ipsum is simply dummy text of the ext ever since the 1500s"
        />

        <RoutineCard
          title="Placeholder title 2"
          description="Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry standard dummy text ever since the 1500s"
        />

        <RoutineCard
          title="Placeholder title 3"
          description="Lorem Ipsum is simply dummy text o industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainBtn: {
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222221',
    paddingHorizontal: 10,
    height: 70
  },

  mainText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    width: '100%'
  },

  ...boxModel,
  ...textInput
})

export default WorkoutArea
