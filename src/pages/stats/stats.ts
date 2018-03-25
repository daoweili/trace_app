import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,Tabs } from 'ionic-angular';
import { BackButtonService } from '../../services/backButton';

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform:Platform,private backButtonService:BackButtonService) {
  		platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
  }


/*自定义返回键*/
  goBack(){
    this.navCtrl.pop();  // remember to put this to add the back button behavior
  }
}
