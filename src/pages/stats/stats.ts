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
  statser:any;
  area:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform,private backButtonService:BackButtonService,private settingProvider:SettingProvider,private farmerProvider:FarmerProvider) {
  		platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
      
      
  }

  ionViewWillEnter(){
    new Promise ((fulfill,reject) => {
        this.getFarmerAreaStats();
        this.getFarmerStats();
    try{
      fulfill("success");
    }catch(error){
      reject("fail");
    }})
      
  }
  getFarmerStats(){
      this.farmerProvider.getStatsFarmer("areaId="+this.settingProvider.user.areaId).subscribe(
          (res) => {
                if(res["code"] == 10000){
                  this.statser = res["data"]["details"];
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


getFarmerAreaStats(){
      this.farmerProvider.getStatsAreaFarmer("areaId="+this.settingProvider.user.areaId).subscribe(
          (res) => {
                if(res["code"] == 10000){
                  this.area = res["data"];
                  console.log(this.area);
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
