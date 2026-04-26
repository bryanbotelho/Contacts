import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { CreateUser, LoginUser } from 'src/@types/user';
import { CreateUserSchema, getUserByEmailSchema, LoginSchema } from '../schemas/user';
import { getMessage } from 'src/utils/messageHelper';

class AuthService {
  private lang = 'pt';


  async register(data: CreateUser) {
        const { name, email, password } = data;

        try {
            const validator: Joi.ValidationResult = CreateUserSchema(this.lang as 'pt')
                .validate({ name, email, password});
            
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const { success, message } = await this.validEmail(email);
            if (!success) return { status: 409, success: false, message };

            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return { status: 200, success: true, message: getMessage('USER_CREATED', this.lang as 'pt') };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

  async validEmail(email: string) {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
        });
        
        if (existingEmail) {
            return { success: false, message: getMessage('USER_EXISTS_EMAIL', this.lang as 'pt') };
        }
      

        return { success: true };
    }
  async login(data: LoginUser){
    const { email, password } = data;

    try{
        const validator: Joi.ValidationResult = LoginSchema(this.lang as 'pt')
            .validate({ email, password });
        
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }
        
            const user = await prisma.user.findUnique({
                where: { email },
            });

        if (!user){
            return { status: 404, success: false, message: getMessage('USER_NOT_FOUND', this.lang as 'pt') };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { status: 401, success: false, message: getMessage('INVALID_PASSWORD', this.lang as 'pt') };
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return { status: 200, success: true, token };
    } catch (error) {
        console.error(error);
        return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
    } 
    
  }

  async getUsers() {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            });
            
            return { status: 200, success: true, data: users };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

  async getUserByEmail(email: string) {
        try {
            const validator: Joi.ValidationResult = getUserByEmailSchema(this.lang as 'pt').validate({ email });
    
            if (validator.error) {
                const errorMessage = validator.error.details.map(err => err.message).join(', ');
                return { status: 400, success: false, message: errorMessage };
            }

            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            });
            
            return { status: 200, success: true, data: user };

        } catch (error) {
            console.error(error);
            return { status: 500, success: false, message: getMessage('SERVER_ERROR', this.lang as 'pt') };
        }
    }

}

export default new AuthService();