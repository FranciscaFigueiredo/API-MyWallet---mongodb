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

export {
    create,
};
