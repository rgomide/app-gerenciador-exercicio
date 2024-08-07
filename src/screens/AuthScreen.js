import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native'
import { supabase } from '../service/supabase'
import FlashAlert from '../components/FlashAlert'
import { USER_AREA, CREATE_ACCOUNT } from '../config/screensName'
import textInput from '../styles/textInput'
import boxModel from '../styles/boxModel'
import flex from '../styles/flex'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import langConstants from '../lang/constants'

const AuthScreen = (props) => {
  const { t } = useTranslation()

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
      navigation.navigate(USER_AREA)
    }
    setLoading(false)
  }

  const handleHideAlert = () => {
    setShowAlert(false)
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.boxModel.mainContainer,
        styles.loginContainer,
        { alignItems: 'center', gap: 80 }
      ]}
    >
      <View style={styles.userIcon}>
        <Ionicons name="person-outline" color={'#fff'} size={80} />
      </View>

      <View style={[styles.flex, { gap: 20, width: '85%' }]}>
        <FlashAlert isVisible={showAlert} message={errorMessage} onHide={handleHideAlert} />
        <View style={styles.inputsContainer}>
          <Text style={styles.lblInputs}>{t(langConstants.EMAIL)}</Text>
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
          <Text style={styles.lblInputs}>{t(langConstants.SENHA)}</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
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
              signInWithEmail()
            }}
          >
            <View>
              <Text style={styles.btnText}>{t(langConstants.ENTRAR)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.newAcountTxt, { color: '#fff' }]}>
            {t(langConstants.AINDA_NAO_TEM_UMA_CONTA)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(CREATE_ACCOUNT)
            }}
          >
            <View>
              <Text style={[styles.newAcountTxt, { color: '#F28B0C' }]}>
                {t(langConstants.CRIE_UMA_AGORA)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    height: '100%',
    backgroundColor: '#0D0D0D',
    justifyContent: 'center'
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
    width: '100%',
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

  newAcountTxt: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  ...textInput,
  ...boxModel,
  ...flex
})

export default AuthScreen
