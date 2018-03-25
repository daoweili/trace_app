import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


import { SettingProvider } from "../../providers/setting/setting";


/*
 * 专管员provider 
 * 包含个人中心资料修改，登录，退出
*/
@Injectable()
export class SpecialProvider {   
    
   /*构造*/
   constructor(public http: HttpClient,public settingProvider:SettingProvider) {
   }

   /*登录*/
   doLogin(username,password){
     let param = { "mobile" : username,"password" : password };
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/login",param,this.settingProvider.httpOptions);
   }

   /*修改身份证*/
   doChangeCertificate(cardid){
     let param = { "cardId" : cardid};
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/update",param,this.settingProvider.httpOptions);
   }



  /*修改密码*/
   doChangePass(oldPassword,password,confirmPassword){
     let param = { "password" : password , "oldPassword" : oldPassword , "confirmPassword" : confirmPassword};
     console.log(param);
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/updatePassword",param,this.settingProvider.httpOptions);
   }

   /*Email*/
   doChangeEmail(email){
     let param = { "email" : email};
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/update",param,this.settingProvider.httpOptions);
   }

   /*修改名称*/
   doChangeName(name){
     let param = { "name" : name};
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/update",param,this.settingProvider.httpOptions);
   }

   /*注销*/
   logout(){
     return this.http.get(this.settingProvider.apiUrl+"/specialManager/logout",this.settingProvider.httpOptions);
   }
}
