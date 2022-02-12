import { ObjectId } from 'mongodb';
import { connection } from '../database.js';
import NotFoundError from '../errors/NotFoundError.js';

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

async function deleteFinancialEvent({ userId, id }) {
    const db = await connection({ column: 'financialEvents' });

    const financialEvent = await db.findOne({
        userId: new ObjectId(userId),
        _id: new ObjectId(id),
    });

    if (!financialEvent) {
        throw new NotFoundError();
    }

    await db.deleteOne({
        userId: new ObjectId(userId),
        _id: new ObjectId(id),
    });

    return true;
}

async function findOneFinancialEvent({ id, userId }) {
    const db = await connection({ column: 'financialEvents' });

    const financialEvent = await db.findOne({
        userId: new ObjectId(userId),
        _id: new ObjectId(id),
    });

    if (!financialEvent) {
        throw new NotFoundError();
    }

    return financialEvent;
}

async function updateFinancialEvent({
    id,
    userId,
    value,
    description,
    date,
}) {
    const db = await connection({ column: 'financialEvents' });

    const financialEvent = await db.findOne({
        userId: new ObjectId(userId),
        _id: new ObjectId(id),
    });

    if (!financialEvent) {
        throw new NotFoundError();
    }

    await db.updateOne({
        userId: new ObjectId(userId),
        _id: new ObjectId(id),
    }, { $set: { value, description, date } });

    return true;
}

export {
    create,
    find,
    deleteFinancialEvent,
    findOneFinancialEvent,
    updateFinancialEvent,
};
