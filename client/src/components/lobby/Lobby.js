import { React, useCallback, useContext, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer } from '../../features/lobby/lobbySlice'
import { SocketContext } from '../../socket'


export default function Lobby() {

    const lobbyID = useSelector(state => state.lobby.gameID)

    const dispatch = useDispatch()
    const socket = useContext(SocketContext);


    socket.on('lobbyPlayerChange', (players) => {
        console.log("player added")
        console.log(players)
    })

 
    

    return (
        <div>
            <h1>Lobby: {lobbyID}</h1>
            <button>Start Game</button>
            <button>Change settings</button>
          
        </div>
    )
}