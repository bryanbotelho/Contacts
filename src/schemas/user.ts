import Joi from 'joi';
import { getMessage } from '../utils/messageHelper';

export const CreateUserSchema = (lang: 'pt' | 'en') => {
    return Joi.object({
        name: Joi.string()
            .trim()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': getMessage('NAME_FIELD_INVALID', lang),
                'string.min': getMessage('NAME_MIN_LENGTH', lang),
                'string.max': getMessage('NAME_MAX_LENGTH', lang),
                'any.required': getMessage('NAME_FIELD_REQUIRED', lang)
            }),

        password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d!@#\\$%\\^&\\*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{6,}$'))
            .required()
            .messages({
                'string.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'string.pattern.base': getMessage('PASSWORD_TOO_WEAK', lang),
                'any.required': getMessage('PASSWORD_FIELD_REQUIRED', lang)
            }),
        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                'string.base': getMessage('EMAIL_INVALID', lang),
                'string.email': getMessage('EMAIL_INVALID', lang),
                'any.required': getMessage('EMAIL_FIELD_REQUIRED', lang)
            }),
    });
}

export const getUserByEmailSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                'string.base': getMessage('INVALID_EMAIL', lang),
                'string.email': getMessage('INVALID_EMAIL', lang)
            }),
    });
};

export const LoginSchema = (lang: 'pt' | 'en' = 'pt') => {
    return Joi.object({
        email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': getMessage('INVALID_EMAIL', lang),
            'any.required': getMessage('EMAIL_FIELD_REQUIRED', lang)
        }),
        password: Joi.string()
        .required()
        .messages({
            'any.required': getMessage('PASSWORD_FIELD_REQUIRED', lang)
        }),
    });
};