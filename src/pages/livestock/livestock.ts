import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,App,Platform,Tabs} from 'ionic-angular';
import { SettingProvider } from "../../providers/setting/setting";
import { SearchPage } from '../search/search';
import { TabsPage } from '../tabs/tabs';
import { LivestockProvider } from "../../providers/livestock/livestock";
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { BackButtonService } from '../../services/backButton';
import { DiscoveryPage } from '../discovery/discovery';
import { ScanPage } from '../scan/scan';


/**
 * Generated class for the LivestockPage page.
 *import citise from '../../assets/cities.json';
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-livestock',
  templateUrl: 'livestock.html',
})
export class LivestockPage {
  @ViewChild('myTabs') tabRef: Tabs;

  isScan:boolean = false;
  constructor(public appCtrl:App,public navCtrl: NavController, public navParams: NavParams,public settingProvider:SettingProvider,public livestockProvider:LivestockProvider,private camera:Camera,private backButtonService:BackButtonService,private platform:Platform) {
      platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
      //录入时选择的农户
      if( navParams.data.item != null && navParams.data.type =="farmerSearch"){
        console.log("选择了",navParams.data.item);
        this.settingProvider.ltock.farmId = (navParams.data.item as any).id+"";
        this.settingProvider.farmername = navParams.data.item.name;
        console.log("当前的牲畜数据是",this.settingProvider.ltock);
      }
      //选择扫描结果
      if( navParams.data.type =="scan" ){
        console.log("选择扫描结果" , navParams.data.item);
          this.settingProvider.ltock.code = navParams.data.item;
          this.livestockProvider.doSearchLivestock(this.settingProvider.ltock.code).subscribe((res) => {
            let stock = res["data"];
            console.log(stock);
            if(stock == null){
                console.log(1);
                this.settingProvider.farmername = "";
                this.clearLtock();
                this.settingProvider.ltockinsert = true;
            }else{
                console.log(2);
                console.log("牲畜查询",stock,this.settingProvider.farmername);
                stock.slaughterDate = this.settingProvider.formatDate( new Date(this.settingProvider.ltock.slaughterDate) ,false);
                console.log("stock",stock);
                this.settingProvider.ltock = stock;
                this.settingProvider.ltockinsert = false;
            }
           console.log("扫描后的牲畜数据是",this.settingProvider.ltock);

        }, (err) => {
         this.settingProvider.dismissLoading();
         this.settingProvider.presentAlert("貌似网络出了点小差～",'');
        });
      }
  }


  //搜索农户
  doSearch(){
      this.navCtrl.push(SearchPage,{keyword:this.settingProvider.keyword,searchType:"farmerSearch"});
  }

  /*清空对象*/
  clearLtock(){
    let code = this.settingProvider.ltock.code;
    this.settingProvider.ltock = {
      code:"",
      farmId:"0",
      motherAddress:"",
      epidemicIds:"",
      slaughterAddress:"",
      slaughterRemark:"",
      saleFlow:"",
      epidemicType:"",
      epidemicProduct:"",
      epidemicBatch:"",
      healthy:1,
      insureState:2,
      type:"1",
      insureId:"",
      accidentDead:"1",sex:"1",
      slaughterDate : this.settingProvider.formatDate( new Date().getTime() )
      };
    this.settingProvider.ltock.code = code;
  }


  /*新增牲畜*/
  doAdd(){
  if( this.settingProvider.ltock.code =="" ){
        this.settingProvider.presentAlert("牲畜编号不能为空",'');
      }else if( this.settingProvider.farmername == "" ){
        this.settingProvider.presentAlert("请输入农户",'');
      }else if( this.settingProvider.ltock.motherAddress == "" ){
        this.settingProvider.presentAlert("请输入母体来源",'');
      }else if( this.settingProvider.ltock.slaughterDate =="" ){
        this.settingProvider.presentAlert("请输入出生时间",'');
      }else if( this.settingProvider.ltock.sex =="" ){
        this.settingProvider.presentAlert("请输入性别",'');
      }else if( this.settingProvider.ltock.healthy =="" ){
        this.settingProvider.presentAlert("请输入健康状态",'');
      }else if( this.settingProvider.ltock.type =="" ){
        this.settingProvider.presentAlert("请输入种类",'');
      }else{
          this.settingProvider.ltock.epidemicIds=this.settingProvider.ltock.epidemicIds.toString();
          this.settingProvider.ltock.slaughterDate=this.settingProvider.ltock.slaughterDate+' 00:00:00';
          console.log(this.settingProvider.ltock);
          //delete this.settingProvider.ltock["farmer"];
          this.livestockProvider.doAddLivestock(this.settingProvider.ltock).subscribe((res) => {
              if(res["code"] == 10000){
                    console.log("更改扫描结果的记录信息")
                    this.changeState(this.settingProvider.ltock.code);
                    this.settingProvider.presentAlert("新增成功",'');

                    if( this.countState() > 0 )
                      this.navCtrl.push(DiscoveryPage,{data:this.settingProvider.scanResult});
                    else
                      this.navCtrl.push(ScanPage);
                    
               }else{
                    this.settingProvider.presentAlert(res["msg"] ,'');
               }
            }, (err) => {
             this.settingProvider.dismissLoading();
             this.settingProvider.presentAlert("貌似网络出了点小差～",'');
            });
      }
  }


  /*修改牲畜*/
  doEdit(){
      this.settingProvider.ltock.epidemicIds=this.settingProvider.ltock.epidemicIds.toString();
      this.settingProvider.ltock.slaughterDate=this.settingProvider.ltock.slaughterDate+' 00:00:00';
      console.log(this.settingProvider.ltock);
      //delete this.settingProvider.ltock["farmer"];
      this.livestockProvider.doEditLivestock(this.settingProvider.ltock).subscribe((res) => {
          if(res["code"] == 10000){
                console.log("更改扫描结果的记录信息");
                this.changeState(this.settingProvider.ltock.code);
                this.settingProvider.presentAlert("修改成功",'');
                if( this.countState() > 0 )
                  this.navCtrl.push(DiscoveryPage,{data:this.settingProvider.scanResult});
                else
                  this.navCtrl.push(ScanPage);
           }else{
                this.settingProvider.presentAlert(res["msg"] ,'');
           }
        }, (err) => {
         this.settingProvider.dismissLoading();
         this.settingProvider.presentAlert("貌似网络出了点小差～",'');
        });
  }


  doScan(){
    const options: CameraOptions = {
      quality: 99,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    alert("你按了保险标");
    this.camera.getPicture(options).then((res) => {
       //json转数组
       let c:string = res;
       let d:any = JSON.parse(c);
      
       if(d.code == 10000){
          this.settingProvider.ltock.insureId = this.format(d.data);
       }else if (d.code == 9998){
          this.settingProvider.presentAlert(d.msg,"");
       } else if(d.code == 9999){
          this.settingProvider.presentAlert(d.msg,"");
       }

    }, (err) => {
      
    });
  }


  format(rows:any){
    if(rows.length == 1){
      return rows[0];
    }else{
      return "";
    }
  }

  changeState(row:string){
    for(var i = 0 ; i < this.settingProvider.scanResult.length ; i++){
      console.log(this.settingProvider.scanResult[i].code);
      console.log(row);
        if(this.settingProvider.scanResult[i].code.trim() == row.trim()){

          console.log("已操作",row);
          this.settingProvider.scanResult[i].msg = "已操作";
        }
    }
  }

  countState(){
    let count = this.settingProvider.scanResult.length;
    for(var i = 0 ; i < this.settingProvider.scanResult.length ; i++){
        if(this.settingProvider.scanResult[i].msg == "已操作"){
            count = count - 1;
        }
    }
    return count;
  }

  /*自定义返回键*/
  goBack(){
    console.log(this.appCtrl.getRootNav().root);
    //t.select(2);
    //this.tabRef.select(2);
    // this.appCtrl.getRootNav().select(2);
    this.navCtrl.setRoot(this.appCtrl.getRootNav().root);


    //this.navCtrl.push(TabPage);  // remember to put this to add the back button behavior
  }
}
