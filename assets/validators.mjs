import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

export default {
    id: {
        body: {
            id: Joi.objectId().required(),
        }
    },
    createUser: {
        body: {
            login: Joi.string().required(),
            pass: Joi.string().required(),
            status: Joi.number().required(),
        }
    },
    editUser: {
        body: {
            id: Joi.string().required(),
            login: Joi.string().required(),
            status: Joi.number().required(),
        }
    },
}