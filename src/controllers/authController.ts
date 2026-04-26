import { Request, Response } from 'express';
import  AuthService  from '../services/authService';
import { CreateUser } from '../@types/user';

class AuthController {
  async register(req: Request, res: Response) {
      const { message, success, status } = await AuthService.register(req.body as CreateUser);
      if (!success) return res.status(status).json({ message, success });

      return res.status(status).json({ message, success });
  }

  async login(req: Request, res: Response) {
      const { message, success, status, token } = await AuthService.login(req.body);
      if (!success) return res.status(status).json({ message, success });

      return res.status(status).json({ success, token });
  }

  async getUsers(_req: Request, res: Response) {
        const { status, message, success, data } = await AuthService.getUsers();
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: data, success });
  }

  async getUserByEmail(req: Request, res: Response) {
        const { email } = req.query;
        const { status, message, success, data } = await AuthService.getUserByEmail(email as string);
        if (!success) return res.status(status).json({ message, success });

        return res.status(status).json({ result: data, success });
  }
}

export default new AuthController();