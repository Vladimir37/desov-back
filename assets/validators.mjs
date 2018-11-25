import Joi from 'joi';

export default {
    user: {
        body: {
            login: Joi.string().required(),
            pass: Joi.string().required(),
            status: Joi.number().required(),
        }
    }
}