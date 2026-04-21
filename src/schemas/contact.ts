import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';

export const CreateContactSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        first_name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('FIELD_INVALID_FIRST_NAME'),
            'string.min': getMessage('FIRST_NAME_MIN_LENGTH'),
            'string.max': getMessage('FIRST_NAME_MAX_LENGTH'),
            'any.required': getMessage('FIELD_REQUIRED_FIRST_NAME')
        }),

        last_name: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('FIELD_INVALID_LAST_NAME'),
            'string.min': getMessage('LAST_NAME_MIN_LENGTH'),
            'string.max': getMessage('LAST_NAME_MAX_LENGTH'),
            'any.required': getMessage('FIELD_REQUIRED_LAST_NAME')
        }),
    
        phone: Joi.string()
        .required()
        .messages({
        'string.base': getMessage('FIELD_PHONE_INVALID'),
        'any.required': getMessage('FIELD_REQUIRED_PHONE')
        }),
    });
};
