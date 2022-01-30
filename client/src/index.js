import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import { store } from './app/store';
import { Provider } from 'react-redux';
import { SocketContext, socket } from "./socket";


ReactDOM.render(

  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContext.Provider>

  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
