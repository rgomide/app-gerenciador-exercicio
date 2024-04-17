import { Text, View, StyleSheet } from 'react-native'
import boxModel from '../styles/boxModel'

const AboutScreen = () => {
  return (
    <View style={styles.boxModel.mainContainer}>
      <Text>About Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ...boxModel
})

export default AboutScreen
