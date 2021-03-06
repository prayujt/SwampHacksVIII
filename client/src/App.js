import React from "react";
import "./App.css";
import { SocketContext, socket } from "./socket";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom'
import Lobby from "./components/lobby/Lobby";
import Login from './components/login/Login';
import Game from "./components/game/Game";
import FindLobby from "./components/login/FindLobby";

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/findlobby' element={<FindLobby />} />
          <Route path='/lobby/:id' element={<Lobby />} />
          <Route path='/game:id'   element={<Game />} /> 
        </Routes>
      </Router>
  );
}

