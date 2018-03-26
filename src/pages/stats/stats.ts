import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,Tabs ,AlertController,App} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';
import { SettingProvider } from "../../providers/setting/setting";
import { FarmerProvider } from "../../providers/farmer/farmer";

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform,private backButtonService:BackButtonService,private settingProvider:SettingProvider,private farmerProvider:FarmerProvider) {
  		platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
      this.getFarmerStats();
  }


  getFarmerStats(){
      this.farmerProvider.getStatsFarmer("areaId="+this.settingProvider.user.areaId).subscribe(
          (res) => {
                if(res["code"] == 10000){
                  console.log(res);
                }else{
                  this.settingProvider.presentAlert(res["msg"],"");
                }
          },
          (err) => {
            this.settingProvider.dismissLoading();
            this.settingProvider.presentAlert("貌似网络出了点小差～",'');
          }
      );
  }


  /*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }
}
