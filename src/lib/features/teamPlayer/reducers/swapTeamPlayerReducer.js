// import { PLAYER_POSITION } from 'utils/player.util'
// import { toast } from 'sonner'

// export const swapTeamPlayerReducer = (state, action) => {
//   const {
//     player,
//     team,
//     previousPlayer,
//     t,
//     transfer_show_modals,
//     max_same_team_players,
//   } = action.payload
//   const maxTeamPlayers = team.transfers_from_one_team ?? 2

//   const evaluateTeamClubId = () => {
//     state.duplicatesMap = {}
//     const newTeam = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

//     newTeam.forEach((player) => {
//       const clubSlug = player?.club?.id ?? ''

//       if (player.name) {
//         state.duplicatesMap[clubSlug] = (state.duplicatesMap[clubSlug] || 0) + 1
//       }
//     })
//   }

//   const calcTeamPrice = () => {
//     state.teamPrice =
//       state.GOA.reduce((acc, player) => acc + player.price, 0) +
//       state.DEF.reduce((acc, player) => acc + player.price, 0) +
//       state.MID.reduce((acc, player) => acc + player.price, 0) +
//       state.STR.reduce((acc, player) => acc + player.price, 0)
//   }

//   const createUpdatedPlayer = (prevPlayer, newPlayer) => ({
//     ...prevPlayer,
//     id: prevPlayer.id,
//     club: {
//       slug: player.club.slug,
//       id: player.club.id,
//       form_img: player.club?.form_img,
//       logo_img: player.club?.logo_img,
//     },
//     name: newPlayer.name,
//     position: newPlayer.position,
//     player_id: newPlayer.id,
//     price: newPlayer.price,
//     competition_id: team.competition_id.id,
//     user_id: team.user_id,
//     image: newPlayer.image,
//     percentage: newPlayer.percentage ?? null,
//     player: {
//       name: newPlayer.name,
//       name_ru: newPlayer.name_ru,
//     },
//   })

//   const clubId = player.club.id || player.club.id

//   if (state.duplicatesMap[clubId] === max_same_team_players) {
//     toast.warning(t('Max players count reached from the same club!'))
//     state.transferModal = false
//     return state
//   }
//   if (state.duplicatesMap[clubId] > maxTeamPlayers - 1) {
//     toast.warning(
//       t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace(
//         '$',
//         maxTeamPlayers
//       )
//     )
//     state.transferModal = false
//     state.clubModal = transfer_show_modals
//     return state
//   }

//   if (state.GOA.length > 0 && player.position === PLAYER_POSITION.GOA) {
//     const prevPlayer = state.GOA.find((p) => previousPlayer.id === p.player_id)
//     const prevPlayerIndex = state.GOA.findIndex(
//       (p) => previousPlayer.id === p.player_id
//     )
//     state.GOA[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
//     evaluateTeamClubId()
//     calcTeamPrice()
//     state.transferModal = false
//     toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"))
//     return state
//   }
//   if (player.position === PLAYER_POSITION.DEF && state.DEF.length > 0) {
//     const prevPlayer = state.DEF.find((p) => previousPlayer.id === p.player_id)
//     const prevPlayerIndex = state.DEF.findIndex(
//       (p) => previousPlayer.id === p.player_id
//     )
//     state.DEF[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
//     evaluateTeamClubId()
//     calcTeamPrice()
//     state.transferModal = false
//     toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"))
//     return state
//   }
//   if (player.position === PLAYER_POSITION.MID && state.MID.length > 0) {
//     const prevPlayer = state.MID.find((p) => previousPlayer.id === p.player_id)
//     const prevPlayerIndex = state.MID.findIndex(
//       (p) => previousPlayer.id === p.player_id
//     )
//     state.MID[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
//     evaluateTeamClubId()
//     calcTeamPrice()
//     state.transferModal = false
//     toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"))
//     return state
//   }
//   if (player.position === PLAYER_POSITION.STR && state.STR.length > 0) {
//     const prevPlayer = state.STR.find((p) => previousPlayer.id === p.player_id)
//     const prevPlayerIndex = state.STR.findIndex(
//       (p) => previousPlayer.id === p.player_id
//     )
//     state.STR[prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
//     evaluateTeamClubId()
//     calcTeamPrice()
//     state.transferModal = false
//     toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"))
//     return state
//   }
// }
import { PLAYER_POSITION } from 'utils/player.util'
import { toast } from 'sonner'
import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global'

// Position configuration mapping
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA' },
  [PLAYER_POSITION.DEF]: { key: 'DEF' },
  [PLAYER_POSITION.MID]: { key: 'MID' },
  [PLAYER_POSITION.STR]: { key: 'STR' }
}

export const swapTeamPlayerReducer = (state, action) => {
  const {
    player,
    team,
    previousPlayer,
    t,
    transfer_show_modals,
    max_same_team_players,
  } = action.payload
  
  const maxTeamPlayers = team.transfers_from_one_team ?? DEFAULT_SAME_TEAM_PLAYERS

  // Helper functions
  const updateDuplicatesMap = () => {
    state.duplicatesMap = {}
    const allPlayers = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

    allPlayers.forEach((player) => {
      const clubId = player?.club?.id ?? ''
      if (player.name) {
        state.duplicatesMap[clubId] = (state.duplicatesMap[clubId] || 0) + 1
      }
    })
  }

  const calculateTeamPrice = () => {
    const positions = [state.GOA, state.DEF, state.MID, state.STR]
    state.teamPrice = positions.reduce(
      (total, positionPlayers) => 
        total + positionPlayers.reduce((acc, player) => acc + player.price, 0),
      0
    )
  }

  const createUpdatedPlayer = (basePlayer, newPlayer) => ({
    ...basePlayer,
    id: basePlayer.id,
    club: {
      slug: player.club.slug,
      id: player.club.id,
      form_img: player.club?.form_img,
      logo_img: player.club?.logo_img,
    },
    name: newPlayer.name,
    position: newPlayer.position,
    player_id: newPlayer.id,
    price: newPlayer.price,
    competition_id: team.competition_id.id,
    user_id: team.user_id,
    image: newPlayer.image,
    percentage: newPlayer.percentage ?? null,
    player: {
      name: newPlayer.name,
      name_ru: newPlayer.name_ru,
    },
  })

  const updateStateAfterSwap = () => {
    updateDuplicatesMap()
    calculateTeamPrice()
    state.transferModal = false
    toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"))
  }

  const showMaxPlayersWarning = () => {
    toast.warning(t('Max players count reached from the same club!'))
    state.transferModal = false
  }

  const showClubLimitWarning = () => {
    toast.warning(
      t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace('$', maxTeamPlayers)
    )
    state.transferModal = false
    state.clubModal = transfer_show_modals
  }

  const swapPlayerInPosition = (positionKey) => {
    const positionPlayers = state[positionKey]
    
    if (positionPlayers.length === 0) {
      return false
    }

    const prevPlayer = positionPlayers.find(p => previousPlayer.id === p.player_id)
    if (!prevPlayer) {
      return false
    }

    const prevPlayerIndex = positionPlayers.findIndex(p => previousPlayer.id === p.player_id)
    if (prevPlayerIndex === -1) {
      return false
    }

    // Perform the swap
    state[positionKey][prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
    updateStateAfterSwap()
    return true
  }

  // Validation: Check club limits
  const clubId = player.club.id || player.club.id

  if (state.duplicatesMap[clubId] === max_same_team_players) {
    showMaxPlayersWarning()
    return state
  }

  if (state.duplicatesMap[clubId] > maxTeamPlayers - 1) {
    showClubLimitWarning()
    return state
  }

  // Main swap logic
  const positionConfig = POSITION_CONFIG[player.position]
  if (!positionConfig) {
    return state // Unknown position
  }

  const { key: positionKey } = positionConfig
  const swapSuccessful = swapPlayerInPosition(positionKey)

  if (!swapSuccessful) {
    // Could add error handling here if needed
    return state
  }

  return state
}