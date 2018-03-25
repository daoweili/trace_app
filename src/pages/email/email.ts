import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,Tabs} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { SettingProvider } from "../../providers/setting/setting";
import { SpecialProvider } from "../../providers/special/special";

/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {
  @ViewChild('myTabs') tabRef: Tabs;
  email:string ="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,private specialProvider:SpecialProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
    this.email = this.settingProvider.user.email;
  }

  editemail() {
    if (this.email == "") {
        this.settingProvider.presentAlert("请输入正确的邮箱地址",'');
    }  else {
        this.specialProvider.doChangeEmail(this.email).subscribe((res) => {
          if(res["code"] == 10000){
              this.settingProvider.user.email = this.email
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
