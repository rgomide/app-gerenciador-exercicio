import { useState, useEffect } from 'react'
import { FlatList, Text, TextInput, View, StyleSheet, Button } from 'react-native'
import { getAll, insert, remove } from '../service/dogsService'
import DogCard from '../components/DogCard'

const DogsScreen = () => {
  const [dogs, setDogs] = useState([])
  const [name, setName] = useState('')
  const [imageUrl, setImgaeUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadDogs()
  }, [])

  const loadDogs = async () => {
    setLoading(true)

    const { data } = await getAll()
    setDogs(data)

    setLoading(false)
  }

  const removeDog = async (id) => {
    setLoading(true)

    const {
      data: [{ id: removedId }]
    } = await remove(id)

    setDogs(dogs.filter((dog) => dog.id !== removedId))

    setLoading(false)
  }

  const insertDog = async () => {
    setLoading(true)

    const {
      data: [item]
    } = await insert({ name, imageUrl })

    setName('')
    setImgaeUrl('')

    const newDogs = [...dogs, item].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    )
    setDogs(newDogs)

    setLoading(false)
  }

  return (
    <FlatList
      ListHeaderComponent={
        <DogForm
          name={name}
          imageUrl={imageUrl}
          setName={setName}
          setImageUrl={setImgaeUrl}
          onConfirm={() => insertDog()}
          loading={loading}
        />
      }
      contentContainerStyle={styles.cardsView}
      data={dogs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const { name, image_url, id } = item
        return (
          <DogCard
            disabled={loading}
            name={name}
            imageUrl={image_url}
            onPress={() => removeDog(id)}
          />
        )
      }}
    />
  )
}

const DogForm = (props) => {
  const { name, imageUrl, setName, setImageUrl, onConfirm, loading } = props
  return (
    <View style={styles.dogForm}>
      <Text>Name</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        maxLength={255}
        placeholder="Dog name"
      />
      <Text>Image URL</Text>
      <TextInput
        style={styles.textInput}
        value={imageUrl}
        onChangeText={setImageUrl}
        maxLength={255}
        placeholder="Image URL"
      />
      <Button disabled={loading} title="Insert" onPress={onConfirm} />
    </View>
  )
}

const styles = StyleSheet.create({
  dogForm: {
    gap: 10,
    marginBottom: 10
  },
  cardsView: {
    padding: 10,
    gap: 10,
    flexGrow: 1
  },
  textInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#444444',
    borderRadius: 5,
    padding: 10
  },
  scrollView: {
    flex: 1
  }
})

export default DogsScreen
