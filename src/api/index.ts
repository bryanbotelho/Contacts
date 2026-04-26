import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from '../routes/contact';
import authRoutes from '../routes/authRoutes';

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    
    // this.app.use(MiddlewareError);
  }

  private routes(): void {
    this.app.use('/contacts', contactRoutes);
    this.app.use('/auth',authRoutes);
    
  }

  public getApp(): Application {
    return this.app;
  }
}
const appInstance = new App().getApp();
export default appInstance;