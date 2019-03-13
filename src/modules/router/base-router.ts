import { Request, Response } from 'express';
import {
  BaseRouterMethods,
  AvailableActions,
  EndpointConfig,
  ActionPathSuffix,
  HttpVerbMap,
  RouterInfo
} from './router-definitions';

export class BaseRouterModule implements BaseRouterMethods {
  protected readonly actionByHttpVerbMapper: HttpVerbMap = {
      get: [AvailableActions.LIST, AvailableActions.FIND_ONE],
      put: [AvailableActions.UPDATE_ONE],
      post: [AvailableActions.CREATE],
      delete: [AvailableActions.DELETE]
  };
  protected readonly MODULE_NAME: string;
  protected readonly ROUTER_MODULE_INFO: EndpointConfig = {};
  protected API_VERSION: string = 'v1';
  private readonly API_CONTEXT: string = '/api';
  private readonly BASE_ENDPOINT: string = `${this.API_CONTEXT}/${this.API_VERSION}`;

  constructor(moduleName: string) {
      this.MODULE_NAME = moduleName;
      this.mountModuleEndpoint();
  }

  protected mountModuleEndpoint() {
      Object.keys(AvailableActions).forEach(this.mountModuleEndpointProperty.bind(this));
      this.configModuleEndpointByHttpVerb();
  }

  private mountModuleEndpointProperty(action: string) {
    const act = AvailableActions[action];
    Object.defineProperty(this.ROUTER_MODULE_INFO, act, {
      value: {
          endpoint: `${ this.BASE_ENDPOINT }/${ this.MODULE_NAME }/${ ActionPathSuffix[action] }`,
          callback: this[act].bind(this),
          auth: false,
      },
      writable : true,
      enumerable : true,
      configurable : true
    });
  }

  private configModuleEndpointByHttpVerb() {
    const httpVerbList: Array<string> = Object.keys(this.actionByHttpVerbMapper);
    httpVerbList
      .forEach((httpVerb: string) => {
        const actionsByHttpVerb: Array<string> = this.actionByHttpVerbMapper[httpVerb];
        if (Array.isArray(actionsByHttpVerb)) {
          actionsByHttpVerb.forEach((actionName: string) => {
            this.ROUTER_MODULE_INFO[actionName]['httpVerb'] = httpVerb;
            this.ROUTER_MODULE_INFO[actionName]['auth'] = this.shouldAuth(httpVerb);
          });
        }
      });
  }

  private shouldAuth(httpVerb: string): boolean {
    return httpVerb !== 'get';
  }

  protected getRouterModuleConfig(): RouterInfo[] {
    return Object.keys(this.ROUTER_MODULE_INFO)
      .map(routerModuleInfo => this.ROUTER_MODULE_INFO[routerModuleInfo]);
  }

  public list(req: Request, res: Response) {}
  public create(req: Request, res: Response) {}
  public findOne(req: Request, res: Response) {}
  public update(req: Request, res: Response) {}
  public remove(req: Request, res: Response) {}
}