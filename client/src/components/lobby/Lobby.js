import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"


export default function Lobby() {

    const lobbyID = useSelector(state => state.lobby.gameID) 

    return (
        <div>
            <h1>Lobby: {lobbyID}</h1>
            <button>Start Game</button>
            <button>Change settings</button>
            <ul>
                <li></li>
            </ul>
        </div>
    )
}