export class RouterInfo {

  public endpoint: string;
  public callback: Function;
  public auth: boolean;
  public httpVerb: string;

  constructor(data: any) {
    this.endpoint = data.endpoint;
    this.callback = data.callback;
    this.auth = data.auth;
    this.httpVerb = data.httpVerb;
    return this;
  }
}
