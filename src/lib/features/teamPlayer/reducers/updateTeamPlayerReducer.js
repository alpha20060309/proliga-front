// import { PLAYER_POSITION } from 'utils/player.util'
// import { toast } from 'sonner'
// import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global'

// export const updateTeamPlayerReducer = (state, action) => {
//   const {
//     player,
//     team,
//     teamConcat,
//     t,
//     max_same_team_players,
//     transfer_show_modals,
//   } = action.payload
//   const maxTeamPlayers = team.transfers_from_one_team ?? DEFAULT_SAME_TEAM_PLAYERS

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

//   const createUpdatedPlayer = (prevPlayer) => ({
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

//   const existingPlayer = teamConcat.find((p) => p.player_id === player.id)

//   if (existingPlayer) {
//     toast.warning(t('Ushbu oyinchi allaqachon oyinda!'))
//     return state
//   }

//   const clubId = player?.club?.id || player.club.id

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

//   if (
//     state.GOA.length > 0 &&
//     player.position === PLAYER_POSITION.GOA &&
//     state.playersCount.GOA < 1
//   ) {
//     const emptyGOAPlayer = state.GOA.find((p) => !p.name)
//     const newPlayer = createUpdatedPlayer(emptyGOAPlayer)
//     state.GOA = state.GOA.filter((p) => p.id !== emptyGOAPlayer.id)
//     state.GOA.push(newPlayer)
//     state.playersCount.GOA++
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
//   if (
//     player.position === PLAYER_POSITION.DEF &&
//     state.playersCount.DEF < state.DEF.length
//   ) {
//     const emptyDEFPlayer = state.DEF.find((p) => !p.name)
//     const newPlayer = createUpdatedPlayer(emptyDEFPlayer)
//     state.DEF = state.DEF.filter((p) => p.id !== emptyDEFPlayer.id)
//     state.DEF.push(newPlayer)
//     state.playersCount.DEF++
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
//   if (
//     player.position === PLAYER_POSITION.MID &&
//     state.playersCount.MID < state.MID.length
//   ) {
//     const emptyMIDPlayer = state.MID.find((p) => !p.name)
//     const newPlayer = createUpdatedPlayer(emptyMIDPlayer)
//     state.MID = state.MID.filter((p) => p.id !== emptyMIDPlayer.id)
//     state.MID.push(newPlayer)
//     state.playersCount.MID++
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
//   if (
//     player.position === PLAYER_POSITION.STR &&
//     state.playersCount.STR < state.STR.length
//   ) {
//     const emptySTRPlayer = state.STR.find((p) => !p.name)
//     const newPlayer = createUpdatedPlayer(emptySTRPlayer)
//     state.STR = state.STR.filter((p) => p.id !== emptySTRPlayer.id)
//     state.STR.push(newPlayer)
//     state.playersCount.STR++
//     calcTeamPrice()
//     evaluateTeamClubId()
//     return state
//   }
// }
import { PLAYER_POSITION } from 'utils/player.util';
import { toast } from 'sonner';
import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global';

export const updateTeamPlayerReducer = (state, action) => {
  const {
    player,
    team,
    teamConcat, // Assuming this is the flattened array of all players in the team
    t, // Translation function
    max_same_team_players,
    transfer_show_modals,
  } = action.payload;

  const maxPlayersFromOneTeam =
    team.transfers_from_one_team ?? DEFAULT_SAME_TEAM_PLAYERS;

  // Helper function to calculate the total price of the team
  const calculateTeamPrice = (currentState) => {
    const totalPrice =
      currentState.GOA.reduce((acc, p) => acc + p.price, 0) +
      currentState.DEF.reduce((acc, p) => acc + p.price, 0) +
      currentState.MID.reduce((acc, p) => acc + p.price, 0) +
      currentState.STR.reduce((acc, p) => acc + p.price, 0);
    return totalPrice;
  };

  // Helper function to evaluate and update the count of players from each club
  const evaluateTeamClubId = (currentState) => {
    const duplicatesMap = {};
    const allPlayers = [
      ...currentState.GOA,
      ...currentState.DEF,
      ...currentState.MID,
      ...currentState.STR,
    ];

    allPlayers.forEach((p) => {
      const clubId = p?.club?.id ?? '';
      if (p.name) {
        duplicatesMap[clubId] = (duplicatesMap[clubId] || 0) + 1;
      }
    });
    return duplicatesMap;
  };

  // Helper function to create an updated player object
  const createUpdatedPlayer = (basePlayer) => ({
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
  });

  // --- Start of Validation and Logic ---

  // 1. Check if the player is already in the team
  const isPlayerAlreadyInTeam = teamConcat.some((p) => p.player_id === player.id);
  if (isPlayerAlreadyInTeam) {
    toast.warning(t('Ushbu oyinchi allaqachon oyinda!'));
    return state;
  }

  const newPlayerClubId = player?.club?.id;

  // Re-evaluate duplicates map based on the current state before attempting to add
  const currentDuplicatesMap = evaluateTeamClubId(state);

  // 2. Check if adding this player exceeds the max players from the same club
  if (currentDuplicatesMap[newPlayerClubId] === max_same_team_players) {
    toast.warning(t('Max players count reached from the same club!'));
    return { ...state, transferModal: false };
  }

  if (currentDuplicatesMap[newPlayerClubId] >= maxPlayersFromOneTeam) {
    toast.warning(
      t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace(
        '$',
        maxPlayersFromOneTeam
      )
    );
    return {
      ...state,
      transferModal: false,
      clubModal: transfer_show_modals,
    };
  }

  // Determine the target player array based on the new player's position
  let updatedState = { ...state };
  let targetPositionArrayName;

  switch (player.position) {
    case PLAYER_POSITION.GOA:
      targetPositionArrayName = 'GOA';
      break;
    case PLAYER_POSITION.DEF:
      targetPositionArrayName = 'DEF';
      break;
    case PLAYER_POSITION.MID:
      targetPositionArrayName = 'MID';
      break;
    case PLAYER_POSITION.STR:
      targetPositionArrayName = 'STR';
      break;
    default:
      // Should not happen if PLAYER_POSITION is exhaustive
      return state;
  }

  const currentPlayersInPosition = updatedState[targetPositionArrayName];
  const emptyPlayerInPosition = currentPlayersInPosition.find((p) => !p.name);
  const playersCountInPosition = updatedState.playersCount[targetPositionArrayName];

  // Logic for adding a player to an empty slot
  // Ensure there's an empty slot and the position's capacity isn't exceeded
  if (
    emptyPlayerInPosition &&
    playersCountInPosition < currentPlayersInPosition.length
  ) {
    const newPlayer = createUpdatedPlayer(emptyPlayerInPosition);

    // Create a new array for the specific position to maintain immutability
    const updatedPositionArray = currentPlayersInPosition
      .filter((p) => p.id !== emptyPlayerInPosition.id)
      .concat(newPlayer);

    updatedState = {
      ...updatedState,
      [targetPositionArrayName]: updatedPositionArray,
      playersCount: {
        ...updatedState.playersCount,
        [targetPositionArrayName]: playersCountInPosition + 1,
      },
    };

    // Recalculate team price and duplicates map after the update
    updatedState.teamPrice = calculateTeamPrice(updatedState);
    updatedState.duplicatesMap = evaluateTeamClubId(updatedState);

    return updatedState;
  }

  // If no empty slot or other conditions met, return the original state
  return state;
};