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
    changePass: {
        body: {
            old_pass: Joi.string().required(),
            new_pass: Joi.string().required(),
            new_pass_again: Joi.any().valid(Joi.ref('new_pass')).required().options({ 
                language: { 
                    any: { 
                        allowOnly: 'Must match password' 
                    } 
                } 
            }),
        }
    },
}