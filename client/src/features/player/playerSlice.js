import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uuid: "",
    name: "",
    isHost: false,
    joined: false,
    score: 0,
}

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        changeUUID: (state, action) => {
            state.uuid = action.payload
        },
        changeName: (state, action) => {
            state.name = action.payload
        },
        changeIsHost: (state, action) => {
            state.isHost = action.payload
        },
        changeScore: (state, action) => {
            state.score = action.payload
        },
        changeJoined: (state, action) => {
            state.joined = action.payload
        }

    },
});

export const { changeUUID, changeName, changeIsHost, changeScore, changeJoined } = playerSlice.actions;

export default playerSlice.reducer;