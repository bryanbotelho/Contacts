import Joi from 'joi';
import { prisma } from '../lib/prisma';
import { CreateContact, UpdateContact } from 'src/@types/contact';
import { getMessage } from 'src/utils/messageHelper';
import { CreateContactSchema, UpdateContactSchema, DeleteContactSchema } from 'src/schemas/contact';

class ContactService {
    private lang = 'pt';
    
    async createContact(data: CreateContact) {
        const { firstName, lastName, number, ddi } = data;
        try {
            const validator: Joi.ValidationResult = CreateContactSchema(this.lang as 'pt')
                .validate({ firstName, lastName, number, ddi });

            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const existingContact = await prisma.contact.findFirst({
                where: {
                    number,
                }
            });

            if (existingContact)  {
                return { status: 409, success: false, message: getMessage('CONTACT_ALREADY_EXISTS', this.lang as 'pt') };
            }

            const country = await prisma.country.findFirst({
                where: {
                    phoneCode: ddi
                }
            });

            if (!country) {
                return { status: 404, success: false, message: getMessage('COUNTRY_NOT_FOUND', this.lang as 'pt') };
                }

            await prisma.contact.create({
                data: {
                    firstName,
                    lastName,
                    number,
                    countryId: country.id
                }
            });

            return { status: 201, success: true, message: getMessage('CONTACT_CREATED', this.lang as 'pt') };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }

    }

    async updateContact(id: number, data: UpdateContact) {
        const { firstName, lastName, number, ddi } = data;
        try {
            const validator: Joi.ValidationResult = UpdateContactSchema(this.lang as 'pt')
            .validate({ firstName, lastName, number, ddi });

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

            const normalizedNumber = number

            const country = await prisma.country.findFirst({
                where: { phoneCode: ddi}
            });

            const duplicated = await prisma.contact.findFirst({
                where: {
                    number: normalizedNumber,
                    NOT: { id }
                }
            });
            
            if (duplicated) {
                return { status: 409, success: false, message: getMessage('CONTACT_ALREADY_EXISTS', , this.lang as 'pt')};
            } 
            
            if (!country) {
                return { status: 404, success: false, message: getMessage('COUNTRY_NOT_FOUND', , this.lang as 'pt') };
            }

            await prisma.contact.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    number: normalizedNumber,
                    countryId: country.id
                }
            });

            return { status: 200, success: true, message: getMessage('CONTACT_UPDATED', this.lang as 'pt') };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

    async getContacts(query: any) {
        try {
            const { name, page = 1, active = 'all' } = query;

            const limit = 10;
            const skip = (Number(page) - 1) * limit;

            const filters: any = {};

            if (active === 'true') {
                filters.active = true;
            } else if (active === 'false') {
                filters.active = false;
            }

            if (name) {
                filters.OR = [
                    {
                        firstName: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lastName: {
                            contains: name,
                            mode: 'insensitive'
                        }
                    }
                ];
            }

            const contacts = await prisma.contact.findMany({
                where: filters,
                skip,
                take: limit,
                orderBy: {
                    id: 'asc'
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    number: true,
                    active: true,
                    countryId: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            contacts.forEach((c: any) => {
                c.createdAt = new Date(c.createdAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
                c.updatedAt = new Date(c.updatedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
            });

            const total = await prisma.contact.count({
                where: filters
            });

            return { status: 200, success: true, contacts, pagination: { total, page: Number(page), limit, totalPages: Math.ceil(total / limit) }
        };
        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt')
            };
        }
    }

    async deleteContact(id: number) {
        try{
            const validator: Joi.ValidationResult = DeleteContactSchema(this.lang as 'pt')
            .validate({ id });

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

            if (existingContact.active === false){
                return { status: 400, success: false, message: getMessage('CONTACT_ALREADY_INACTIVE', this.lang as 'pt') };
            }

            await prisma.contact.update({
                where: { id },
                data: { active: false }
            });

            return { status: 200, success: true, message: getMessage('CONTACT_DELETED', this.lang as 'pt') };
        }catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }
}

export default new ContactService();
