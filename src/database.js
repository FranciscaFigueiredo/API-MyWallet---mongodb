import './setup.js';
import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function connection({ column }) {
    await mongoClient.connect();

    const db = mongoClient.db('MyWallet-db').collection(column);
    return db;
}

async function closeConnection() {
    await mongoClient.close();
}

export {
    connection,
    closeConnection,
};
