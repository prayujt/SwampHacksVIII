import { React, useCallback, useContext, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer, updatePlayers } from '../../features/lobby/lobbySlice'
import { SocketContext } from '../../socket'

export default function Lobby() {

    const lobbyID = useSelector(state => state.lobby.gameID)
    const players = useSelector(state => state.lobby.players)
    const isHost = useSelector(state => state.player.isHost)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    socket.on('lobbyPlayerChange', (players) => {
        dispatch(updatePlayers(Object.values(players)))
    })

    const startGame = () => {
        //TODO: Switch out for game selector
        navigate(`/game/${lobbyID}`)
    }

    

    return (
        <div>
            <h1>Lobby: {lobbyID}</h1>
            <button onClick={startGame}>Start Game</button>
            <button>Change settings</button>
            <div>
                {players[0].map((player) => {
                    return <p>{player}</p>
                })}
            </div>
            <div>
                <Host isHost={isHost}/>
            </div>

        </div>
    )
}

const Host = ({ isHost }) => {
    if(isHost) {
        return <h2>You are hosting</h2>
    } else {
        return <h2>Wait for host to start</h2>
    }
}