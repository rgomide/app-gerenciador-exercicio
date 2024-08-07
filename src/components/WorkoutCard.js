import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { deleteTreino, getTreinoById, updateTreino } from '../service/treinoService'
import Feather from '@expo/vector-icons/Feather'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import textInput from '../styles/textInput'

const WorkoutCard = ({ id_treino, setChangeTreino }) => {
  const [nome, setNome] = useState()
  const [nomeTreino, setNomeTreino] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    loadTreino()
  }, [nomeTreino])

  const loadTreino = async () => {
    const { data } = await getTreinoById(id_treino)
    setNomeTreino(data[0].nome)
  }

  const editTreino = async () => {
    await updateTreino(id_treino, nome)
    setChangeTreino(true)
    setNomeTreino(nome)
  }

  const excludeTreino = async (id_treino) => {
    await deleteTreino(id_treino)
    setChangeTreino(true)
  }

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#222221',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
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

          <Text style={[styles.mainText, { color: '#51AFF7' }]}>Editar Treino</Text>

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
                borderColor: 'rgba(81, 175, 247, 0.9)'
              }
            ]}
          />

          <TouchableOpacity
            onPress={() => {
              editTreino()
              setModalVisible(false)
            }}
            style={[styles.mainBtn, { backgroundColor: '#51AFF7', alignItems: 'center' }]}
          >
            <Text style={[styles.mainText, { textAlign: 'center' }]}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
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

      <Text style={styles.title}>{nomeTreino}</Text>

      <View style={{ width: '25%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.edit} onPress={() => setModalVisible(true)}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.exclude} onPress={() => excludeTreino(id_treino)}>
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '70%'
  },

  edit: {
    backgroundColor: '#51AFF7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    // borderRadius: '25%',
    aspectRatio: 1 / 1
  },

  exclude: {
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    // borderRadius: '25%',
    aspectRatio: 1 / 1
  },

  mainText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    width: '100%'
  },

  mainBtn: {
    borderRadius: 20,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#51AFF7',
    paddingHorizontal: 10,
    paddingVertical: 15
  },

  ...textInput
})

export default WorkoutCard
