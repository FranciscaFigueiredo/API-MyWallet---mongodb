import joi from 'joi';

const financeSchema = joi.object({
    value: joi.number().integer().min(1).required(),
    description: joi.string().min(3).max(30).required(),
});

const typeSchema = joi.object({
    type: joi.string().pattern(/^exit$|^entry$/),
});

export {
    financeSchema,
    typeSchema,
};
