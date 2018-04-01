import { Component ,ViewChild} from '@angular/core';
import { NavController, IonicPage ,App,Platform,Tabs,Events} from 'ionic-angular';
import { Observable } from "rxjs";
import { BackButtonService } from '../../services/backButton';

import { ChgpasswdPage } from '../chgpasswd/chgpasswd';
import { EmailPage } from '../email/email';
import { TruenamePage } from '../truename/truename';
import { AboutPage } from '../about/about';
import { CertificatePage } from '../certificate/certificate';
import 'rxjs/Rx';

import { SpecialProvider } from "../../providers/special/special";
import { SettingProvider } from "../../providers/setting/setting";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
 })
export class PersonPage {
  
  @ViewChild("header") header;
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public events:Events,public navCtrl: NavController,public appCtrl: App,public specialProvider:SpecialProvider,public settingProvider:SettingProvider,private platform:Platform,private backButtonService:BackButtonService) {
	    platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }
  /*tuch scroll event*/
  scrollEvent(e) {
    let opacity = (100 - e.scrollTop) / 100;
    this.header._elementRef.nativeElement.style.opacity = opacity*2;
  }

  public presentUserInfoAlert(user: any): void {
    console.log(JSON.stringify(user));
  }

  public doRefresh($refresher): void {
    setTimeout(() => {
      $refresher.complete();
    }, 3000);
  }
  
  doChgCertificate(certificate: HTMLInputElement){
      this.appCtrl.getRootNav().push(CertificatePage);
  }

  doChgEmail(email: HTMLInputElement){
      this.appCtrl.getRootNav().push(EmailPage);
  }


  doChgName(name: HTMLInputElement){
      this.appCtrl.getRootNav().push(TruenamePage);
  }

  doChgPassword(){
      this.appCtrl.getRootNav().push(ChgpasswdPage);
  }
  doAbout(){
      this.appCtrl.getRootNav().push(AboutPage);
  }
  doOut(){
    this.specialProvider.logout().subscribe((res) => {
          if(res["code"] == 10000){
              this.settingProvider.loginstate = false;
              console.log(this.tabRef);
              this.events.publish('toLogin');
              this.navCtrl.setRoot(LoginPage);
           }else{
              this.settingProvider.presentAlert(res["msg"],'');
           }
        }, (err) => {
          this.settingProvider.dismissLoading();
          this.settingProvider.presentAlert("貌似网络出了点小差～",'');
        });
  }
}
