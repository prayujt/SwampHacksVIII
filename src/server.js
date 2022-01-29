const { createServer } = require('http');

const httpServer = createServer();

const io = require('socket.io')(httpServer, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});


io.on('connection', (socket) => {
  console.log(socket.id);
  console.log('bitches');
});

httpServer.listen(8000);
