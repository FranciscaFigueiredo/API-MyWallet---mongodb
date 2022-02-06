import { loginSchema, userSchema } from '../validations/userValidation.js';

import BodyError from '../errors/BodyError.js';
import ConflictError from '../errors/ConflictError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

import * as userService from '../services/userService.js';

async function signUp(req, res) {
    const {
        name,
        email,
        password,
        confirmPassword,
    } = req.body;

    const validate = userSchema.validate({
        name,
        email,
        password,
        confirmPassword,
    });

    if (validate.error) {
        return res.status(400).send('Dados inválidos');
    }

    try {
        await userService.registerUser({
            name,
            email,
            password,
            confirmPassword,
        });

        return res.status(201).send('Usuário cadastrado com sucesso');
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }

        if (error instanceof ConflictError) {
            return res.status(409).send(error.message);
        }
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function login(req, res) {
    const {
        email,
        password,
    } = req.body;

    const validate = loginSchema.validate({
        email,
        password,
    });

    if (validate.error) {
        return res.status(400).send('Dados inválidos');
    }

    try {
        const token = await userService.authenticateUser({
            email,
            password,
        });

        if (!token) {
            throw new UnauthorizedError();
        }

        return res.status(200).send(token);
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }

        if (error instanceof UnauthorizedError) {
            return res.status(401).send(error.message);
        }

        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function getUserInfo(req, res) {
    const userId = res.locals.user;

    try {
        const userInfo = await userService.findUserInfo({ userId });

        return res.status(200).send(userInfo);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function postLogout(req, res) {
    const userId = res.locals.user;

    try {
        await userService.logoutUser({ userId });

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    signUp,
    login,
    getUserInfo,
    postLogout,
};
