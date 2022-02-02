function auth(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    }
    return next();
}

export {
    auth,
};
