import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Acesso negado. Token não fornecido." });
    }

    const [, token] = authHeader.split(' '); // Pega o token após o "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        
        // Injeta os dados do usuário logado na requisição
        req.user = { id: decoded.id }; 
        
        return next(); // Libera para o próximo passo
    } catch (err) {
        return res.status(401).json({ success: false, message: "Token inválido ou expirado." });
    }
};