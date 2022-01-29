import { io } from "socket.io-client";

let socket = io("localhost:8000");

export default socket;
