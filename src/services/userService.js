import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import BodyError from '../errors/BodyError.js';
import ConflictError from '../errors/ConflictError.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

import * as userRepository from '../repositories/userRepository.js';

async function registerUser({
    name,
    email,
    password,
    confirmPassword,
}) {
    if (password !== confirmPassword) {
        throw new BodyError('A senha e a confirmação dela não são iguais');
    }

    const searchEmail = await userRepository.findByEmail({ email });

    if (searchEmail) {
        throw new ConflictError('Email já cadastrado na plataforma');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await userRepository.create({
        name,
        email,
        password: passwordHash,
    });
}

async function authenticateUser({
    email,
    password,
}) {
    const user = await userRepository.findByEmail({ email });

    if (!user) {
        throw new UnauthorizedError('Email ou senha incorretos');
    }

    const isAuthorized = bcrypt.compareSync(password, user.password);

    if (!isAuthorized) {
        throw new UnauthorizedError('Email ou senha incorretos');
    }

    const token = uuid();

    await userRepository.login({
        token,
        userId: user._id,
    });

    return token;
}

async function findUserInfo({ userId }) {
    const user = await userRepository.findById({ userId });

    return { name: user.name };
}

async function logoutUser({ userId }) {
    await userRepository.deleteSession({ userId });

    return true;
}

export {
    registerUser,
    authenticateUser,
    findUserInfo,
    logoutUser,
};
