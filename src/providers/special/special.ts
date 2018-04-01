import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpService } from '../../services/httpService';



/*
 * 专管员provider 
 * 包含个人中心资料修改，登录，退出
*/
@Injectable()
export class SpecialProvider {   
    
   /*构造*/
   constructor(public http: HttpService) {
   }

   /*登录*/
   doLogin(username,password){
     let param = { "mobile" : username,"password" : password };
     return this.http.post("app/specialManager/login",param);
   }

   /*修改身份证*/
   doChangeCertificate(cardid){
     let param = { "cardId" : cardid};
     return this.http.post("app/specialManager/update",param);
   }



  /*修改密码*/
   doChangePass(oldPassword,password,confirmPassword){
     let param = { "password" : password , "oldPassword" : oldPassword , "confirmPassword" : confirmPassword};
     console.log(param);
     return this.http.post("app/specialManager/updatePassword",param);
   }

   /*Email*/
   doChangeEmail(email){
     let param = { "email" : email};
     return this.http.post("app/specialManager/update",param);
   }

   /*修改名称*/
   doChangeName(name){
     let param = { "name" : name};
     return this.http.post("app/specialManager/update",param);
   }

   /*注销*/
   logout(){
     return this.http.get("app/specialManager/logout",{});
   }
}
