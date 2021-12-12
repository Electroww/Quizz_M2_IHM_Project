import { createSlice } from '@reduxjs/toolkit'

interface PlayersState {
  playersList: Player[]
}

const initialState: PlayersState = {
  playersList: [],
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.playersList = action.payload
    },
    addPlayer: (state, action) => {
      state.playersList.push(action.payload)
    },
    removePlayer: (state, action) => {
      state.playersList = state.playersList.filter(
        (player) => player.id !== action.payload,
      )
    },
    setPlayerReady: (state, action) => {
      const player = state.playersList.find((p) => p.id === action.payload.id)
      if (player) {
        player.ready = action.payload.ready
      }
    },
  },
})

export const { setPlayers, addPlayer, removePlayer } = playersSlice.actions
export default playersSlice.reducer
