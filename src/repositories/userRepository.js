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

export {
    create,
    findByEmail,
};
