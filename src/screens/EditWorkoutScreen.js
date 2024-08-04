import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import WorkoutCard from "../components/WorkoutCard"
import boxModel from "../styles/boxModel"
import { useEffect, useState } from "react"
import { insertTreino, selectTreinosByUsuario } from "../service/treinoService"
import Ionicons from '@expo/vector-icons/Ionicons';
import textInput from "../styles/textInput"

const EditWorkoutScreen = (props) => {

    const { id_usuario } = props.route.params
    const [treinos, setTreinos] = useState([])
    const [changeTreino, setChangeTreino] = useState()
    const [nome, setNome] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const { navigation } = props
    const parentNavigator = navigation.getParent()

    const loadTreinos = async () => {
        const { data } = await selectTreinosByUsuario(id_usuario)
        setTreinos(data)
    }

    const createTreino = async () => {
        await insertTreino(id_usuario, nome)
    }

    useEffect(() => {
        loadTreinos()
        setChangeTreino(false)
        console.log(parentNavigator)
    }, [changeTreino])

    return (
        <View>

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

                    <View style={{
                        height: 8,
                        width: 70,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                        alignSelf: 'center'
                    }}></View>

                    <Text style={[styles.mainText, { color: '#F28b0c' }]}>Criar Treino</Text>

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
                                borderColor: 'rgba(81, 175, 247, 0.9)',
                            }
                        ]}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            createTreino()
                            setModalVisible(false)
                            setChangeTreino(true)
                        }}
                        style={[styles.mainBtn, { backgroundColor: '#F28b0c', alignItems: 'center' }]}
                    >
                        <Text style={[styles.mainText, { textAlign: 'center' }]}>Criar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false)
                        }}
                        style={[styles.mainBtn, { backgroundColor: 'rgba(27, 26, 25, 0.9)', alignItems: 'center' }]}
                    >
                        <Text style={[styles.mainText, { textAlign: 'center' }]}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'rgba(27, 26, 25, 0.9), flex: 1' }}></View>
            </Modal>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#F28b0c" />
                </TouchableOpacity>

                <Text style={styles.topText}>Editar Treinamentos</Text>

                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 18, color: '#F28b0c' }}>Criar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={[styles.boxModel.mainContainer, { backgroundColor: '0#D0D0D', flex: 1 }]}
                contentContainerStyle={{ gap: 15 }}
            >
                {treinos.map((treino) => (
                    <WorkoutCard key={treino.id} id_treino={treino.id} setChangeTreino={setChangeTreino} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: '4%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1
    },

    topText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: '100%',
        textAlign: 'center',
        flex: 1
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
        paddingVertical: 15,
    },

    ...textInput,
    ...boxModel
})

export default EditWorkoutScreen