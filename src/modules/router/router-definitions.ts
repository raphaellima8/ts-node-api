import { Request, Response } from 'express';

export enum AvailableActions {
  LIST = 'list',
  CREATE = 'create',
  FIND_ONE = 'findOne',
  UPDATE_ONE = 'update',
  DELETE = 'remove'
}

export enum ActionPathSuffix {
  LIST = 'all',
  CREATE = 'create',
  FIND_ONE = ':id',
  UPDATE_ONE = ':id/update',
  DELETE = ':id/remove'
}

export interface EndpointConfig {
  list ?: RouterInfo;
  create ?: RouterInfo;
  findOne ?: RouterInfo;
  update ?: RouterInfo;
  delete ?: RouterInfo;
}

export interface RouterInfo {
  endpoint: string;
  callback: Function;
  auth: boolean;
  httpVerb: string;
}

export interface BaseRouterMethods {
  list(req: Request, res: Response);
  create(req: Request, res: Response);
  findOne(req: Request, res: Response);
  update(req: Request, res: Response);
  remove(req: Request, res: Response);
}

export interface HttpVerbMap {
  get ?: string[];
  post ?: string[];
  put ?: string[];
  patch ?: string[];
  delete ?: string[];
}

export interface RegisteredModule {
  moduleRef: any;
  parserName: string;
}
