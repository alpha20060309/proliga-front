// import { PLAYER_POSITION } from 'utils/player.util'

// export const revertTeamPlayersReducer = (state) => {
//   state.GOA = []
//   state.DEF = []
//   state.MID = []
//   state.STR = []
//   state.playersCount = {
//     GOA: 0,
//     DEF: 0,
//     MID: 0,
//     STR: 0,
//   }
//   state.teamPrice = 0
//   state.duplicatesMap = {}

//   const team = state.prevTeam
//   team?.length > 0 &&
//     team.forEach((player) => {
//       const clubSlug = player?.club?.id ?? ''

//       if (player.position === PLAYER_POSITION.GOA) {
//         state.GOA.push(player)
//         if (player.name) {
//           state.playersCount.GOA++
//           state.duplicatesMap[clubSlug] =
//             (state.duplicatesMap[clubSlug] || 0) + 1
//         }
//       }
//       if (player.position === PLAYER_POSITION.DEF) {
//         state.DEF.push(player)
//         if (player.name) {
//           state.playersCount.DEF++
//           state.duplicatesMap[clubSlug] =
//             (state.duplicatesMap[clubSlug] || 0) + 1
//         }
//       }
//       if (player.position === PLAYER_POSITION.MID) {
//         state.MID.push(player)
//         if (player.name) {
//           state.playersCount.MID++
//           state.duplicatesMap[clubSlug] =
//             (state.duplicatesMap[clubSlug] || 0) + 1
//         }
//       }
//       if (player.position === PLAYER_POSITION.STR) {
//         state.STR.push(player)
//         if (player.name) {
//           state.playersCount.STR++
//           state.duplicatesMap[clubSlug] =
//             (state.duplicatesMap[clubSlug] || 0) + 1
//         }
//       }
//     })

//   state.teamPrice =
//     state.GOA.reduce((acc, player) => acc + player.price, 0) +
//     state.DEF.reduce((acc, player) => acc + player.price, 0) +
//     state.MID.reduce((acc, player) => acc + player.price, 0) +
//     state.STR.reduce((acc, player) => acc + player.price, 0)
// }
import { PLAYER_POSITION } from 'utils/player.util'

// Position configuration mapping
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA' },
  [PLAYER_POSITION.DEF]: { key: 'DEF' },
  [PLAYER_POSITION.MID]: { key: 'MID' },
  [PLAYER_POSITION.STR]: { key: 'STR' }
}

export const revertTeamPlayersReducer = (state) => {
  // Helper functions
  const resetTeamState = () => {
    // Clear all position arrays
    Object.values(POSITION_CONFIG).forEach(({ key }) => {
      state[key] = []
    })

    // Reset players count
    state.playersCount = {
      GOA: 0,
      DEF: 0,
      MID: 0,
      STR: 0,
    }

    // Reset team price and duplicates map
    state.teamPrice = 0
    state.duplicatesMap = {}
  }

  const calculateTeamPrice = () => {
    const positions = [state.GOA, state.DEF, state.MID, state.STR]
    state.teamPrice = positions.reduce(
      (total, positionPlayers) =>
        total + positionPlayers.reduce((acc, player) => acc + (player.price || 0), 0),
      0
    )
  }

  const addPlayerToPosition = (player, positionKey) => {
    // Add player to position array
    state[positionKey].push(player)

    // Update count and duplicates map if player has a name
    if (player.name) {
      state.playersCount[positionKey]++

      const clubId = player?.club?.id ?? ''
      if (clubId) {
        state.duplicatesMap[clubId] = (state.duplicatesMap[clubId] || 0) + 1
      }
    }
  }

  const restorePlayersFromPrevTeam = () => {
    const team = state.prevTeam

    if (!team || team.length === 0) {
      return
    }

    team.forEach((player) => {
      const positionConfig = POSITION_CONFIG[player.position]

      if (positionConfig) {
        addPlayerToPosition(player, positionConfig.key)
      }
    })
  }

  // Main revert logic
  resetTeamState()
  restorePlayersFromPrevTeam()
  calculateTeamPrice()
}