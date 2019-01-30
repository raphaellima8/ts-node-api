import express, { Request, Response, Application, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

export class CoreModule {

  private _express: Application;

  constructor() {
    this._express = express();
    this.configExpress();
    this.exposeEndpoints();
  }

  public get express(): Application {
    return this._express;
  }

  private configExpress(): void {
    this.express.use(this.configHeader.bind(this));
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.urlencoded( { extended: true } ));
    this.express.use(bodyParser.json());
  }

  private exposeEndpoints(): void {
    this.express.route('/api/v1/products').get((req: Request, res: Response) => {
      res.status(200).send({ message: 'Hello, world!'});
    });
  }

  private configHeader(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }
}