import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,Tabs} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { SettingProvider } from "../../providers/setting/setting";
import { SpecialProvider } from "../../providers/special/special";

/**
 * Generated class for the ChgpasswdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chgpasswd',
  templateUrl: 'chgpasswd.html',
})
export class ChgpasswdPage {
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams,private specialProvider:SpecialProvider,public settingProvider:SettingProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }

  /*修改密码*/
  changepassword (oldPassword: HTMLInputElement, password: HTMLInputElement, confirmPassword: HTMLInputElement ){
  	if (oldPassword.value.length == 0) {
        this.settingProvider.presentAlert("请输入旧密码",'');
    } else if (password.value.length == 0 || confirmPassword.value.length == 0) {
        this.settingProvider.presentAlert("请输入新密码",'');
    } else if ( password.value != confirmPassword.value ){
        this.settingProvider.presentAlert("密码不一致",'');
    } else {
    	  this.specialProvider.doChangePass(oldPassword.value,password.value,confirmPassword.value).subscribe((res) => {
          if(res["code"] == 10000){
              this.settingProvider.presentAlert(res["msg"],'');
           }else{
              this.settingProvider.presentAlert(res["msg"],'');
           }
        }, (err) => {
          this.settingProvider.dismissLoading();
          this.settingProvider.presentAlert("貌似网络出了点小差～",'');

        });
    }
  }
  /*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }

}
