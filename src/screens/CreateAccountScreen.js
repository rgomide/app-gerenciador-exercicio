import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import textInput from '../styles/textInput'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'
import { supabase } from '../service/supabase'
import FlashAlert from '../components/FlashAlert'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { AUTH } from '../config/screensName'

const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassWord, setConfirmPassWord] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

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

  const checkData = (password, confirmedPassword) => {
    if (password.length <= 0 || confirmPassWord.length <= 0 || email.length <= 0) {
      setErrorMessage('Todos os campos devem ser preenchidos')
      setShowAlert(true)
    } else if (password !== confirmedPassword) {
      setErrorMessage('As senhas informadas não coincidem')
      setShowAlert(true)
    } else {
      signUpWithEmail()
    }
  }

  const handleHideAlert = () => {
    setShowAlert(false)
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.boxModel.mainContainer,
        styles.loginContainer,
        { alignItems: 'center', gap: 30 }
      ]}
    >
      <View style={styles.userIcon}>
        <Ionicons name="person-add-outline" color={'#fff'} size={80} />
      </View>

      <View style={[styles.flex, { gap: 20 }]}>
        <FlashAlert isVisible={showAlert} message={errorMessage} onHide={handleHideAlert} />

        <View style={styles.inputsContainer}>
          <Text style={styles.lblInputs}>Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor={'#4f4f4f'}
            style={[styles.textInput.default, styles.txtInput]}
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.lblInputs}>Senha</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password123@"
            placeholderTextColor={'#4f4f4f'}
            style={[styles.textInput.default, styles.txtInput]}
          />
        </View>

        <View style={styles.inputsContainer}>
          <Text style={styles.lblInputs}>Confirme sua senha</Text>
          <TextInput
            onChangeText={(text) => setConfirmPassWord(text)}
            value={confirmPassWord}
            secureTextEntry={true}
            placeholder="Password123@"
            placeholderTextColor={'#4f4f4f'}
            style={[styles.textInput.default, styles.txtInput]}
          />
        </View>

        <View style={styles.boxModel.mt20}>
          <TouchableOpacity
            style={styles.btn}
            disabled={loading}
            onPress={() => {
              checkData(password, confirmPassWord)
            }}
          >
            <Text style={styles.btnText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.enterTxt, { color: '#fff' }]}>Já tem uma conta?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(AUTH)
            }}
          >
            <Text style={[styles.enterTxt, { color: '#F28B0C' }]}>Entrar!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    height: '100%',
    justifyContent: 'space-around'
  },

  userIcon: {
    backgroundColor: '#F28B0C',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 170,
    borderRadius: 100
  },

  userIcon: {
    backgroundColor: '#F28B0C',
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 170,
    borderRadius: 100
  },

  inputsContainer: {
    gap: 10
  },

  lblInputs: {
    color: '#F28B0C',
    fontSize: 24,
    fontWeight: 'bold'
  },

  txtInput: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    color: '#fff',
    fontSize: 20
  },

  btn: {
    backgroundColor: '#F28B0C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12
  },

  btnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },

  enterTxt: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  ...textInput,
  ...boxModel,
  ...flex
})

export default CreateAccount
