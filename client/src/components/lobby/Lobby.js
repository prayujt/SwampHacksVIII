import { React, useCallback, useContext, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer } from '../../features/lobby/lobbySlice'
import { SocketContext } from '../../socket'


export default function Lobby() {

    const lobbyID = useSelector(state => state.lobby.gameID)
    const players = useSelector(state => state.lobby.players)

    const dispatch = useDispatch()
    const socket = useContext(SocketContext);

    console.log(players)


    socket.on('onLobbyChange', (players) => {
        dispatch(Object.values(players))
    })



    return (
        <div>
            <h1>Lobby: {lobbyID}</h1>
            <button>Start Game</button>
            <button>Change settings</button>
            <div>
                <ul>
                    {players[0].map(player => {
                        console.log(player)
                        return <li>{player}</li>
                    })}
                </ul>
            </div>

        </div>
    )
}