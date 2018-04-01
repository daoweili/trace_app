import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform ,Tabs,App} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { SettingProvider } from "../../providers/setting/setting";
import { LivestockPage } from '../livestock/livestock';

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage {
  @ViewChild('myTabs') tabRef: Tabs;
	/*搜索结果提示*/
  msg: string;
  /*选中对象*/
  sel: any = null;
  operate:string = "operate2";
  constructor(public appCtrl:App,public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });	  
      if ( this.settingProvider.scanResult.length == 0 ){
        this.msg = "扫描不到任何信息";
      } else {
        this.msg = "";
      }
      /*刷新页面内容*/
      if( navParams.data.data != null){
          console.log("刷新扫描内容");
          this.settingProvider.scanResult = navParams.data.data;
      }
  	
  }
  /*选择*/
  selectItem(item){
  	  console.log("你选择了",item);
      this.sel = item;
  }
  /*选择跳转*/
  goto(){
      if(this.sel !== null){
        this.appCtrl.getRootNav().push(LivestockPage,{item:this.sel,type:"scan"});
      }else{
        this.settingProvider.presentAlert("请选择","");
      }
  }
}
