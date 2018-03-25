import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AlertController,LoadingController } from 'ionic-angular';

/*
  Generated class for the SettingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingProvider {
   
   /*******************************************
   * 全局对象定义
   ******************************************/
   /*心跳间隔时间 秒*/
   heartbeat = 1000 * 30;
   /* 是否已经登录 */
   loginstate:boolean = false;
   /*登陆用户信息*/
   user :any;
   /*行政列表*/
   cityColumns: any[];
   /*服务器通讯地址*/
   apiUrl :string ="http://localhost:8100/app";
   /*根据行政区域存储防疫类型*/
   epidemicPrevention :Object;
   keyword :string ="";
   /*扫描结果*/
   scanResult = "";
   /*是否插入牲畜*/
   ltockinsert:boolean = true;
   /*loading*/
   loading;
   /*时间格式*/
   formatDate = ( time: any ) => {
          const Dates = new Date( time );
          const year: number = Dates.getFullYear();
          const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
          const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
          const hours:any = Dates.getHours();
          const min:any = Dates.getMinutes();
          const seconds:any = Dates.getSeconds();
          return year + '-' + month + '-' + day + " " + hours +":" + min + ":"+seconds;
    };
   /*牲畜*/
   ltock:any = {
      code:"",
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
      insureId:"1",
      farmer:"",
      accidentDead:"1",
      sex:"1",
      slaughterDate : this.formatDate( new Date().getTime() )
   };
   
    /* http请求头设置 */
   httpOptions:Object = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        })
   }; 


   /*构造函数*/
   constructor(public http: HttpClient,public alertCtrl:AlertController,public loadingCtrl:LoadingController) {

   }


   


   /******************************************
   * 公用方法
   ******************************************/

   /*显示http loading*/
   presentLoading(title:string="请求中，请等待..."){
    console.log("loading  出来了");
     this.loading = this.loadingCtrl.create({
        spinner: 'ios',
        content: title        
      });
   }

   /* 隐藏http loading */
   dismissLoading(){
      console.log("loading  消失了");
      this.loading.dismiss();
   }
  
   /* 弹出框 */
   presentAlert(msg:string,title:string,buttons:any[] = [{text :title==''?'确定':title}]) 
    {
      let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: msg,
      cssClass:'alert-ios',
      buttons: buttons,
      enableBackdropDismiss:true
      });
      alert.present();
    return alert;
  }

   /* 获取行政区域 */
   getEpidemicPrevention(areaid){
     return this.http.get(this.apiUrl+"/specialManager/epidemicPrevention/queryByArea/"+areaid,this.httpOptions);
   }

   /* heartbeat */
   getheartbeat(){
      return this.http.get("http://47.96.48.160/heartbeat/special_manager",this.httpOptions);
   }
   
}
