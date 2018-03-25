import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,Tabs } from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { SettingProvider } from "../../providers/setting/setting";
import { SpecialProvider } from "../../providers/special/special";

/**
 * Generated class for the TruenamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-truename',
  templateUrl: 'truename.html',
})
export class TruenamePage {
  @ViewChild('myTabs') tabRef: Tabs;

  name:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,private specialProvider:SpecialProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
      this.name = this.settingProvider.user.name;
  }

 
  editname() {
    if (this.name == "") {
        this.settingProvider.presentAlert("请输入名称",'');
    }  else {
        this.specialProvider.doChangeName(this.name).subscribe((res) => {
          if(res["code"] == 10000){
              this.settingProvider.user.name = this.name;
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
