import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { MTabsPage } from '../tabs/mtabs';

import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SpecialProvider } from "../../providers/special/special";
import { SettingProvider } from "../../providers/setting/setting";
import { Validators } from '@angular/forms';
import { BackButtonService } from '../../services/backButton';



/**
 * Generated class for the LoginPage page.
 *
 *带逗号字符 转 数组
 *let b:string = "E20094C6A0B48148F33C3E05,E2000016880401580370EC8A";
 *let a:any = Array(b.split(','));
 *console.log(a[1]);
 *json转数组
 *let c:string= "{\"code\":1000,\"data\":[\"E20094C6A0B48148F33C3E05\",\" E2000016880401580370EC8A\"],\"msg\":\"success\"}";
 *let d:any = JSON.parse(c);
 *console.log(d.code);
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  /* 是否记住密码 */
  remember:boolean = true;
  username:string="";
  password:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController , public specialProvider:SpecialProvider,private storage:Storage,public settingProvider:SettingProvider,private backButtonService:BackButtonService,private platform: Platform) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(null);
      });

      this.storage.get("remember").then((val) => {
         if(val!=null && val.mobile!="" && val.password!=""){
            this.username = val.mobile;
            this.password = val.password;
         }
      });
  }

  /*登录*/
  logIn() {
    if ( this.username.length == 0 ) {
        this.settingProvider.presentAlert("请输入手机号",'');
    } else if ( this.password.length == 0) {
        this.settingProvider.presentAlert("请输入密码",'');
    } else {
        this.specialProvider.doLogin(this.username,this.password).subscribe((res) => {
          if(res["code"] == 10000){
               this.storage.set("user",res["data"]);
               this.settingProvider.loginstate = true;
               if(this.remember){
                  this.storage.set("remember",{"mobile":this.username,"password":this.password});
               }else{
                  this.storage.set("remember",{"mobile":"","password":""});
               }
               this.settingProvider.user = res["data"];
               this.settingProvider.cityColumns = res["data"]["areaResult"];
               this.storage.set("cityColumns",this.settingProvider.cityColumns);
               if(this.settingProvider.user.area.level < 5 ){
                  this.navCtrl.push(MTabsPage);
               }else{
                  this.navCtrl.push(TabsPage);
               }
               
           }else{
              this.settingProvider.loginstate = false;
              this.settingProvider.presentAlert(res["msg"],'');
           }
        }, (err) => {
            this.settingProvider.dismissLoading();
            this.settingProvider.presentAlert("貌似网络出了点小差～",'');
        });
    }
  }


}
