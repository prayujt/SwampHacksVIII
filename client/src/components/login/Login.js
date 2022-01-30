import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
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
    const [username, setUsername] = useState({ value: "" });

    const name = useSelector((state) => state.player.name);
    const uuid = uuidv4();

    const dispatch = useDispatch();

    let navigate = useNavigate();

    //console.log(name)

    //handel form
    const handleChange = (e) => {
        setUsername({ value: e.target.value });
    }
    const addUser = (e) => {
        e.preventDefault();

        if (username.value !== '') {
            setUsername({ value: "" })
            dispatch(changeUUID(uuid));
            dispatch(changeName(username.value))
            setUsername({ value: "" })
            navigate('/findlobby')
        }
        else {
            alert("Please enter valid username");
        }

    }


    return (
        <div className="login-container">
            <header className="login-header">
                <Typography variant='h1' component='div'>
                    SHAZOOT
                </Typography>
            </header>
            <section>
                <form onSubmit={addUser} className='login-form'>
                    <label>
                        <TextField
                            id="username-input"
                            label="enter username"
                            variant="outlined"
                            value={username.value}
                            onChange={handleChange} />
                    </label>
                    <Button
                        className='login-button' 
                        variant='contained'
                        type='submit'
                        size='large'
                    >
                        Enter
                    </Button>

                </form>
            </section>
        </div>
    );
}
