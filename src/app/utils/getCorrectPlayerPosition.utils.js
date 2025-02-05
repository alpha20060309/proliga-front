import { LANGUAGE } from './languages.util'
import { PLAYERS } from './players.util'

export const getCorrentPlayerPosition = (position, lang, type = 'short') => {
  if (type === 'short') {
    if (lang === LANGUAGE.uz) {
      switch (position) {
        case PLAYERS.GOA:
          return 'DR'
        case PLAYERS.DEF:
          return 'HM'
        case PLAYERS.MID:
          return 'YH'
        case PLAYERS.STR:
          return 'HJ'
        default:
          return position
      }
    }
    if (lang === LANGUAGE.ru) {
      switch (position) {
        case PLAYERS.GOA:
          return 'ВР'
        case PLAYERS.DEF:
          return 'ЗЩ'
        case PLAYERS.MID:
          return 'ПЗ'
        case PLAYERS.STR:
          return 'НП'
        default:
          return position
      }
    }
  }
  if (type === 'full') {
    if (lang === LANGUAGE.uz) {
      switch (position) {
        case PLAYERS.GOA:
          return 'Darvozabon'
        case PLAYERS.DEF:
          return 'Himoyachi'
        case PLAYERS.MID:
          return 'Yarim Himoyachi'
        case PLAYERS.STR:
          return 'Hujumchi'
        default:
          return position
      }
    }
    if (lang === LANGUAGE.ru) {
      switch (position) {
        case PLAYERS.GOA:
          return 'Вратарь'
        case PLAYERS.DEF:
          return 'Защитник'
        case PLAYERS.MID:
          return 'Полузащитник'
        case PLAYERS.STR:
          return 'Нападающий'
        default:
          return position
      }
    }
  }
}
