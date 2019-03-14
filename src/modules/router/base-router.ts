import { Request, Response } from 'express';
import {
  BaseRouterMethods, CallbackList,
} from './router-helpers';
import { RouterInfo } from './router-info.model';

enum EndpointSuffix {
  LIST = 'all',
  CREATE = 'create',
  FIND_ONE = ':id',
  UPDATE_ONE = ':id/update',
  DELETE = ':id/remove'
}

enum HttpVerbByAction {
  LIST = 'get',
  FIND_ONE = 'get',
  UPDATE_ONE = 'put',
  CREATE = 'post',
  DELETE = 'delete'
}

export class BaseRouterModule implements BaseRouterMethods {
  protected readonly ACTIONS: string[] = ['LIST', 'CREATE', 'FIND_ONE', 'UPDATE_ONE', 'DELETE'];
  private readonly MODULE_NAME: string = 'base';
  private ROUTER_FEATURE_INFO: RouterInfo[] = [];
  private readonly API_VERSION: string = 'v1';
  private readonly BASE_ENDPOINT: string = `/api/${this.API_VERSION}`;

  constructor(moduleName: string, custom?: boolean, version?: string) {
    this.MODULE_NAME = moduleName || this.MODULE_NAME;
    this.API_VERSION = version || this.API_VERSION;
    if (!custom) {
      this.mountModuleEndpoint();
    }
  }

  public list(req: Request, res: Response) {}
  public create(req: Request, res: Response) {}
  public findOne(req: Request, res: Response) {}
  public update(req: Request, res: Response) {}
  public remove(req: Request, res: Response) {}

  protected mountModuleEndpoint() {
    this.ACTIONS.forEach(this.mountModuleEndpointProperty.bind(this));
  }

  protected getRouterModuleConfig(): RouterInfo[] {
    return this.ROUTER_FEATURE_INFO;
  }

  private mountModuleEndpointProperty(action: string) {
    this.ROUTER_FEATURE_INFO = [
      ...this.ROUTER_FEATURE_INFO,
      new RouterInfo({
        endpoint: `${ this.BASE_ENDPOINT }/${ this.MODULE_NAME }/${ EndpointSuffix[action] }`,
        callback: this[CallbackList[action]].bind(this),
        auth: HttpVerbByAction[action] !== 'get',
        httpVerb: HttpVerbByAction[action]
      })
    ];
  }
}
