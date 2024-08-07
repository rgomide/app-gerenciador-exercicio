import { View, Text, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native'
import React from 'react'
import background from '../styles/appTheme'
import { TouchableOpacity } from 'react-native'
import boxModel from '../styles/boxModel'
import { Ionicons } from '@expo/vector-icons'
import RoutineCard from '../components/RoutineCard'
import { Modal } from 'react-native-web'
import textInput from '../styles/textInput'
import { useContext } from 'react'
import { useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { useEffect } from 'react'
import { insertTreino, selectTreinosByUsuario } from '../service/treinoService'
import { getIdUsuario } from '../service/usuarioService'
import { insertRotina, selectRotinasByTreino } from '../service/rotinaService'
import { Picker } from '@react-native-picker/picker'
import { EDIT_WORKOUT } from '../config/screensName'

const WorkoutArea = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editorModalVisible, setEditorModalVisible] = useState(false)
  const [editWorkoutModalVisible, setEditWorkoutModalVisible] = useState(false)
  const [nome, setNome] = useState('')
  const [id_usuario, setId_usuario] = useState()
  const [loading, setLoading] = useState(false)
  const [treinos, setTreinos] = useState([])
  const [selectedTreino, setSelectedTreino] = useState()
  const [idTreino, setIdTreino] = useState()
  const [rotinas, setRotinas] = useState([])
  const [isFocused, setIsFocused] = useState()

  const { navigation } = props
  const { session: { user = { email: 'Not authenticated' } } = {} } = useContext(AuthContext)
  const context = useContext(AuthContext)

  useEffect(() => {
    navigation.setOptions({ headerBackVisible: false })
    loadIdUsuario()
    loadTreinos()
  }, [id_usuario, nome])

  useEffect(() => {
    loadRotinas()
  }, [idTreino])

  useEffect(() => {
    loadTreinos()
    setIsFocused(navigation.isFocused())
  }, [isFocused])

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
      return []
    } else {
      const { data } = await selectTreinosByUsuario(id_usuario)
      setTreinos(data)
    }
  }

  const loadInsertRotina = async () => {
    await insertRotina(idTreino, nome)
  }

  const loadRotinas = async () => {
    if (idTreino != null) {
      const { data } = await selectRotinasByTreino(idTreino)
      let arrayData = []
      data.forEach((rotina) => {
        arrayData.push({ nome_rotina: rotina.nome_rotina })
      })
      setRotinas(arrayData)
    }
  }

  const checkPickerTitle = () => {
    if (idTreino != null) {
      return false
    } else return true
  }

  return (
    <ScrollView
      style={[styles.boxModel.mainContainer, { backgroundColor: '0#D0D0D', flex: 1 }]}
      contentContainerStyle={{ gap: 20 }}
    >
      <Modal
        id="modal pra gerenciar os treinos"
        animationType="slide"
        transparent={true}
        visible={editorModalVisible}
        onRequestClose={() => {
          setModalVisible(!editorModalVisible)
        }}
      >
        <View
          style={{
            backgroundColor: '#000',
            width: '100%',
            alignSelf: 'center',
            padding: 12,
            borderRadius: 12,
            gap: 10,
            position: 'absolute',
            bottom: 0
          }}
        >
          <View
            style={{
              height: 8,
              width: 70,
              backgroundColor: '#fff',
              borderRadius: 100,
              alignSelf: 'center'
            }}
          ></View>

          <Text style={{ fontSize: 26, color: '#F28b0c', marginVertical: 10 }}>
            Configurações de treino
          </Text>

          <View style={{ gap: 2 }}>
            <TouchableOpacity
              onPress={() => {
                setEditWorkoutModalVisible(true)
                setEditorModalVisible(false)
              }}
              style={[
                styles.editWorkoutBtn,
                { backgroundColor: 'rgba(27, 26, 25, 0.9)', alignItems: 'center' }
              ]}
            >
              <Ionicons name="pencil-outline" size={24} color={'#fff'} />
              <Text style={styles.editWorkoutTxt}>Editar treino</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.editWorkoutBtn,
                { backgroundColor: 'rgba(27, 26, 25, 0.9)', alignItems: 'center' }
              ]}
            >
              <Ionicons name="trash-outline" size={24} color={'red'} />
              <Text style={[styles.editWorkoutTxt, { color: 'red' }]}>Deletar treino</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setEditorModalVisible(false)
              }}
              style={[
                styles.editWorkoutBtn,
                { backgroundColor: 'rgba(27, 26, 25, 0.9)', alignItems: 'center' }
              ]}
            >
              <Text style={styles.editWorkoutTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        id="modal pra editar os treinos"
        animationType="slide"
        transparent={true}
        visible={editWorkoutModalVisible}
        onRequestClose={() => {
          setModalVisible(!editWorkoutModalVisible)
          loadTreinos()
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            alignSelf: 'center',
            paddingHorizontal: 25,
            paddingVertical: 50,
            justifyContent: 'flex-start',
            gap: 20,
            backgroundColor: '#000',
            borderRadius: 20
          }}
        >
          <View
            style={{
              height: 8,
              width: 70,
              backgroundColor: '#fff',
              borderRadius: 100,
              alignSelf: 'center'
            }}
          ></View>

          <Text style={[styles.mainText, { color: '#E28b0c' }]}>Editar treino</Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Novo nome do treino"
            placeholderTextColor={'#C2BEBE'}
            style={[
              styles.textInput.default,
              {
                fontSize: 24,
                color: '#fff',
                borderWidth: 3,
                borderColor: 'rgba(27, 26, 25, 0.9)'
              }
            ]}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              setModalVisible(false)
            }}
            style={[styles.mainBtn, { backgroundColor: '#F28b0c', alignItems: 'center' }]}
          >
            <Text style={[styles.mainText, { textAlign: 'center' }]}>iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              setEditWorkoutModalVisible(false)
            }}
            style={[
              styles.mainBtn,
              { backgroundColor: 'rgba(27, 26, 25, 0.9)', alignItems: 'center' }
            ]}
          >
            <Text style={[styles.mainText, { textAlign: 'center' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            alignSelf: 'center',
            paddingHorizontal: 25,
            paddingVertical: 50,
            justifyContent: 'flex-start',
            gap: 20,
            backgroundColor: '#000',
            borderRadius: 20
          }}
        >
          <View
            style={{
              height: 8,
              width: 70,
              backgroundColor: '#fff',
              borderRadius: 100,
              alignSelf: 'center'
            }}
          ></View>

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
                borderColor: 'rgba(27, 26, 25, 0.9)'
              }
            ]}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              loadInsertTreino()
              loadRotinas()
              setNome('')
              setModalVisible(false)
            }}
            style={[styles.mainBtn, { backgroundColor: '#F28b0c', alignItems: 'center' }]}
          >
            <Text style={[styles.mainText, { textAlign: 'center' }]}>iniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              setModalVisible(false)
            }}
            style={[
              styles.mainBtn,
              { backgroundColor: 'rgba(27, 26, 25, 0.9)', alignItems: 'center' }
            ]}
          >
            <Text style={[styles.mainText, { textAlign: 'center' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'rgba(27, 26, 25, 0.9), flex: 1' }}></View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.topText}>Treino</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Picker
          selectedValue={selectedTreino}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedTreino(itemValue)
            setIdTreino(itemValue)
          }}
          style={styles.pickerStyle}
        >
          <Picker.Item label="Selecione um treino" value={null} enabled={checkPickerTitle()} />
          {treinos.map((treino) => (
            <Picker.Item key={treino.id} label={treino.nome} value={treino.id} />
          ))}
        </Picker>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(EDIT_WORKOUT, { id_usuario })
          }}
          style={{ padding: 3 }}
        >
          <Ionicons name="options-outline" color={'#fff'} size={24} />
        </TouchableOpacity>
      </View>

      <View style={{ gap: 10 }}>
        <TouchableOpacity style={styles.mainBtn}>
          <Ionicons color={'#F28B0C'} name="add-outline" size={25} />
          <Text style={styles.mainText}>Iniciar rotina vazia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <Ionicons color={'#F28B0C'} name="add-outline" size={25} />
          <Text style={styles.mainText}>nova rotina</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 25 }}>
        {rotinas.map((item) => (
          <RoutineCard title={item.nome_rotina} />
        ))}
        {/* <FlatList
          data={rotinas}

          renderItem={({ item }) => <RoutineCard title={item.nome_rotina} />}
          contentContainerStyle={{ gap: 25 }}
        /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  topText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F28B0C',
    width: '100%',
    textAlign: 'center',
    flex: 1
  },

  mainBtn: {
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222221',
    paddingHorizontal: 10,
    paddingVertical: 15
  },

  editWorkoutBtn: {
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#222221',
    paddingHorizontal: 10,
    paddingVertical: 15
  },

  editWorkoutTxt: {
    color: '#fff',
    fontSize: 20
  },

  mainText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    width: '100%'
  },

  pickerStyle: {
    width: '70%',
    paddingVertical: 15,
    color: '#fff',
    backgroundColor: 'rgba(27, 26, 25, 0.9)',
    borderRadius: 12,
    fontSize: 20,
    paddingHorizontal: 5
  },

  ...boxModel,
  ...textInput
})

export default WorkoutArea

/*
        <RNPickerSelect
          placeholder={{ label: "Selecione seu treino", value: null }}
          onValueChange={(value) => setIdTreino(value)}
          items={treinos}
          useNativeAndroidPickerStyle={false}
          style={customPickerStyles}
        />
*/
