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

async function getFinancialEvents(req, res) {
    const userId = res.locals.user;

    try {
        const financialEvents = await financeService.findFinancialEventsByUserId({ userId });

        return res.send(financialEvents);
    } catch (error) {
        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function deleteFinancialEvent(req, res) {
    const userId = res.locals.user;
    const id = req.params;

    try {
        if (!id) {
            throw new NotFoundError();
        }

        await financeService.removeFinancialEvent({ userId, id });

        return res.sendStatus(200);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }

        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

async function updateFinancialEvent(req, res) {
    const userId = res.locals.user;
    const id = req.params;

    const {
        value,
        description,
    } = req.body;

    const { type } = req.query;

    const valueManipulated = Number(value).toFixed(2) * 100;

    try {
        const valueData = await financeService.validateType({
            value: valueManipulated,
            type,
        });

        await financeService.editFinancialEvent({
            id,
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

async function getFinancialEventData(req, res) {
    const userId = res.locals.user;
    const id = req.params;

    try {
        const financialEvent = await financeService.searchFinancialEvent({ id, userId });

        return res.send(financialEvent);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }

        return res.status(500).send({ message: 'O banco de dados está offline' });
    }
}

export {
    postFinancialEvents,
    getFinancialEvents,
    deleteFinancialEvent,
    updateFinancialEvent,
    getFinancialEventData,
};
