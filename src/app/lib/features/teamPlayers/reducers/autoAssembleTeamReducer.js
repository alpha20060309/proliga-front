import { PLAYERS } from 'app/utils/players.util'

export const autoAssembleTeamReducer = (state, action) => {
  const { allPlayers, playerIds, team } = action.payload

  const calcTeamPrice = () => {
    state.teamPrice =
      state.GOA.reduce((acc, player) => acc + player.price, 0) +
      state.DEF.reduce((acc, player) => acc + player.price, 0) +
      state.MID.reduce((acc, player) => acc + player.price, 0) +
      state.STR.reduce((acc, player) => acc + player.price, 0)
  }

  const evaluateTeamClubId = () => {
    state.duplicatesMap = {}
    const newTeam = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

    newTeam.forEach((player) => {
      const clubSlug = player?.club_id?.id ?? ''

      if (player.name) {
        state.duplicatesMap[clubSlug] = (state.duplicatesMap[clubSlug] || 0) + 1
      }
    })
  }

  const createUpdatedPlayer = (prevPlayer, player) => ({
    ...prevPlayer,
    player_id: player.id,
    name: player.name,
    club_id: {
      slug: player.club.slug,
      id: player.club.id,
    },
    price: player.price,
    competition_id: team.competition_id.id,
    user_id: team.user_id,
    percentage: player.percentage ?? null,
    image: player.image,
  })

  allPlayers.forEach((player) => {
    if (playerIds.includes(player.id)) {
      if (
        state.GOA.length > 0 &&
        player.position === PLAYERS.GOA &&
        state.playersCount.GOA < 1
      ) {
        const emptyGOAPlayer = state.GOA.find((p) => !p.name)
        const newPlayer = createUpdatedPlayer(emptyGOAPlayer, player)
        state.GOA = state.GOA.filter((p) => p.id !== emptyGOAPlayer.id)
        state.GOA.push(newPlayer)
        state.playersCount.GOA++
        calcTeamPrice()
        evaluateTeamClubId()
        return state
      }
      if (
        player.position === PLAYERS.DEF &&
        state.playersCount.DEF < state.DEF.length
      ) {
        const emptyDEFPlayer = state.DEF.find((p) => !p.name)
        const newPlayer = createUpdatedPlayer(emptyDEFPlayer, player)
        state.DEF = state.DEF.filter((p) => p.id !== emptyDEFPlayer.id)
        state.DEF.push(newPlayer)
        state.playersCount.DEF++
        calcTeamPrice()
        evaluateTeamClubId()
        return state
      }
      if (
        player.position === PLAYERS.MID &&
        state.playersCount.MID < state.MID.length
      ) {
        const emptyMIDPlayer = state.MID.find((p) => !p.name)
        const newPlayer = createUpdatedPlayer(emptyMIDPlayer, player)
        state.MID = state.MID.filter((p) => p.id !== emptyMIDPlayer.id)
        state.MID.push(newPlayer)
        state.playersCount.MID++
        calcTeamPrice()
        evaluateTeamClubId()
        return state
      }
      if (
        player.position === PLAYERS.STR &&
        state.playersCount.STR < state.STR.length
      ) {
        const emptySTRPlayer = state.STR.find((p) => !p.name)
        const newPlayer = createUpdatedPlayer(emptySTRPlayer, player)
        state.STR = state.STR.filter((p) => p.id !== emptySTRPlayer.id)
        state.STR.push(newPlayer)
        state.playersCount.STR++
        calcTeamPrice()
        evaluateTeamClubId()
        return state
      }
    }
  })
}
