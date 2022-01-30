const {
    get,
    getProperty,
    set,
    setProperty,
    update,
    watch,
    pathExists
} = require('../../global');

exports.serverLobbyFunctions = async (io, gameID) => {
    let playersWatch = watch(
        gameID + '/players',
        async (value) => {
            let temp = await get(gameID.toString() + '/players');
            let players = temp.val();
            console.log(players)
            io.to(gameID).emit('lobbyPlayerChange', players);
        }
    );

    let gameStartedWatch = watch(
        gameID.toString(),
        async (value) => {
            if (value.val().gameStarted == true) {
                await playersWatch.close();
                await gameStartedWatch.close();
                serverGameFunctions(io, gameID);
            }
        }
    );
}
