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
            id: Joi.objectId().required(),
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
    createOblast: {
        body: {
            old_name: Joi.string().required(),
            new_name: Joi.string(),
            to_rename: Joi.boolean().required(),
        }
    },
    editOblast: {
        body: {
            id: Joi.objectId().required(),
            old_name: Joi.string().required(),
            new_name: Joi.string(),
            to_rename: Joi.boolean().required(),
        }
    },
    createCity: {
        body: {
            old_name: Joi.string().required(),
            new_name: Joi.string(),
            to_rename: Joi.boolean().required(),
            historical: Joi.boolean().required(),
            oblast: Joi.objectId().required(),
            population: Joi.string().required(),
        }
    },
    editCity: {
        body: {
            id: Joi.objectId().required(),
            old_name: Joi.string().required(),
            new_name: Joi.string(),
            to_rename: Joi.boolean().required(),
            historical: Joi.boolean().required(),
            oblast: Joi.objectId().required(),
            population: Joi.string().required(),
        }
    },
    createStreet: {
        body: {
            old_name: Joi.string().required(),
            new_name: Joi.string(),
            city: Joi.objectId().required(),
            historical: Joi.boolean().required(),
            type: Joi.number().required(),
        }
    },
    editStreet: {
        body: {
            id: Joi.objectId().required(),
            old_name: Joi.string().required(),
            new_name: Joi.string(),
            city: Joi.objectId().required(),
            historical: Joi.boolean().required(),
            type: Joi.number().required(),
        }
    },
}