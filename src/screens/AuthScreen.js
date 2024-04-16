import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { supabase } from '../service/supabase'
import { Button, Input } from 'react-native-elements'
import FlashAlert from '../components/FlashAlert'
import { HOME } from '../config/screensName'

const AuthScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const navigation = props.navigation

  const signInWithEmail = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if (error) {
      setErrorMessage(error.message)
      setShowAlert(true)
    } else {
      navigation.navigate(HOME)
    }
    setLoading(false)
  }

  const signUpWithEmail = async () => {
    setLoading(true)
    const {
      data: { session },
      error
    } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      setErrorMessage(error.message)
      setShowAlert(true)
    }
    if (!session) {
      const message = 'Please check your inbox for email verification!'
      setErrorMessage(message)
      setShowAlert(true)
    }
    setLoading(false)
  }

  const handleHideAlert = () => {
    setShowAlert(false)
  }

  return (
    <View style={styles.container}>
      <FlashAlert isVisible={showAlert} message={errorMessage} onHide={handleHideAlert} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Entrar" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Criar um novo usuário"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 20
  }
})

export default AuthScreen
