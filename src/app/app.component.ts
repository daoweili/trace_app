import { Component } from '@angular/core';
import { Platform ,LoadingController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingProvider } from "../providers/setting/setting";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  loader:any;
  constructor(public storage:Storage,private settingProvider:SettingProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private network:Network, private loadingCtrl: LoadingController) {

    platform.ready().then(() => {
      /*从缓存里面读取登录信息*/
      this.storage.get('user').then((val) => {
         if(val !=null ) this.settingProvider.user = val;
      });
      /*从缓存里面读取区域信息*/
      this.storage.get('cityColumns').then((val) => {
         if(val !=null ) this.settingProvider.cityColumns = val;
      });
      /*选择跳转页面*/
      this.settingProvider.getheartbeat().subscribe((res) => {
        if(res["code"] === 10005){
          if(this.settingProvider.loginstate == true) 
          {
            this.rootPage = LoginPage;
          }
        }else{
          this.settingProvider.loginstate = true;
          this.rootPage = TabsPage;
        }
      });
      statusBar.show();
      splashScreen.hide();
      this.checkNetwork();
    });
  }

  /*检测网络，若未连接网络，给出提示*/
  checkNetwork() {
    if(this.network.type === 'unknown') {
      console.log('This is a unknown network, please be careful!');
    } else if(this.network.type === 'none') {
      console.log('none network!');
      this.loader = this.loadingCtrl.create({
        content: "当前网络不可用，请检查网络设置！"
      });

      this.loader.present();

      setTimeout(() => { 
        if(this.loader)this.loader.dismiss();
      }, 5000);




    } else {
      console.log('we got a ' + this.network.type + ' connection, woohoo!');
    }
   }
}
