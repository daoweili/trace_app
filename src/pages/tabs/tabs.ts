import { Component ,ViewChild} from '@angular/core';
import { Platform, Tabs ,App,Events,NavController} from 'ionic-angular';
import { PersonPage } from '../person/person';
import { ScanPage } from '../scan/scan';
import { HomePage } from '../home/home';
import { FarmerPage } from '../farmer/farmer';
import { LoginPage } from '../login/login';
import { AnalysisPage } from '../analysis/analysis';
import { BackButtonService } from '../../services/backButton';
import { SettingProvider } from '../../providers/setting/setting';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  timer:any;
  tab1Root = HomePage;
  tab2Root = ScanPage;
  tab3Root = FarmerPage;
  tab4Root = PersonPage;
  tab5Root = AnalysisPage;
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController,public events:Events,public backButtonService: BackButtonService , public platform:Platform,public settingProvider:SettingProvider,public appCtrl: App) {
      
	    platform.ready().then(() => {
       this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }


  ionViewDidLoad() {
    this.listenEvents();
    console.log(this.settingProvider.loginstate);
    this.timer = setInterval(() => { 
      if(this.settingProvider.loginstate == true){
      this.settingProvider.getheartbeat().subscribe((res) => {
          if( res["code"] == 10005 && this.settingProvider.loginstate == true ) {
              this.settingProvider.presentAlert("登录超时、或者可能出现异地登录",'');
              this.navCtrl.setRoot(LoginPage);
              console.log("go to login");
          }
      },(err)=>{

      })};
    }, this.settingProvider.heartbeat);
    console.log('界面创建');
  }

  ionViewWillUnload() {
    this.settingProvider.loginstate = false;
    this.events.unsubscribe('toLogin');
    clearTimeout(this.timer);
    console.log('界面销毁');
  }

  listenEvents() {
    this.events.subscribe('toLogin', () => {
      this.navCtrl.setRoot(LoginPage);
      // this.nav.pop(); 使用这种方式也可以，但是会在登录框中默认填上值
      // console.log('返回登录');
    });
  }
}
