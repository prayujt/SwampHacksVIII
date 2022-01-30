import React, { useContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams

} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer, createSession, setHost } from '../../features/lobby/lobbySlice';
import { changeIsHost, changeJoined } from '../../features/player/playerSlice';
import Lobby from '../lobby/Lobby';
import { SocketContext } from '../../socket';

export default function FindLobby() {

    const [joinGameID, setGameID] = useState({value: ''})

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
                dispatch(createSession(joinGameID.value));
                dispatch(changeIsHost(true));
                dispatch(changeJoined(true));
                dispatch(addPlayer(username));
                navigate(`/lobby/${inputGameID}`);
                console.log(response);
            }
        });
        // navigate(`/lobby/:${gameID}`);     //for debugging
    }

    const createGame = () => {
        let newGameID = Math.floor(100000 + Math.random() * 900000)
        dispatch(createSession(newGameID));

        socket.emit('createLobby', newGameID, username, userID, async (response) => {
            await response;
            if(response.status === true) {
                dispatch(changeIsHost(true));
                dispatch(changeJoined(true));
                navigate(`/lobby/${newGameID}`);
            } else {
                alert("failed to create lobby")
            }
        });
        navigate(`/lobby/${newGameID}`);     //for debugging
    }

    const handleChange = (e) => {
       setGameID({value: e.target.value})
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
        <h2>{userID}: {username}</h2>
        <form onSubmit={handelJoinGame}>
            <label>
                Enter User GameID: 
                <input type='text' value={joinGameID.value} onChange={handleChange}></input>
            </label>
            <button type="submit">add</button>
            <button onClick={handelCreateGame}>create game</button>
        </form>
    </div>
    );
}
