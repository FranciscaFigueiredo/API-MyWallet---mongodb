import { connection } from '../database.js';

async function auth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    }

    const db = await connection({ column: 'sessions' });

    const userSession = await db.findOne({ token });

    const userId = userSession._id;

    res.locals.user = userId;

    return next();
}

export {
    auth,
};
