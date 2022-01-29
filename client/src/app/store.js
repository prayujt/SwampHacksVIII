import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/player/playerSlice'
import lobbyReducer from '../features/lobby/lobbySlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    lobby: lobbyReducer
  },
});
