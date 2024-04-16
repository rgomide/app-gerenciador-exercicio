import { StyleSheet, View, Text } from 'react-native'
import { useEffect, useState } from 'react'

const FlashAlert = (props) => {
  const { message, duration = 5000, isVisible, onHide } = props

  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    setShowMessage(isVisible)
    if (isVisible) {
      const timeout = setTimeout(() => {
        onHide() // Hide the alert after the specified duration
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [isVisible, duration, onHide])

  const handleClose = () => {
    setShowMessage(false)
    onHide()
  }

  return (
    <>
      {showMessage && (
        <View style={styles.mainView}>
          <Text>{message}</Text>
          <Text onPress={handleClose}>close</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    backgroundColor: '#ff6666',
    padding: 10
  }
})

export default FlashAlert
