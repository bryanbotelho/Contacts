import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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
    
  }

  public getApp(): Application {
    return this.app;
  }
}
const appInstance = new App().getApp();
export default appInstance;