import { Component ,ViewChild} from '@angular/core';
import { Platform, Tabs ,App} from 'ionic-angular';
import { PersonPage } from '../person/person';
import { ScanPage } from '../scan/scan';
import { HomePage } from '../home/home';
import { FarmerPage } from '../farmer/farmer';
import { LoginPage } from '../login/login';
import { BackButtonService } from '../../services/backButton';
import { SettingProvider } from '../../providers/setting/setting';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScanPage;
  tab3Root = FarmerPage;
  tab4Root = PersonPage;
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public backButtonService: BackButtonService , public platform:Platform,public settingProvider:SettingProvider,public appCtrl: App) {
      
      let time ;

	    platform.ready().then(() => {
       this.backButtonService.registerBackButtonAction(this.tabRef);
      });

      if(this.settingProvider.loginstate == true){
        time = setInterval(() => { 
          this.settingProvider.getheartbeat().subscribe((res) => {
      
              if( res["code"] == 10005 ) {
                  this.appCtrl.getRootNav().push(LoginPage);
                  console.log("go to login");
              }
          },(err)=>{

          });
        }, this.settingProvider.heartbeat);
      }else{

            clearInterval(time);
      }

  }
}
