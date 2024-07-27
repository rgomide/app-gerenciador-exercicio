import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
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
import { insertTreino, selectTreinosByUsuario } from '../service/treinoService'
import { getIdUsuario } from '../service/usuarioService'
import RNPickerSelect from "react-native-picker-select";
import { insertRotina, selectRotinasByTreino } from '../service/rotinaService'

const WorkoutArea = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [nome, setNome] = useState('')
  const [id_usuario, setId_usuario] = useState()
  const [loading, setLoading] = useState(false)
  const [treinos, setTreinos] = useState([])
  const [idTreino, setIdTreino] = useState()
  const [rotinas, setRotinas] = useState([])

  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)
  const context = useContext(AuthContext)

  useEffect(() => {
    navigation.setOptions({ headerBackVisible: false })
    loadIdUsuario()
    loadTreinos()
  }, [id_usuario])
  
  useEffect(() => {
    loadRotinas()
  }, [idTreino])

  const loadIdUsuario = async () => {
    const { data } = await getIdUsuario(user.email)
    setId_usuario(data[0].id)
  }

  const loadInsertTreino = async () => {
    await insertTreino(id_usuario, nome)
    setNome('')
  }

  const loadTreinos = async () => {
    if (!id_usuario) {
      return([])
    }else{
      const { data } = await selectTreinosByUsuario(id_usuario)
      let arrayItems = []
      data.forEach(treino => {
        arrayItems.push({ label: treino.nome, value: treino.id })
      })
      setIdTreino(data[0].id)
      setTreinos(arrayItems)
    }
  }

  const loadInsertRotina = async () => {
    await insertRotina(idTreino, nome)
    setNome('')
  }

  const loadRotinas = async () => {
    if (idTreino != null) {
      const {data} = await selectRotinasByTreino(idTreino)
      let arrayData = []
      data.forEach(rotina => {
        arrayData.push({nome_rotina: rotina.nome_rotina})
      })
      setRotinas(arrayData)
    }
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

      <View>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={(value) => setIdTreino(value)}
          items={treinos}
          useNativeAndroidPickerStyle={false}
        />
      </View>

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
        <FlatList
          data={rotinas}
          renderItem={({item}) => <RoutineCard title={item.nome_rotina}/>}
          contentContainerStyle={{gap: 25}}
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
