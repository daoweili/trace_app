import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { SpecialProvider } from "../../providers/special/special";
import { StatusBar } from '@ionic-native/status-bar';
import { Camera ,CameraOptions} from '@ionic-native/camera';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
