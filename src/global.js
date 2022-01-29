const database = require('./firebase').database;

exports.createTable = async (collection, client) => {
	await client.createCollection(collection);
};

exports.dropCollection = async (collection, client) => {
	await client.collection(collection).drop();
};

exports.get = async (path) => {
    let ref = await database.ref(path);
    let data;
    await ref.once('value', async (data_) => {
        await data_;
        data = data_;
    });
    return data;
};

exports.getProperty = async (path, property) => {
    let ref = await database.ref(path).child(property);
    let data;
    await ref.once('value', async (data_) => {
        await data_;
        data = data_;
    });
    return data;
};

exports.set = async (path, data) => {
    let ref = await database.ref(path);
    await ref.set(data);
};

exports.setProperty = async (path, property, data) => {
    let ref = await database.ref(path).child(property);
    await ref.set(data);
};

exports.update = async (path, data) => {
    let ref = await database.ref(path);
    await ref.update(data);
};

exports.watch = async (path, callback) => {
    let ref = await database.ref(path);
    ref.on('value', async (data) => {
        await data;
        callback(data);
    });
};

exports.pathExists = async (path) => {
    let ref = await database.ref(path);
    let status = false;
    await ref.once('value', async (snapshot) => {
        if (snapshot.exists()) status = true;
        else status = false;
    });
    return status;
}
