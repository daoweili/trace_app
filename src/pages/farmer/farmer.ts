import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,Platform,Tabs,App} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { SettingProvider } from "../../providers/setting/setting";
import { FarmerProvider } from "../../providers/farmer/farmer";
import { MapPage } from '../map/map';

/**
 * Generated class for the FarmerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer',
  templateUrl: 'farmer.html',
})
export class FarmerPage {
  @ViewChild('myTabs') tabRef: Tabs;

  toPage:boolean=true;
  infoType:boolean=false;
  /*农户对象*/
  farmer:any = {
    name:'',
    mobile:"",
    cardId:"",
    farmAddress:""
  };
  /*统计对象*/
  statser:any[] = [{
      "count": 0,
      "farmId": 0,
      "areaId": 0,
      "areaName": "",
      "farmerName": "",
      "sex": 1,
      "sexStr": "",
      "type": 1,
      "typeStr": ""
  }];
  count:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController, public settingProvider:SettingProvider,public farmerProvider:FarmerProvider,private platform:Platform,private backButtonService:BackButtonService,private appCtrl:App) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
      //首页搜索后查看农户
      if( navParams.data.item != null && navParams.data.type =="farmerCat"){
        console.log("点击了",navParams.data.item,navParams.data.info);
        this.farmer = navParams.data.item;
        if( navParams.data.info =="livestock" ) 
        {
          this.infoType = true;
          this.getStats(this.farmer.id);

        }
        this.toPage = false;
      }else{
        this.toPage = true;
      }

      if( navParams.data.address != null && navParams.data.type =="baidu"){
        this.farmer.farmAddress = navParams.data.address;
      }
  }


  getStats(farmId){
      this.farmerProvider.getStatsFarmer("areaId="+this.settingProvider.user.areaId+"&farmId="+farmId).subscribe(
          (res) => {
                if(res["code"] == 10000){
                  this.statser = res["data"];
                  this.count=this.statser["details"].length;
                  
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
 
  /* 定位 */
  location(){
      this.appCtrl.getRootNav().push(MapPage,{"action":"location"});
  }
  /*新增*/
  doAdd(){
      if( this.farmer.name =="" ){
        this.settingProvider.presentAlert("请输入名字",'');
      }else if( this.farmer.mobile =="" ){
        this.settingProvider.presentAlert("请输入手机号",'');
      }else if( this.settingProvider.user.areaId =="" ){
        this.settingProvider.presentAlert("请输入行政区域",'');
      }else if( this.farmer.cardId =="" ){
        this.settingProvider.presentAlert("请输入身份证号码",'');
      }else if( this.farmer.farmAddress =="" ){
        this.settingProvider.presentAlert("请输入养殖地址",'');
      }else{
        this.farmerProvider.doAddFarmer(this.farmer).subscribe((res) => {
            if(res["code"] == 10000){
                 this.settingProvider.presentAlert("新增成功",'');
                 this.farmer = {
                    name:"",
                    mobile:"",
                    cardId:"",
                    farmAddress:""
                  };
             }else{
                 this.settingProvider.presentAlert(res["msg"],'');

             }
          }, (err) => {
            this.settingProvider.dismissLoading();
            this.settingProvider.presentAlert("貌似网络出了点小差～",'');
          });
      }

  }
/*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }
}
