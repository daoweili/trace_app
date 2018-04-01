import { HttpClient ,HttpHeaders,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingProvider } from "../providers/setting/setting";


/**
  httpClient 简单封装类
  * by ivan
  ,
  "proxies": [
    {
      "path": "/app",
      "proxyUrl": "http://47.96.48.160/app"
    },
    {
      "path": "/heartbeat",
      "proxyUrl": "http://47.96.48.160/heartbeat"
    }
  ]
  * 369191991@qq.com
**/

@Injectable()
export class HttpService {
  access_token:string = "";
  /*服务器通讯地址*/
  apiUrl :string ="http://47.96.48.160";
  httpOptions:Object = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }; 
  /*构造函数 依赖注入*/
  constructor(public http:HttpClient) {
      console.log("Module Http Service");
  }

  /*get 请求*/
  get<T>(endpoint: string, params?: any) {
    return this.http.get(this.apiUrl + '/' + endpoint, this.encodeHttpParams(params));
  }

  /*post请求*/
  post<T>(endpoint: string, params?: any) {
    return this.http.post(this.apiUrl + '/' + endpoint, this.encodeHttpParams(params));
  }

  private encodeHttpParams(params: any): any {
    if (!params) return null;
      return params;
  }
}
