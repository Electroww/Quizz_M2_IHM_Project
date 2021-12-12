import { createSlice } from '@reduxjs/toolkit'

interface PlayersState {
  playersList: PlayersList<Player>
}

const initialState: PlayersState = {
  playersList: {},
}

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.playersList = action.payload
    },
    setPlayerReady: (state, action) => {
      state.playersList[action.payload.id].ready = action.payload.ready
    },
    setPlayerName: (state, action) => {
      state.playersList[action.payload.id].name = action.payload.name
    },
  },
})

export const { setPlayers, setPlayerReady, setPlayerName } = playersSlice.actions
export default playersSlice.reducer
