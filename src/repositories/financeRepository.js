import { ObjectId } from 'mongodb';
import { connection } from '../database.js';

async function create({
    userId,
    value,
    description,
    date,
}) {
    const db = await connection({ column: 'financialEvents' });

    await db.insertOne({
        userId,
        value,
        description,
        date,
    });
}

async function find({ userId }) {
    const db = await connection({ column: 'financialEvents' });

    const financialEvents = await db.find({ userId: new ObjectId(userId) }).toArray();

    return financialEvents;
}

export {
    create,
    find,
};
