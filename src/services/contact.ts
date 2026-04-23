import Joi from 'joi';
import { prisma } from '../lib/prisma';
import { CreateContact } from 'src/@types/contact';
import { getMessage } from 'src/utils/messageHelper';
import { CreateContactSchema } from 'src/schemas/contact';

class ContactService {
    private lang = 'pt';
    
    async createContact(data: CreateContact) {
        const { firstName, lastName, number } = data;
        try {
            const validator: Joi.ValidationResult = CreateContactSchema(this.lang as 'pt')
            .validate({ firstName, lastName, number });

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const countries = await prisma.country.findMany();

            const country = countries
                .sort((a: { phoneCode: string }, b: { phoneCode: string }) =>
                    b.phoneCode.length - a.phoneCode.length
                )
                .find((c: { phoneCode: string }) => number.startsWith(c.phoneCode));

            if (!country) {
                return {
                    status: 404,
                    success: false,
                    message: getMessage('COUNTRY_NOT_FOUND')
                };
                }

            if (!country) {
                return { status: 404, success: false, message: getMessage('COUNTRY_NOT_FOUND') };
            }

            await prisma.contact.create({
                data: {
                    firstName,
                    lastName,
                    number,
                    countryId: country.id
                }
            });

            return { status: 201, success: true, message: getMessage('CONTACT_CREATED') };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR') };
        }

    }

}

export default new ContactService();