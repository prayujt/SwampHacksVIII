import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate

} from 'react-router-dom'
import Lobby from '../lobby/Lobby';
import CreateLobby from './FindLobby';
import { changeName, changeUUID } from '../../features/player/playerSlice';
import { v4 as uuidv4 } from 'uuid';


export default function Login() {
    const [username, setUsername] = useState({value: ""});

    const name = useSelector((state) => state.player.name);
    const uuid = uuidv4();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    console.log(name)

    //handel form
    const handleChange = (e) => {
        setUsername({value: e.target.value});
    }
    const addUser = (e) => {
        e.preventDefault();

        if(username.value !== '') {
            setUsername({value: ""})
            dispatch(changeUUID(uuid));
            dispatch(changeName(username.value))
            setUsername({value: ""})
            navigate('/findlobby')
        } 
        else {
            alert("Please enter valid username");
        }
    
    }


    return (
        <div className="login-container">
            <form onSubmit={addUser}>
                <label>
                    Enter User Name: 
                    <input type='text' value={username.value} onChange={handleChange}></input>
                </label>
                <button type="submit">add</button>
            </form>
        </div>
    );
}
