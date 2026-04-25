import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';

export const CreateContactSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        firstName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('FIRST_NAME_FIELD_INVALID', lang),
            'string.min': getMessage('FIRST_NAME_MIN_LENGTH', lang),
            'string.max': getMessage('FIRST_NAME_MAX_LENGTH', lang),
            'any.required': getMessage('FIRST_NAME_FIELD_REQUIRED', lang)
        }),

        lastName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('LAST_NAME_FIELD_INVALID', lang),
            'string.min': getMessage('LAST_NAME_MIN_LENGTH', lang),
            'string.max': getMessage('LAST_NAME_MAX_LENGTH', lang),
            'any.required': getMessage('LAST_NAME_FIELD_REQUIRED', lang)
        }),
    
        number: Joi.number()
        .greater(0)
        .min(10000)
        .required()
        .messages({
        'string.base': getMessage('PHONE_NUMBER_FIELD_INVALID', lang),
        'number.greater': getMessage('PHONE_NUMBER_INVALID_GREATER', lang),
        'number.min': getMessage('PHONE_NUMBER_MIN_LENGTH', lang),
        'any.required': getMessage('PHONE_NUMBER_FIELD_REQUIRED', lang)
        }),

        ddi: Joi.string()
        .trim()
        .min(1)
        .max(4)
        .required()
        .messages({
            'string.base': getMessage('DDI_FIELD_INVALID', lang),
            'string.min': getMessage('DDI_MIN_LENGTH', lang),
            'string.max': getMessage('DDI_MAX_LENGTH', lang),
            'any.required': getMessage('DDI_FIELD_REQUIRED', lang)
        }),
    });
};

export const UpdateContactSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        firstName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('FIRST_NAME_FIELD_INVALID', lang),
            'string.min': getMessage('FIRST_NAME_MIN_LENGTH', lang),
            'string.max': getMessage('FIRST_NAME_MAX_LENGTH', lang),
            'any.required': getMessage('FIRST_NAME_FIELD_REQUIRED', lang)
        }),

        lastName: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': getMessage('LAST_NAME_FIELD_INVALID', lang),
            'string.min': getMessage('LAST_NAME_MIN_LENGTH', lang),
            'string.max': getMessage('LAST_NAME_MAX_LENGTH', lang),
            'any.required': getMessage('LAST_NAME_FIELD_REQUIRED', lang)
        }),
    
        number: Joi.number()
        .greater(0)
        .min(10000)
        .required()
        .messages({
        'string.base': getMessage('PHONE_NUMBER_FIELD_INVALID', lang),
        'number.greater': getMessage('PHONE_NUMBER_INVALID_GREATER', lang),
        'number.min': getMessage('PHONE_NUMBER_MIN_LENGTH', lang),
        'any.required': getMessage('PHONE_NUMBER_FIELD_REQUIRED', lang)
        }),

        ddi: Joi.string()
        .trim()
        .min(1)
        .max(4)
        .required()
        .messages({
            'string.base': getMessage('DDI_FIELD_INVALID', lang),
            'string.min': getMessage('DDI_MIN_LENGTH', lang),
            'string.max': getMessage('DDI_MAX_LENGTH', lang),
            'any.required': getMessage('DDI_FIELD_REQUIRED', lang)
        }),
    });
};

export const DeleteContactSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        id: Joi.number()
        .greater(0)
        .min(1)
        .required()
        .messages({
            'number.base': getMessage('DELETE_CONTACT_INVALID_ID', lang),
            'number.greater': getMessage('DELETE_CONTACT_INVALID_GREATER', lang),
            'number.min': getMessage('DELETE_CONTACT_ID_MIN_LENGTH', lang),
            'number.empty': getMessage('DELETE_CONTACT_ID_EMPTY', lang),
            'any.required': getMessage('DELETE_CONTACT_ID_REQUIRED', lang),
        }),
    });
}
