const { createServer } = require("http");
const { clientFindLobbyFunctions } = require('./functions/client/findLobbyFunctions');

const {
    get,
    getProperty,
    set,
    setProperty,
    update,
    watch,
    pathExists
} = require('./global');

const httpServer = createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected " + socket.id);
  clientFindLobbyFunctions(socket, io);
});

let port = 8000;

httpServer.listen(port => {
  console.log(`server is running on ${port}`)
});
