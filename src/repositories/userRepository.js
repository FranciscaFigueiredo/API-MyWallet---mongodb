import { ObjectId } from 'mongodb';
import { connection } from '../database.js';

async function create({
    name,
    email,
    password,
}) {
    const db = await connection({ column: 'users' });

    await db.insertOne({
        name,
        email,
        password,
    });
}

async function findByEmail({ email }) {
    const db = await connection({ column: 'users' });

    const searchEmail = await db.findOne({ email });

    return searchEmail;
}

async function deleteSession({ userId }) {
    const db = await connection({ column: 'sessions' });

    await db.deleteMany({ userId: new ObjectId(userId) });

    return true;
}

async function login({
    token,
    userId,
}) {
    const db = await connection({ column: 'sessions' });

    await deleteSession({ userId });

    await db.insertOne({
        token,
        userId,
    });
}

async function findById({ userId }) {
    const db = await connection({ column: 'users' });

    const user = await db.findOne({ _id: new ObjectId(userId) });

    return user;
}

export {
    create,
    findByEmail,
    deleteSession,
    login,
    findById,
};
