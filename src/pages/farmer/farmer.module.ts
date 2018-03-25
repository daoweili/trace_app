import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerPage } from './farmer';
import { SettingProvider } from "../../providers/setting/setting";

@NgModule({
  declarations: [
    FarmerPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerPage),
  ],
})
export class FarmerPageModule {}
