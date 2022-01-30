import { React, useCallback, useContext, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer, updatePlayers } from '../../features/lobby/lobbySlice'
import { SocketContext } from '../../socket'
import Button from '@mui/material/Button'
import { ButtonGroup, Paper } from '@mui/material';
import Typography from '@mui/material/Typography'
import './Lobby.css'

export default function Lobby() {

    const gameID = useSelector(state => state.lobby.gameID)
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
        navigate(`/game/${gameID}`)
    }



    return (
        <div className='lobby-container'>
            <header>
                <Typography variant='h2' component='div'>
                    Game code: {gameID}
                </Typography>
            </header>

            <div className='lobby-container-players'>
                <Paper id="lobby-paper-players" variant='elevation'>
                    {players[0].map((player) => {
                        return (

                            <Typography variant='h6' component='p'>
                                {player}
                            </Typography>

                        );
                    })}
                </Paper>
            </div>

            <div className='lobby-container-start'>
                <Button disabled={!isHost} id='lobby-button-start'
                    onClick={startGame}
                    variant='contained'
                >
                    Start Game
                </Button>
                <Host id='host-container' isHost={isHost} />
            </div>

        </div>
    )
}

const Host = ({ isHost }) => {
    if (isHost) {
        return <Typography variant='h5' component='p'>You are hosting</Typography>
    } else {
        return <Typography variant='h5' component='p'>Wait for host to start</Typography>
    }
}