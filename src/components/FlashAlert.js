import { StyleSheet, View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import flashAlertStyles from '../styles/flashAlert'

const FlashAlert = (props) => {
  const { message, duration = 500000, isVisible, onHide } = props

  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    setShowMessage(isVisible)
    if (isVisible) {
      const timeout = setTimeout(() => {
        onHide()
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
          <Text style={styles.text}>{message}</Text>
          <Text onPress={handleClose}>close</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create(flashAlertStyles)

export default FlashAlert
