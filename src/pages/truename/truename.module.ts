import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruenamePage } from './truename';

@NgModule({
  declarations: [
    TruenamePage,
  ],
  imports: [
    IonicPageModule.forChild(TruenamePage),
  ],
})
export class TruenamePageModule {}
