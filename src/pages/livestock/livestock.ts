import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,App,Platform,Tabs} from 'ionic-angular';
import { SettingProvider } from "../../providers/setting/setting";
import { SearchPage } from '../search/search';
import { LivestockProvider } from "../../providers/livestock/livestock";
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { BackButtonService } from '../../services/backButton';


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
        this.settingProvider.ltock.farmer = navParams.data.item;
        console.log("当前的牲畜数据是",this.settingProvider.ltock);
      }
      //选择扫描结果
      if( navParams.data.type =="scan" ){
          this.settingProvider.ltock.code = navParams.data.item;
          this.livestockProvider.doSearchLivestock(this.settingProvider.ltock.code).subscribe((res) => {
            let stock = res["data"][0];
            if(stock == null){
                this.settingProvider.ltock.farmer = null;
                this.clearLtock();
                this.settingProvider.ltockinsert = true;
            }else{
                console.log("牲畜查询",stock,this.settingProvider.ltock.farmer.name);
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
      code:'',
      farmId:"0",
      motherAddress:'',
      epidemicIds:'',
      slaughterAddress:'',
      slaughterRemark:'',
      saleFlow:'',
      epidemicType:'',
      epidemicProduct:'',
      epidemicBatch:'',
      healthy:1,
      insureState:1,
      type:"1",
      insureId:"",
      accidentDead:"1",sex:"1",
      slaughterDate : this.settingProvider.formatDate( new Date().getTime() ),
      farmer:""
    };
    this.settingProvider.ltock.code = code;
  }


  /*新增牲畜*/
  doAdd(){
  if( this.settingProvider.ltock.code =="" ){
        this.settingProvider.presentAlert("牲畜编号不能为空",'');
      }else if( this.settingProvider.ltock.farmer.name == "" ){
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
          this.livestockProvider.doAddLivestock(this.settingProvider.ltock).subscribe((res) => {
              if(res["code"] == 10000){
                    this.settingProvider.presentAlert("新增成功",'');
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
      this.livestockProvider.doEditLivestock(this.settingProvider.ltock).subscribe((res) => {
          if(res["code"] == 10000){
                this.settingProvider.presentAlert("修改成功",'');
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
    this.isScan = true;
    let msgbox = this.settingProvider.presentAlert("扫描中,请在30秒内扫描... ",'关闭',[
      {
        text :'确定',
        handler:()=>{
            let navTransition = msgbox.dismiss();
            navTransition.then(() => {
              this.isScan = false;
            });
            return false;
        }
      }]);

    console.log(msgbox);

    setTimeout(() => {
      if(this.isScan == true){
        msgbox.dismiss();
        this.settingProvider.presentAlert("扫描超时，请确认后重试","");
      }
    },30000);
    
    this.camera.getPicture(options).then((res) => {
       //json转数组
       let c:string = res;
       let d:any = JSON.parse(c);
       if(d.code == 10000){
          msgbox.dismiss();
          this.isScan == false;
          if ( d.data.length > 0){
            //alert(d.data[0]);
            this.settingProvider.ltock.insureId = d.data[0];
          } else{
            this.settingProvider.presentAlert(d.msg,"扫描不到任何信息");
          }
       }else{
          this.settingProvider.presentAlert(d.msg,"");
       }
    }, (err) => {
      
    });
  }

  /*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }
}
