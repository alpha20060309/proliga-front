import UZ from '../../../static/locales/uz.json'
import RU from '../../../static/locales/ru.json'

const i18nConfig = {
  locales: ['uz', 'ru'],
  defaultLocale: 'uz',
  dir: 'ltr',
  prefixDefault: true,
  resources: {
    uz: {
      translation: UZ,
    },
    ru: {
      translation: RU,
    },
  },
}

export default i18nConfig
