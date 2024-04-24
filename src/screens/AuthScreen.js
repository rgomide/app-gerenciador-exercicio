import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput, Text } from 'react-native'
import { supabase } from '../service/supabase'
import FlashAlert from '../components/FlashAlert'
import { USER_AREA } from '../config/screensName'
import textInput from '../styles/textInput'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'

const AuthScreen = (props) => {
  const [email, setEmail] = useState('renato.s.gomide@gmail.com')
  const [password, setPassword] = useState('123456')
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
      navigation.navigate(USER_AREA)
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
    <View style={[styles.boxModel.mainContainer, styles.loginContainer]}>
      <FlashAlert isVisible={showAlert} message={errorMessage} onHide={handleHideAlert} />
      <View style={styles.flex.gap5}>
        <Text>Usuário</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          style={styles.textInput.default}
          textContentType="emailAddress"
        />
        <Text>Senha</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.textInput.default}
        />
        <View style={styles.boxModel.mt20}>
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
  loginContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  ...textInput,
  ...boxModel,
  ...flex
})

export default AuthScreen
