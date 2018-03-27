import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,Tabs} from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

import { SettingProvider } from "../../providers/setting/setting";
import { LivestockPage } from '../livestock/livestock';
import { FarmerPage } from '../farmer/farmer';
import { FarmerProvider } from "../../providers/farmer/farmer";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('myTabs') tabRef: Tabs;
  searchQuery: string = '';
  homeSearch:boolean = false;
  items: string[];
  result :any[];
  page:number=1;//当前页码
  total:number=0;//总页码
  constructor(public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,public farmerProvider:FarmerProvider,private platform:Platform,private backButtonService:BackButtonService) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
      if(navParams.data.keyword!="") {
        console.log("搜索类型",navParams.data.searchType);
        if(navParams.data.searchType=="homeSearch"){
          this.homeSearch = true;
        }else{
          this.homeSearch = false;
        }
        this.settingProvider.keyword = navParams.data.keyword;
        this.farmerProvider.farmerSearch(this.settingProvider.keyword).subscribe((res) => {
          console.log("farmer" ,res["data"]["list"]);
          this.result = res["data"]["list"];
          console.log("result",this.result);
        }, (err) => {
         this.settingProvider.dismissLoading();
         this.settingProvider.presentAlert("貌似网络出了点小差～",'');
        });
      }
  }


 selectItem(item){
    if(this.navParams.data.searchType=="farmerSearch"){
      console.log("搜索类型",this.navParams.data.searchType);
      this.settingProvider.keyword = item.name;
      this.navCtrl.push(LivestockPage,{item:item,type:"farmerSearch"});
    }
 }

 ionViewDidLoad(){
 }


 ionViewDidLeave(){
    if(this.navParams.data.searchType=="farmerSearch"){
         console.log("你离开了页面");
    }
 }


doSearch() {
      if(this.settingProvider.keyword!=""){
          this.farmerProvider.farmerSearch(this.settingProvider.keyword).subscribe((res) => {
            console.log("farmer" ,res["data"]["list"]);
            this.result = res["data"]["list"];
            console.log("result",this.result);
          }, (err) => {
           this.settingProvider.dismissLoading();
           this.settingProvider.presentAlert("貌似网络出了点小差～",'');
          });
      }
    
  }


 getItems(ev: any) {
    if(ev.inputType=="insertText" || ev.inputType=="deleteContentBackward" || ev.inputType=="deleteByCut" || ev.inputType=="insertFromPaste")
      if(ev.target.value!=""){
          console.log("ev","用户加入文本"+ev.target.value);
          this.settingProvider.keyword = ev.target.value;
          this.farmerProvider.farmerSearch(this.settingProvider.keyword).subscribe((res) => {
            console.log("farmer" ,res["data"]["list"]);
            this.result = res["data"]["list"];
            console.log("result",this.result);
          }, (err) => {
           this.settingProvider.dismissLoading();
           this.settingProvider.presentAlert("貌似网络出了点小差～",'');
          });
      }
    
  }

  showLivestock(ev:any){
      console.log("首页过来的");
      this.navCtrl.push(FarmerPage,{item:ev,type:"farmerCat",info:"livestock"});
  }

  showFarmer(ev:any){
      console.log("首页过来的");
      this.navCtrl.push(FarmerPage,{item:ev,type:"farmerCat",info:"farmer"});
  }

  doInfinite(infiniteScroll) {
      console.log(this.total,this.page);
      if(this.total > this.page || this.total == 0 ){
          this.page = this.page + 1;
          this.farmerProvider.farmerSearch(this.settingProvider.keyword,this.page).subscribe((res) => {
            if(res["code"]==10000){
                let row:any[] = res["data"]["list"];
                console.log("farmer" ,row.length);
                for (var i = row.length - 1; i >= 0; i--) {
                   console.log(row[i]);
                   this.result.push(row[i]);
                 } 
                this.total = res["data"]["total"];
                console.log("total",this.total);
                infiniteScroll.complete();
              }else{
                 this.settingProvider.presentAlert(res["msg"],'');
              }
          }, (err) => {
           this.settingProvider.dismissLoading();
           this.settingProvider.presentAlert("貌似网络出了点小差～",'');
        });
      }else{
          infiniteScroll.complete();
      }
    
  }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  /*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }
}
