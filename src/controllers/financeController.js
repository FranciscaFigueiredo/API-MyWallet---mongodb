import BodyError from '../errors/BodyError.js';
import NotFoundError from '../errors/NotFoundError.js';
import * as financeService from '../services/financeService.js';
import { financeSchema } from '../validations/financeValidation.js';

async function postFinancialEvents(req, res) {
    const {
        value,
        description,
    } = req.body;

    const userId = res.locals.user;

    const { type } = req.query;

    const valueManipulated = Number(value).toFixed(2) * 100;

    const validate = financeSchema.validate({
        value: valueManipulated,
        description,
    });

    try {
        if (validate.error) {
            throw new BodyError(validate.error.message);
        }

        const valueData = await financeService.validateType({
            value: valueManipulated,
            type,
        });

        await financeService.newFinancialEvent({
            userId,
            value: valueData,
            description,
        });

        return res.sendStatus(200);
    } catch (error) {
        if (error instanceof BodyError) {
            return res.status(400).send(error.message);
        }

        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }

        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    postFinancialEvents,
};
