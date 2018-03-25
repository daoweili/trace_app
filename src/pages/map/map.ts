import { Component ,ElementRef,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingProvider } from "../../providers/setting/setting";
import { FarmerPage } from '../farmer/farmer';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var BMap;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('bdmap') mapElement: ElementRef;
  @ViewChild('suggestId') sugElement: ElementRef;

  address:string = "";
  add:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private settingProvider:SettingProvider) {
  	if(navParams.data.action=="location") {
  		this.add = true;
  	}else{
  		this.add = false;
  	}
  }

  ionViewDidLoad() {
  		this.settingProvider.presentLoading("定位中，请稍侯...");
        this.settingProvider.loading.present();
    	let map = new BMap.Map(this.mapElement.nativeElement, {
            enableMapClick: true
        }); //创建地图实例
        map.enableScrollWheelZoom(); //启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); //连续缩放效果，默认禁用
        let point = new BMap.Point(116.331398,39.897445); //坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 16); //设置中心和地图显示级别
        

        let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			{"input" : "suggestId"
			,"location" : map
		});


		ac.addEventListener("onhighlight", (e) => {  //鼠标放在下拉列表上的事件
			console.log(this);
			let str = "";
			let _value = e.fromitem.value;
			let value = "";
			if (e.fromitem.index > -1) {
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
			
			value = "";
			if (e.toitem.index > -1) {
				_value = e.toitem.value;
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			document.getElementById("searchResultPanel").innerHTML = str;
		});


		let myValue;
		ac.addEventListener("onconfirm", (e) => {    //鼠标点击下拉列表后的事件
		let _value = e.item.value;
			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			
			this.setPlace(map,myValue);
		});


		// 添加带有定位的导航控件
		let navigationControl = new BMap.NavigationControl({
		    // 靠左上角位置
		    anchor: 0,
		    // LARGE类型
		    type: 0,
		    // 启用显示定位
		    enableGeolocation: true
		});


		map.addControl(navigationControl);
		let geolocation = new BMap.Geolocation();
		let _geo = geolocation.getCurrentPosition( (r) => {
			
			//if(_geo.getStatus() == 0){
				let mk = new BMap.Marker(r.point);
				mk.setAnimation(2); //跳动的动画
				map.addOverlay(mk);
				map.panTo(r.point);
				this.theLocation(map,r.point.lng,r.point.lat);
				let myGeo = new BMap.Geocoder();
				myGeo.getLocation(r.point, (rs) => {
				let addComp = rs.addressComponents;
					this.address = addComp.province +  addComp.city + addComp.district +  addComp.street + addComp.streetNumber;
					this.settingProvider.dismissLoading();
				});
			//}
			//else {
             //    this.settingProvider.presentAlert("当前可能GPS定位信号弱，无法定位",'');
			//}        
		},{enableHighAccuracy: true})
   }

	// 用经纬度设置地图中心点
	theLocation(map,longitude:string,latitude:string){
		if(longitude!= "" && latitude != ""){
			map.clearOverlays(); 
			let new_point = new BMap.Point(longitude,latitude);
			let marker = new BMap.Marker(new_point);  // 创建标注
			marker.setAnimation(2); //跳动的动画
			console.log(new_point);
			map.addOverlay(marker);              // 将标注添加到地图中
			map.panTo(new_point);  
			console.log(map);    
		}
	}


	setPlace(map:any,myValue:string){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
			var mk = new BMap.Marker(pp);
			mk.setAnimation(2); //跳动的动画
			map.addOverlay(mk);    //添加标注
		}
		let local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		this.address = myValue;
		local.search(myValue);
	}

    backButtonClick = (e: UIEvent) => {
     this.navCtrl.pop();
    }

    addAddress(address:string){
    	this.navCtrl.push(FarmerPage,{address:address,type:"baidu"});
    }


}
