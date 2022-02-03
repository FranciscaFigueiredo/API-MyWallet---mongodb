import dayjs from 'dayjs';

async function validateType({
    value,
    type,
}) {
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

    return {
        userId,
        value,
        description,
        date: dateToday,
    };
}

export {
    validateType,
    newFinancialEvent,
};
