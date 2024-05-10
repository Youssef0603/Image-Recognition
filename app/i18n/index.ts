import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {default as enTrans} from './en';
import {default as arTrans} from './ar';

//add more languages here
//import {default as frTrans} from './fr';

const RTLSupportedLanguages = ['ar'];
const DefaultLanguage = 'en';

const resources = {
  en: {
    translation: enTrans,
  },
  ar: {
    translation: arTrans,
  },
  //fr: {
  //  translation: frTrans,
  //},
};

AsyncStorage.getItem('lang')
  .then(value => {
    let lang = value || DefaultLanguage;
    langInit(lang);
  })
  .catch(() => {
    langInit(DefaultLanguage);
  });

const langInit = async (lng: string) => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: lng,
    interpolation: {
      escapeValue: false,
    },
  });
};

i18n.on('languageChanged', lng => {
  AsyncStorage.setItem('lang', lng);
  I18nManager.forceRTL(RTLSupportedLanguages.includes(lng));
});

export default i18n;
