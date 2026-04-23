import Joi from 'joi';
import { prisma } from '../lib/prisma';
import { CreateContact, UpdateContact } from 'src/@types/contact';
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

            const existingContact = await prisma.contact.findFirst({
                where: {
                    number: number.trim()
                }
            });

            if (!existingContact)  {
                return { status: 409, success: false, message: getMessage('CONTACT_ALREADY_EXISTS') };
            }

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

    async updateContact(id: number, data: UpdateContact) {
        const { firstName, lastName, number } = data;
        try {
            const validator: Joi.ValidationResult = UpdateContactSchema(this.lang as 'pt')
            .validate({ firstName, lastName, number });

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }
            const existingContact = await prisma.contact.findUnique({
                where: { id }
            });

            if (!existingContact) {
                return { status: 404, success: false, message: getMessage('CONTACT_NOT_FOUND', this.lang as 'pt') };
            }

            await prisma.contact.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    number
                }
            });

            return { status: 200, success: true, message: getMessage('CONTACT_UPDATED', this.lang as 'pt') };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }
}

export default new ContactService();