import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificatePage } from './certificate';

@NgModule({
  declarations: [
    CertificatePage,
  ],
  imports: [
    IonicPageModule.forChild(CertificatePage),
  ],
})
export class CertificatePageModule {}
