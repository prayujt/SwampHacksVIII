import React from "react";
import "./App.css";
import socket from "./socket";

function App() {
  console.log(socket);
  socket.emit('createLobby', 665422, 'prayuj', (response) => {
    console.log(response);
  });

  return <div></div>;
}

export default App;
