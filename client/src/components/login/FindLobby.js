import React, { useContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams

} from 'react-router-dom';
import './FindLobby.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer, createSession, setHost } from '../../features/lobby/lobbySlice';
import { changeIsHost, changeJoined } from '../../features/player/playerSlice';
import Lobby from '../lobby/Lobby';
import { SocketContext } from '../../socket';

export default function FindLobby() {

    const [joinGameID, setGameID] = useState({ value: '' })

    const navigate = useNavigate();
    //const gameUrl = useParams();

    const userID = useSelector(state => state.player.uuid)
    const username = useSelector(state => state.player.name)
    const gameID = useSelector(state => state.lobby.gameID)

    const dispatch = useDispatch();
    const socket = useContext(SocketContext);



    const joinGame = async () => {
        let inputGameID = parseInt(joinGameID.value)
        console.log(inputGameID);
        socket.emit('joinLobby', inputGameID, username, async (response) => {
            await response;
            if (response.status === false) {
                alert('Invalid Game ID!')
            } else {
                console.log(response.player)
                dispatch(createSession(joinGameID.value));
                dispatch(changeIsHost(false));
                dispatch(changeJoined(true));
                dispatch(addPlayer(Object.values(response.player)));
                navigate(`/lobby/${inputGameID}`);
            }
        });
        // navigate(`/lobby/:${gameID}`);     //for debugging
    }

    const createGame = () => {
        let newGameID = Math.floor(100000 + Math.random() * 900000)
        dispatch(createSession(newGameID));

        socket.emit('createLobby', newGameID, username, async (response) => {
            await response;
            if (response.status === true) {
                console.log(response.player)
                dispatch(changeIsHost(true));
                dispatch(changeJoined(true));
                dispatch(addPlayer([username]))
                navigate(`/lobby/${newGameID}`);
            } else {
                alert("failed to create lobby")
            }
        });
        //navigate(`/lobby/${newGameID}`);     //for debugging
    }

    const handleChange = (e) => {
        setGameID({ value: e.target.value })
    }

    const handelJoinGame = (e) => {
        e.preventDefault();
        joinGame();

    }

    const handelCreateGame = (e) => {
        e.preventDefault();
        createGame();
    }

    return (
        <div className="findlobby-container">
            <header className="findlobby-header">
                <Typography variant='h2' component='div'>
                    Welcome {username}
                </Typography>
            </header>
            <section>
                <form id='findlobby-form' onSubmit={handelJoinGame}>
                    <label>
                        <TextField
                            id="findlobby-input"
                            label="Enter code"
                            variant="outlined"
                            value={joinGameID.value}
                            onChange={handleChange} />
                    </label>
                    <Button variant='outlined' id='findlobby-button-join' type='submit'>Join Game</Button>
                </form>
            </section>
            <section className='or-container'>
                <Typography variant='h4' component='div'>
                    or
                </Typography>
            </section>
            <Button variant='contained' id='findlobby-button-create' onClick={handelCreateGame} color='error'>Create Game</Button>
        </div>
    );
}
