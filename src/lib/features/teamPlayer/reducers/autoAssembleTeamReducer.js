// import { PLAYER_POSITION } from 'utils/player.util'

// export const autoAssembleTeamReducer = (state, action) => {
//   const { allPlayers, playerIds, team } = action.payload

//   const calcTeamPrice = () => {
//     state.teamPrice =
//       state.GOA.reduce((acc, player) => acc + player.price, 0) +
//       state.DEF.reduce((acc, player) => acc + player.price, 0) +
//       state.MID.reduce((acc, player) => acc + player.price, 0) +
//       state.STR.reduce((acc, player) => acc + player.price, 0)
//   }

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

//   const createUpdatedPlayer = (prevPlayer, player) => ({
//     ...prevPlayer,
//     player_id: player.id,
//     name: player.name,
//     club: {
//       slug: player.club.slug,
//       id: player.club.id,
//       form_img: player.club?.form_img,
//       logo_img: player.club?.logo_img,
//     },
//     price: player.price,
//     competition_id: team.competition_id.id,
//     user_id: team.user_id,
//     percentage: player.percentage ?? null,
//     image: player.image,
//     player: {
//       name: player.name,
//       name_ru: player.name_ru,
//     },
//   })

//   allPlayers.forEach((player) => {
//     if (playerIds.includes(player.id)) {
//       if (
//         state.GOA.length > 0 &&
//         player.position === PLAYER_POSITION.GOA &&
//         state.playersCount.GOA < 1
//       ) {
//         const emptyGOAPlayer = state.GOA.find((p) => !p.name)
//         const newPlayer = createUpdatedPlayer(emptyGOAPlayer, player)
//         state.GOA = state.GOA.filter((p) => p.id !== emptyGOAPlayer.id)
//         state.GOA.push(newPlayer)
//         state.playersCount.GOA++
//         calcTeamPrice()
//         evaluateTeamClubId()
//         return state
//       }
//       if (
//         player.position === PLAYER_POSITION.DEF &&
//         state.playersCount.DEF < state.DEF.length
//       ) {
//         const emptyDEFPlayer = state.DEF.find((p) => !p.name)
//         const newPlayer = createUpdatedPlayer(emptyDEFPlayer, player)
//         state.DEF = state.DEF.filter((p) => p.id !== emptyDEFPlayer.id)
//         state.DEF.push(newPlayer)
//         state.playersCount.DEF++
//         calcTeamPrice()
//         evaluateTeamClubId()
//         return state
//       }
//       if (
//         player.position === PLAYER_POSITION.MID &&
//         state.playersCount.MID < state.MID.length
//       ) {
//         const emptyMIDPlayer = state.MID.find((p) => !p.name)
//         const newPlayer = createUpdatedPlayer(emptyMIDPlayer, player)
//         state.MID = state.MID.filter((p) => p.id !== emptyMIDPlayer.id)
//         state.MID.push(newPlayer)
//         state.playersCount.MID++
//         calcTeamPrice()
//         evaluateTeamClubId()
//         return state
//       }
//       if (
//         player.position === PLAYER_POSITION.STR &&
//         state.playersCount.STR < state.STR.length
//       ) {
//         const emptySTRPlayer = state.STR.find((p) => !p.name)
//         const newPlayer = createUpdatedPlayer(emptySTRPlayer, player)
//         state.STR = state.STR.filter((p) => p.id !== emptySTRPlayer.id)
//         state.STR.push(newPlayer)
//         state.playersCount.STR++
//         calcTeamPrice()
//         evaluateTeamClubId()
//         return state
//       }
//     }
//   })
// }
import { PLAYER_POSITION } from 'utils/player.util'

// Position configuration mapping
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA', hasSpecialLogic: true },
  [PLAYER_POSITION.DEF]: { key: 'DEF', hasSpecialLogic: false },
  [PLAYER_POSITION.MID]: { key: 'MID', hasSpecialLogic: false },
  [PLAYER_POSITION.STR]: { key: 'STR', hasSpecialLogic: false }
}

export const autoAssembleTeamReducer = (state, action) => {
  const { allPlayers, playerIds, team } = action.payload

  // Helper functions
  const calculateTeamPrice = () => {
    const positions = [state.GOA, state.DEF, state.MID, state.STR]
    state.teamPrice = positions.reduce(
      (total, positionPlayers) => 
        total + positionPlayers.reduce((acc, player) => acc + player.price, 0),
      0
    )
  }

  const updateDuplicatesMap = () => {
    state.duplicatesMap = {}
    const allTeamPlayers = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

    allTeamPlayers.forEach((player) => {
      const clubId = player?.club?.id ?? ''
      if (player.name) {
        state.duplicatesMap[clubId] = (state.duplicatesMap[clubId] || 0) + 1
      }
    })
  }

  const createUpdatedPlayer = (basePlayer, player) => ({
    ...basePlayer,
    player_id: player.id,
    name: player.name,
    club: {
      slug: player.club.slug,
      id: player.club.id,
      form_img: player.club?.form_img,
      logo_img: player.club?.logo_img,
    },
    price: player.price,
    competition_id: team.competition_id.id,
    user_id: team.user_id,
    percentage: player.percentage ?? null,
    image: player.image,
    player: {
      name: player.name,
      name_ru: player.name_ru,
    },
  })

  const updateStateAfterPlayerAdd = () => {
    calculateTeamPrice()
    updateDuplicatesMap()
  }

  const canAddPlayerToPosition = (player, positionKey) => {
    const currentCount = state.playersCount[positionKey]
    const positionPlayers = state[positionKey]
    
    // Special logic for goalkeeper - only 1 allowed and must have existing slots
    if (player.position === PLAYER_POSITION.GOA) {
      return positionPlayers.length > 0 && currentCount < 1
    }
    
    // For other positions - can add if under the current array length
    return currentCount < positionPlayers.length
  }

  const addPlayerToPosition = (player, positionKey) => {
    const positionPlayers = state[positionKey]
    const emptyPlayer = positionPlayers.find(p => !p.name)
    
    if (!emptyPlayer) {
      return // No empty slot available
    }

    const newPlayer = createUpdatedPlayer(emptyPlayer, player)
    
    // Remove empty player and add new player
    state[positionKey] = positionPlayers.filter(p => p.id !== emptyPlayer.id)
    state[positionKey].push(newPlayer)
    state.playersCount[positionKey]++
    
    updateStateAfterPlayerAdd()
  }

  const processPlayer = (player) => {
    if (!playerIds.includes(player.id)) {
      return
    }

    const positionConfig = POSITION_CONFIG[player.position]
    if (!positionConfig) {
      return
    }

    const { key: positionKey } = positionConfig
    
    if (canAddPlayerToPosition(player, positionKey)) {
      addPlayerToPosition(player, positionKey)
    }
  }

  // Process all players to assemble the complete team
  allPlayers.forEach(player => {
    processPlayer(player)
  })

  return state
}