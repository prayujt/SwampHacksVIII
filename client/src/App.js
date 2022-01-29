import React from 'react';
import './App.css';
import { io } from 'socket.io-client'

function App() {

  const socket = io("http://localhost:8000");


  return (
    <div></div>
  );
}

export default App;
