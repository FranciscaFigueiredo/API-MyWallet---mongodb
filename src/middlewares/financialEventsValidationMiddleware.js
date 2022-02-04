import BodyError from '../errors/BodyError.js';
import { financeSchema } from '../validations/financeValidation.js';

async function financialEventsValidation(req, res, next) {
    const {
        value,
        description,
    } = req.body;

    const valueManipulated = Number(value).toFixed(2) * 100;

    const validate = financeSchema.validate({
        value: valueManipulated,
        description,
    });

    try {
        if (validate.error) {
            throw new BodyError(validate.error.message);
        }

        return next();
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }

        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    financialEventsValidation,
};
