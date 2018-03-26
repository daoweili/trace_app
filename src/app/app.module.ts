import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';
import { ValidDirective } from '../directives/valid/valid';

import { IonicStorageModule } from '@ionic/storage';
import { MyHttpInterceptor } from './my-http-interceptor';
import { BackButtonService } from '../services/backButton';



import { ScanPage } from '../pages/scan/scan';
import { PersonPage } from '../pages/person/person';
import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { TabsPage } from '../pages/tabs/tabs';
import { MTabsPage } from '../pages/tabs/mtabs';
import { MapPage } from '../pages/map/map';

import { StatsPage } from '../pages/stats/stats';
import { LoginPage } from '../pages/login/login';
import { ChgpasswdPage } from '../pages/chgpasswd/chgpasswd';
import { EmailPage } from '../pages/email/email';
import { TruenamePage } from '../pages/truename/truename';
import { CertificatePage } from '../pages/certificate/certificate';
import { FarmerPage } from '../pages/farmer/farmer';
import { SearchPage } from '../pages/search/search';
import { MultiPickerModule } from 'ion-multi-picker';
import { LivestockPage } from '../pages/livestock/livestock';
import { Camera } from '@ionic-native/camera';
import { SpecialProvider } from '../providers/special/special';
import { SettingProvider } from '../providers/setting/setting';
import { FarmerProvider } from '../providers/farmer/farmer';
import { LivestockProvider } from '../providers/livestock/livestock';


@NgModule({
  declarations: [
    MyApp,
    ScanPage,
    PersonPage,
    HomePage,
    LoginPage,
    TabsPage,MTabsPage,
    ChgpasswdPage,TruenamePage,MapPage,
    CertificatePage,
    EmailPage,FarmerPage,DiscoveryPage,
    SearchPage,LivestockPage,StatsPage,
    TextAvatarDirective,ValidDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
    {
      name: '__mytrace',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }
    ),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ScanPage,
    ChgpasswdPage,
    CertificatePage,
    EmailPage,
    FarmerPage,
    SearchPage,
    LivestockPage,StatsPage,
    PersonPage,TruenamePage,MapPage,
    HomePage,
    LoginPage,
    TabsPage,MTabsPage,DiscoveryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    },
    SpecialProvider,
    SettingProvider,Camera,
    FarmerProvider,
    LivestockProvider,BackButtonService
    ]
})
export class AppModule {
}
