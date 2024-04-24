import { Image, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const DogCard = (props) => {
  const { name, imageUrl, onPress, loading } = props
  return (
    <View style={styles.mainView}>
      <View style={styles.infoView}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.textName}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onPress} disabled={loading}>
        <Ionicons name="close-circle-sharp" size={26} />
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#444444',
    padding: 10
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  textName: {
    fontSize: 24
  },
  image: {
    width: 100,
    height: 100
  }
}

export default DogCard
