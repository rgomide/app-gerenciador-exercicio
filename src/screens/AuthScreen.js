import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput, Text } from 'react-native'
import { supabase } from '../service/supabase'
import FlashAlert from '../components/FlashAlert'
import { HOME_STACK } from '../config/screensName'
import textInput from '../styles/textInput'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'

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
      navigation.navigate(HOME_STACK)
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
    <View style={styles.boxModel.mainContainer}>
      <FlashAlert isVisible={showAlert} message={errorMessage} onHide={handleHideAlert} />
      <View style={styles.flex.gap5}>
        <Text>Usuário</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          style={styles.textInput.default}
        />
        <Text>Senha</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.textInput.default}
        />
        <View style={styles.boxModel.mt10}>
          <Button title="Entrar" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View>
          <Button
            title="Criar um novo usuário"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...textInput,
  ...boxModel,
  ...flex
})

export default AuthScreen
