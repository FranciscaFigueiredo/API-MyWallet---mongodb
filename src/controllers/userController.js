import { userSchema } from '../validations/userValidation.js';
import BodyError from '../errors/BodyError.js';
import ConflictError from '../errors/ConflictError.js';
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

export {
    signUp,
};
