import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform ,Tabs} from 'ionic-angular';
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
  /*搜索内容*/
  all: any=[];
  /*选中对象*/
  sel: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });	  

    	let res:any = this.settingProvider.scanResult;
      console.log("result",res,"size",res.data.length);
      if (res.code == 10000 && res.data.length > 0){
          for(var i = 0 ; i < res.data.length ; i++){
              let a:any = {code:""};
              a.code = res.data[i];
              console.log("a",a);
              this.all.push(a);
          }
      } else if (res.code == 10000 && res.data.length == 0){
        this.msg = "扫描不到任何信息";
      } else {
        this.msg = res.msg;
      }
  	
  }
  /*选择*/
  selectItem(item){
  	  console.log("你选择了",item.code);
      this.sel = item;
  }
  /*选择跳转*/
  goto(){
      console.log(this.sel);
      if(this.sel !== null){
        this.navCtrl.push(LivestockPage,{item:this.sel,type:"scan"});
      }else{
        this.settingProvider.presentAlert("请选择","");
      }
  }
  
  /*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }
}
