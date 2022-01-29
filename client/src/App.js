import React from "react";
import "./App.css";
import socket from "./socket";

function App() {
  console.log(socket);
  socket.emit('createLobby', 665423, 'prayuj', async (response) => {
    await response;
    console.log(response);
  });
  // socket.emit('joinLobby', 665422, 'prayuj', async (response) => {
  //   await response;
  //   console.log(response);
  // });

  return <div></div>;
}

export default App;
