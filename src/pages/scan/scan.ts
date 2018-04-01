import { Component ,ViewChild} from '@angular/core';
import { NavController ,App,Platform,Tabs} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { Camera ,CameraOptions} from '@ionic-native/camera';
import { SettingProvider } from "../../providers/setting/setting";
import { LivestockPage } from '../livestock/livestock';
import { DiscoveryPage } from '../discovery/discovery';
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public navCtrl: NavController,public appCtrl:App,public settingProvider:SettingProvider,private camera:Camera,private backButtonService:BackButtonService,private platform:Platform) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }

  doInsert(){
      this.settingProvider.keyword="";
      this.appCtrl.getRootNav().push(LivestockPage);
  }


  doScan(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.settingProvider.keyword="";

    this.camera.getPicture(options).then((res) => {
       /*json转数组*/
       let c:string = res;
       let d:any = JSON.parse(c);
       if(d.code == 10000){
          this.settingProvider.scanResult = this.format(d.data);
          if(this.settingProvider.scanResult.length==1){
              console.log("只有一条",this.settingProvider.scanResult[0]);
              this.appCtrl.getRootNav().push(LivestockPage,{item:this.settingProvider.scanResult[0].code,type:"scan"});
          }else{
            this.appCtrl.getRootNav().push(DiscoveryPage);
          }
       }else if (d.code == 9998){
          this.settingProvider.presentAlert(d.msg,"");
       } else if(d.code == 9999){
          this.settingProvider.presentAlert(d.msg,"");
       }
    }, (err) => {
      
    });
  }


  format(rows:any){
    let res: any=[];
    for(var i = 0 ; i < rows.length ; i++){
        let a:any = {code:"",msg:"未操作"};
        a.code = rows[i];
        res.push(a);
    }
    return res;
  }


  doScan1(){
     //let c:string = "{\"code\":10000,\"data\":[\"E20094C6A0B48148F33C3E05\",\" E2100016880401580370E48A\",\" E2000016880401580370E48A\",\" E2000016880401580370EC8A\"],\"msg\":\"success\"}";
     let c:string = "{\"code\":10000,\"data\":[\"E20094C6A0B48148F33C3E05\"],\"msg\":\"success\"}";
     let d:any = JSON.parse(c);

       if(d.code == 10000){
          this.settingProvider.scanResult = this.format(d.data);
          if(this.settingProvider.scanResult.length==1){
              console.log("只有一条",this.settingProvider.scanResult[0]);
              this.appCtrl.getRootNav().push(LivestockPage,{item:this.settingProvider.scanResult[0].code,type:"scan"});
          }else{
            this.appCtrl.getRootNav().push(DiscoveryPage);
          }
       }else if (d.code == 9998){
          this.settingProvider.presentAlert(d.msg,"");
       } else if(d.code == 9999){
          this.settingProvider.presentAlert(d.msg,"");
       }

  }
}
