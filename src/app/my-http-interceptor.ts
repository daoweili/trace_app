import { Injectable, Injector } from '@angular/core';
import { App, Loading } from 'ionic-angular';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { SettingProvider } from "../providers/setting/setting";


import { LoginPage } from '../pages/login/login';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor( public settingProvider:SettingProvider,private appCtrl:App) {

  }
  /*
  *拦截器方法重构
  */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    console.log("request time : " , started);
    let ok: string;
    const pattern = new RegExp('specialManager/epidemicPrevention/queryByArea/[0-9]+$', 'ig');
    const patternheartbeat = new RegExp('heartbeat/special_manager','ig');
    if(req instanceof HttpRequest) {
        if(pattern.test(req.url)==false && patternheartbeat.test(req.url)==false){
            console.log("弹出，请求中，请等待...");
            this.settingProvider.presentLoading();
            this.settingProvider.loading.present();
        }
    }

    return next.handle(req).do(event => {
         
          if (event instanceof HttpResponse) {
              if( event.body.code == 10005 ) {
                this.appCtrl.getRootNav().push(LoginPage);
                console.log("go to login");
              }

              if( event.url,pattern.test(event.url) == false && patternheartbeat.test(req.url)==false && this.settingProvider.loading != null ){
                this.settingProvider.dismissLoading();
                this.settingProvider.loading = null;
                console.log("消失，请求中，请等待...");
              }; 
              const end = Date.now();
              console.log("response time : " , end,"all time : " ,end-started);
          }
    });
  }

}
