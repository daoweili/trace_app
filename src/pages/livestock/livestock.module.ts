import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivestockPage } from './livestock';
import { SettingProvider } from "../../providers/setting/setting";

@NgModule({
  declarations: [
    LivestockPage,
  ],
  imports: [
    IonicPageModule.forChild(LivestockPage),
  ],
})
export class LivestockPageModule {}
