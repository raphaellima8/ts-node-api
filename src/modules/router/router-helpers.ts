import { Request, Response } from 'express';
import { RouterInfo } from './router-info.model';

export interface RouterInfoByHttpVerb {
  [key: string]: RouterInfo;
}

export interface BaseRouterMethods {
  list(req: Request, res: Response);
  create(req: Request, res: Response);
  findOne(req: Request, res: Response);
  update(req: Request, res: Response);
  remove(req: Request, res: Response);
}

export interface RegisteredModule {
  moduleRef: any;
  parserName: string;
}

export enum CallbackList {
  LIST = 'list',
  FIND_ONE = 'findOne',
  UPDATE_ONE = 'update',
  CREATE = 'create',
  DELETE = 'remove'
}
