import { Request, Response } from "express";
import ContactService from "src/services/contact";
import { CreateContact, UpdateContact } from "src/@types/contact";

class ContactController {
  async create(req: Request, res: Response) {
      const { message, success, status } = await ContactService.createContact(req.body as CreateContact);
      if (!success) return res.status(status).json({ message, success });
    
      return res.status(status).json({ message, success });
    }

  async update(req: Request, res: Response) {
      const id = parseInt(req.params.id as string, 10);
      const { message, success, status } = await ContactService.updateContact(id, req.body as UpdateContact);
      if (!success) return res.status(status).json({ message, success });

      return res.status(status).json({ message, success });
  }

  async getContacts(req: Request, res: Response) {
      const { message, success, status, contacts, pagination } = await ContactService.getContacts(req.query);
      if (!success) return res.status(status).json({ message, success });

      return res.status(status).json({ message, success, contacts, pagination });
  }

  async delete(req: Request, res: Response) {
      const id = parseInt(req.params.id as string, 10);
      const { message, success, status } = await ContactService.deleteContact(id);
      if (!success) return res.status(status).json({ message, success });

      return res.status(status).json({ message, success });
  }
}

export default new ContactController();