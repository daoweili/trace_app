import { Component ,ViewChild} from '@angular/core';
import { NavController ,App,Platform} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { StatusBar } from '@ionic-native/status-bar';
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SettingProvider } from "../../providers/setting/setting";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,private statusBar:StatusBar,private platform:Platform,public appCtrl:App,public storage:Storage,public settingProvider:SettingProvider,private backButtonService:BackButtonService) {
    platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(null);
    });
    this.statusBar.overlaysWebView(false);
    this.statusBar.show();
    this.statusBar.backgroundColorByHexString('#333');
  }

  ionViewDidEnter(){
    // console.log(this.settingProvider);
    if( this.settingProvider != null ){
      if ( this.settingProvider.user != null ){
        if ( (this.settingProvider.user as any).areaId > 0 ){
        this.settingProvider.getEpidemicPrevention((this.settingProvider.user as any).areaId).subscribe((res) => {
          if(res["code"] == 10000){
               this.settingProvider.epidemicPrevention = res["data"];
           }
        }, (err) => {
         console.log(err);
        });
       }
      }
    }
  }
  /*搜索*/
  doSearch(keyword: HTMLInputElement){
  	if(keyword.value.length>0){
  		this.appCtrl.getRootNav().push(SearchPage,{keyword:keyword.value,searchType:"homeSearch"});
  	}
  }

}
