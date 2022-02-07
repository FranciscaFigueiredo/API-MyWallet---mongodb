import dayjs from 'dayjs';
import NotFoundError from '../errors/NotFoundError.js';
import * as financeRepository from '../repositories/financeRepository.js';
import { typeSchema } from '../validations/financeValidation.js';

async function validateType({
    value,
    type,
}) {
    const validate = typeSchema.validate({ type });

    if (validate.error) {
        throw new NotFoundError();
    }

    let valueData = value;

    if (type === 'exit' && value > 0) {
        valueData *= -1;
    }

    if (type === 'entry' && value < 0) {
        valueData *= -1;
    }

    return valueData;
}

async function newFinancialEvent({
    userId,
    value,
    description,
}) {
    const dateToday = dayjs().locale('pt-Br').format('DD/MM/YYYY HH:mm:ss');

    await financeRepository.create({
        userId,
        value,
        description,
        date: dateToday,
    });
}

async function findFinancialEventsByUserId({ userId }) {
    const financialEvents = await financeRepository.find({ userId });

    if (!financialEvents.length) {
        return {
            wallet: [],
            total: 0,
        };
    }

    const total = financialEvents.reduce((soma, value) => soma + value.value, 0) / 100;
    const wallet = [];
    financialEvents.map((event) => wallet.push({
        ...event,
        value: event.value / 100,
    }));

    return {
        wallet,
        total,
    };
}

async function removeFinancialEvent({ userId, id }) {
    await financeRepository.deleteFinancialEvent({ userId, id });

    return true;
}

async function editFinancialEvent({
    id,
    userId,
    value,
    description,
}) {
    const dateToday = dayjs().locale('pt-Br').format('DD/MM/YYYY HH:mm:ss');

    await financeRepository.updateFinancialEvent({
        id,
        userId,
        value,
        description,
        date: dateToday,
    });

    return true;
}

export {
    validateType,
    newFinancialEvent,
    findFinancialEventsByUserId,
    removeFinancialEvent,
    editFinancialEvent,
};
