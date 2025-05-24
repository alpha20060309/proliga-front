import UZ from '../../../public/locales/uz.json'
import RU from '../../../public/locales/ru.json'

const i18nConfig = {
  locales: ['uz', 'ru'],
  defaultLocale: 'uz',
  dir: 'ltr',
  resources: {
    uz: {
      translation: UZ,
    },
    ru: {
      translation: RU,
    },
  },
  fallbackLng: 'uz',
};

export default i18nConfig;