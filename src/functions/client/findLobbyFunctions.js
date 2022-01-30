const {
    get,
    getProperty,
	set,
	setProperty,
	update,
	watch,
    pathExists
} = require('../../global');

const { clientLobbyFunctions } = require('./lobbyFunctions');
const { serverLobbyFunctions } = require('../server/lobbyFunctions');

exports.clientFindLobbyFunctions = async (socket, io) => {
	socket.on('joinLobby', async (gameID, username, response) => {
		let gameExists;
		if (gameID == null) gameExists = false;
		else {
			gameExists = await pathExists(
                gameID.toString(),
			);
		}
		let status = true;
		let player = {
			gameID: gameID,
			username: username,
		};
		if (gameExists && gameID != '') {
            socket.join(gameID);
            socket.gameID = gameID;
            socket.username = username;
			await update(gameID + '/players', 
			{
				[socket.id]: username
			});

            clientLobbyFunctions(socket, gameID, username);
		} else {
			status = false;
		}

        let players = await get(gameID.toString() + "/players");

		response({
			status: status,
            player: players
		});
	});

	socket.on('createLobby', async (gameID, username, response) => {
		socket.join(username);
		socket.join(gameID);
		socket.gameID = gameID;
		socket.username = username;
        await set(
            gameID.toString(),
            {
                gameID: gameID,
                gameStarted: false,
                host: username,
                settings: {},
				players: {
					[socket.id]: username
				}
            }
        );

        serverLobbyFunctions(io, gameID);
        clientLobbyFunctions(socket, gameID, username);

		response({
			status: true,
			players: {
				[socket.id]: username
			}
		});
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
};
