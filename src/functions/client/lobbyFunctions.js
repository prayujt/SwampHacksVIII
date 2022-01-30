const {
    get,
    getProperty,
	set,
	setProperty,
	update,
	watch,
    pathExists,
    deleteReference,
    deleteProperty
} = require('../../global');

exports.clientLobbyFunctions = async (socket, gameID, username) => {
    socket.on('disconnect', async () => {
        let temp = await getProperty(gameID.toString(), "host");
        let host = temp.val();
        if (username === host) {
            let playerFound = false;
            temp = await get(gameID.toString() + "/players");
            let players = temp.val();
            let ids = Object.keys(players);
            for (let i = 0; i < ids.length; i++) {
                if (players[ids[i]] != username) {
                    let newKey = players[ids[i]];
                    temp = players;
                    delete temp[socket.id]
                    await update(gameID.toString(), {
                        "host": newKey,
                        "players": temp
                    });
                    playerFound = true;
                    break;
                }
            };
            if (!playerFound) {
                await deleteReference(gameID.toString());
            }
        }
        else {
            temp = await get(gameID.toString() + "/players");
            temp = temp.val()
            delete temp[socket.id]
            console.log(temp);
            await update(gameID.toString(), {
                "players": temp
            });
        }
    });
}
