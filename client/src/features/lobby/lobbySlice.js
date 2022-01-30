import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameID: 0,
    players: [],
    host: "",
    messages: [],
    settings: {},
}

export const lobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        createSession: (state, action) => {
            state.gameID = action.payload
        },
        addPlayer: (state, action) => {
            state.players.push(action.payload)
        },
        updatePlayers: (state, action) => {
            state.players = [action.payload]
        },
        removePlayer: (state, action) => {
            const uuid = action.payload.uuid
            state.players.filter(player => player.uuid !== uuid);
        },
        setHost: (state, action) => {
            state = action.payload
        },
        changeSettings: (state, action) => {
            state.settings = action.payload
        },

        //TODO: add transfer host reducer
    },
});

export const { createSession, addPlayer, removePlayer, setHost, changeSettings, updatePlayers } = lobbySlice.actions;

export default lobbySlice.reducer;