import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform ,Tabs} from 'ionic-angular';
import { SettingProvider } from "../../providers/setting/setting";
import { SpecialProvider } from "../../providers/special/special";
import { BackButtonService } from '../../services/backButton';

/**
 * Generated class for the CertificatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certificate',
  templateUrl: 'certificate.html',
})
export class CertificatePage {
  @ViewChild('myTabs') tabRef: Tabs;

  cardId:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,private specialProvider:SpecialProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });

      this.cardId = this.settingProvider.user.cardId;
  }

  /*编辑身份证*/
  editcardid() {
    if (this.cardId == "") {
        this.settingProvider.presentAlert("请输入正确的身份证号",'');
    }  else {
        this.specialProvider.doChangeCertificate(this.cardId).subscribe((res) => {
          if(res["code"] == 10000){
              this.settingProvider.user.cardId = this.cardId;
              this.settingProvider.presentAlert(res["msg"],'');
           }else{
              console.log("user",this.settingProvider.user);
              this.settingProvider.presentAlert(res["msg"],'');
           }
        }, (err) => {
         this.settingProvider.dismissLoading();
         this.settingProvider.presentAlert("貌似网络出了点小差～",'');

        });
    }
  }

}
