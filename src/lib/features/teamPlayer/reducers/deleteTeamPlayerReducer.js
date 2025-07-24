// import { PLAYER_POSITION } from 'utils/player.util'
// import { toast } from 'sonner'

// export const deleteTeamPlayerReducer = (state, action) => {
//   const { player, is_team_created, t } = action.payload

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

//   const deletedPlayerObj = (prevPlayer) => ({
//     ...prevPlayer,
//     player_id: null,
//     name: null,
//     club: null,
//     price: null,
//     percentage: null,
//     image: null,
//   })

//   if (player.position === PLAYER_POSITION.GOA) {
//     state.GOA = state.GOA.filter((p) => p.id !== player.id)
//     state.GOA.push(deletedPlayerObj(player))
//     state.playersCount.GOA--
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
//   if (player.position === PLAYER_POSITION.DEF) {
//     if (state.playersCount.DEF < 4 && is_team_created) {
//       toast.warning(t('Sizda kamida 3 himoyachi bolishi shart!'))
//       return state
//     }
//     state.DEF = state.DEF.filter((p) => p.id !== player.id)
//     state.DEF.push(deletedPlayerObj(player))
//     state.playersCount.DEF--
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
//   if (player.position === PLAYER_POSITION.MID) {
//     if (state.playersCount.MID < 4 && is_team_created) {
//       toast.warning(t('Sizda kamida 3 yarim himoyachi bolishi shart!'))
//       return state
//     }
//     state.MID = state.MID.filter((p) => p.id !== player.id)
//     state.MID.push(deletedPlayerObj(player))
//     state.playersCount.MID--
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
//   if (player.position === PLAYER_POSITION.STR) {
//     if (state.playersCount.STR < 3 && is_team_created) {
//       toast.warning(t('Sizda kamida 2 hujumchi bolishi shart!'))
//       return state
//     }
//     state.STR = state.STR.filter((p) => p.id !== player.id)
//     state.STR.push(deletedPlayerObj(player))
//     state.playersCount.STR--
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
// }
import { PLAYER_POSITION } from 'utils/player.util'
import { toast } from 'sonner'

// Position configuration with minimum limits and validation messages
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: {
    key: 'GOA',
    minPlayers: 1,
    warningMessage: null, // Goalkeepers don't have a minimum validation
    hasMinimumValidation: false
  },
  [PLAYER_POSITION.DEF]: {
    key: 'DEF',
    minPlayers: 3,
    warningMessage: 'Sizda kamida 3 himoyachi bolishi shart!',
    hasMinimumValidation: true
  },
  [PLAYER_POSITION.MID]: {
    key: 'MID',
    minPlayers: 3,
    warningMessage: 'Sizda kamida 3 yarim himoyachi bolishi shart!',
    hasMinimumValidation: true
  },
  [PLAYER_POSITION.STR]: {
    key: 'STR',
    minPlayers: 2,
    warningMessage: 'Sizda kamida 2 hujumchi bolishi shart!',
    hasMinimumValidation: true
  }
}

export const deleteTeamPlayerReducer = (state, action) => {
  const { player, is_team_created, t } = action.payload

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

  const createDeletedPlayerObject = (playerToDelete) => ({
    ...playerToDelete,
    player_id: null,
    name: null,
    club: null,
    price: null,
    percentage: null,
    image: null,
  })

  const updateStateAfterDeletion = () => {
    calculateTeamPrice()
    updateDuplicatesMap()
  }

  const canDeletePlayer = (positionKey, positionConfig) => {
    if (!is_team_created || !positionConfig.hasMinimumValidation) {
      return true
    }

    const currentCount = state.playersCount[positionKey]
    const minRequired = positionConfig.minPlayers + 1 // +1 because we check before decrementing

    if (currentCount < minRequired) {
      toast.warning(t(positionConfig.warningMessage))
      return false
    }

    return true
  }

  const deletePlayerFromPosition = (positionKey, playerToDelete) => {
    // Remove player from position array
    state[positionKey] = state[positionKey].filter(p => p.id !== playerToDelete.id)
    
    // Add deleted player object back to maintain array structure
    state[positionKey].push(createDeletedPlayerObject(playerToDelete))
    
    // Decrement count
    state.playersCount[positionKey]--
    
    // Update calculated values
    updateStateAfterDeletion()
  }

  // Main deletion logic
  const positionConfig = POSITION_CONFIG[player.position]
  
  if (!positionConfig) {
    return state // Unknown position
  }

  const { key: positionKey } = positionConfig

  // Check if deletion is allowed
  if (!canDeletePlayer(positionKey, positionConfig)) {
    return state
  }

  // Perform deletion
  deletePlayerFromPosition(positionKey, player)
  
  return state
}