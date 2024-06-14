import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ptBr from './pt-BR.json'

const resources = {
  en: en,
  ptBr: ptBr
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'ptBr'
})

export default { i18n }
