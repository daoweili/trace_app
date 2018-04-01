webpackJsonp([13],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__livestock_livestock__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__discovery_discovery__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ScanPage = (function () {
    function ScanPage(navCtrl, appCtrl, settingProvider, camera, backButtonService, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.settingProvider = settingProvider;
        this.camera = camera;
        this.backButtonService = backButtonService;
        this.platform = platform;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
    }
    ScanPage.prototype.doInsert = function () {
        this.settingProvider.keyword = "";
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__livestock_livestock__["a" /* LivestockPage */]);
    };
    ScanPage.prototype.doScan = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.settingProvider.keyword = "";
        this.camera.getPicture(options).then(function (res) {
            /*json转数组*/
            var c = res;
            var d = JSON.parse(c);
            if (d.code == 10000) {
                _this.settingProvider.scanResult = _this.format(d.data);
                if (_this.settingProvider.scanResult.length == 1) {
                    console.log("只有一条", _this.settingProvider.scanResult[0]);
                    _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__livestock_livestock__["a" /* LivestockPage */], { item: _this.settingProvider.scanResult[0].code, type: "scan" });
                }
                else {
                    _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__discovery_discovery__["a" /* DiscoveryPage */]);
                }
            }
            else if (d.code == 9998) {
                _this.settingProvider.presentAlert(d.msg, "");
            }
            else if (d.code == 9999) {
                _this.settingProvider.presentAlert(d.msg, "");
            }
        }, function (err) {
        });
    };
    ScanPage.prototype.format = function (rows) {
        var res = [];
        for (var i = 0; i < rows.length; i++) {
            var a = { code: "", msg: "未操作" };
            a.code = rows[i];
            res.push(a);
        }
        return res;
    };
    ScanPage.prototype.doScan1 = function () {
        //let c:string = "{\"code\":10000,\"data\":[\"E20094C6A0B48148F33C3E05\",\" E2100016880401580370E48A\",\" E2000016880401580370E48A\",\" E2000016880401580370EC8A\"],\"msg\":\"success\"}";
        var c = "{\"code\":10000,\"data\":[\"E20094C6A0B48148F33C3E05\"],\"msg\":\"success\"}";
        var d = JSON.parse(c);
        if (d.code == 10000) {
            this.settingProvider.scanResult = this.format(d.data);
            if (this.settingProvider.scanResult.length == 1) {
                console.log("只有一条", this.settingProvider.scanResult[0]);
                this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__livestock_livestock__["a" /* LivestockPage */], { item: this.settingProvider.scanResult[0].code, type: "scan" });
            }
            else {
                this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__discovery_discovery__["a" /* DiscoveryPage */]);
            }
        }
        else if (d.code == 9998) {
            this.settingProvider.presentAlert(d.msg, "");
        }
        else if (d.code == 9999) {
            this.settingProvider.presentAlert(d.msg, "");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], ScanPage.prototype, "tabRef", void 0);
    ScanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-scan',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/scan/scan.html"*/'<ion-content padding>\n	  <div class="blank" ></div>\n\n  <h2>滴一下，扫描</h2>\n  <p>\n点击 “牲畜扫描” 按钮，可以开始扫描耳标。</p>\n<p>当扫描到耳标后，会有滴的一声，并自动转到标签编号选择处。</p>\n<p>请注意：尽量将你的PAD背对耳标，可有效增加扫描距离。  </p>\n  \n  <ion-row>\n  	<ion-col>\n  		<button class="balanced" ion-button block  (click)="doScan()">\n	      	牲畜扫描\n	    </button>\n  	</ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/scan/scan.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_4__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], ScanPage);
    return ScanPage;
}());

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__person_person__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scan_scan__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__farmer_farmer__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__analysis_analysis__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_setting_setting__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TabsPage = (function () {
    function TabsPage(navCtrl, events, backButtonService, platform, settingProvider, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.backButtonService = backButtonService;
        this.platform = platform;
        this.settingProvider = settingProvider;
        this.appCtrl = appCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__scan_scan__["a" /* ScanPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_5__farmer_farmer__["a" /* FarmerPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__person_person__["a" /* PersonPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_7__analysis_analysis__["a" /* AnalysisPage */];
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.listenEvents();
        console.log(this.settingProvider.loginstate);
        this.timer = setInterval(function () {
            if (_this.settingProvider.loginstate == true) {
                _this.settingProvider.getheartbeat().subscribe(function (res) {
                    if (res["code"] == 10005 && _this.settingProvider.loginstate == true) {
                        _this.settingProvider.presentAlert("登录超时、或者可能出现异地登录", '');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                        console.log("go to login");
                    }
                }, function (err) {
                });
            }
            ;
        }, this.settingProvider.heartbeat);
        console.log('界面创建');
    };
    TabsPage.prototype.ionViewWillUnload = function () {
        this.settingProvider.loginstate = false;
        this.events.unsubscribe('toLogin');
        clearTimeout(this.timer);
        console.log('界面销毁');
    };
    TabsPage.prototype.listenEvents = function () {
        var _this = this;
        this.events.subscribe('toLogin', function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
            // this.nav.pop(); 使用这种方式也可以，但是会在登录框中默认填上值
            // console.log('返回登录');
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/tabs/tabs.html"*/'<ion-tabs #myTabs>\n  <ion-tab [root]="tab1Root" tabTitle="搜索" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="扫描" tabIcon="qr-scanner"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="农户" tabIcon="ios-person-add-outline"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="统计" tabIcon="ios-podium-outline"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="我的" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_8__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_9__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersonPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chgpasswd_chgpasswd__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__email_email__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__truename_truename__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__about_about__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__certificate_certificate__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_special_special__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var PersonPage = (function () {
    function PersonPage(events, navCtrl, appCtrl, specialProvider, settingProvider, platform, backButtonService) {
        var _this = this;
        this.events = events;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.specialProvider = specialProvider;
        this.settingProvider = settingProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
    }
    /*tuch scroll event*/
    PersonPage.prototype.scrollEvent = function (e) {
        var opacity = (100 - e.scrollTop) / 100;
        this.header._elementRef.nativeElement.style.opacity = opacity * 2;
    };
    PersonPage.prototype.presentUserInfoAlert = function (user) {
        console.log(JSON.stringify(user));
    };
    PersonPage.prototype.doRefresh = function ($refresher) {
        setTimeout(function () {
            $refresher.complete();
        }, 3000);
    };
    PersonPage.prototype.doChgCertificate = function (certificate) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__certificate_certificate__["a" /* CertificatePage */]);
    };
    PersonPage.prototype.doChgEmail = function (email) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__email_email__["a" /* EmailPage */]);
    };
    PersonPage.prototype.doChgName = function (name) {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__truename_truename__["a" /* TruenamePage */]);
    };
    PersonPage.prototype.doChgPassword = function () {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__chgpasswd_chgpasswd__["a" /* ChgpasswdPage */]);
    };
    PersonPage.prototype.doAbout = function () {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__about_about__["a" /* AboutPage */]);
    };
    PersonPage.prototype.doOut = function () {
        var _this = this;
        this.specialProvider.logout().subscribe(function (res) {
            if (res["code"] == 10000) {
                _this.settingProvider.loginstate = false;
                console.log(_this.tabRef);
                _this.events.publish('toLogin');
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__login_login__["a" /* LoginPage */]);
            }
            else {
                _this.settingProvider.presentAlert(res["msg"], '');
            }
        }, function (err) {
            _this.settingProvider.dismissLoading();
            _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("header"),
        __metadata("design:type", Object)
    ], PersonPage.prototype, "header", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], PersonPage.prototype, "tabRef", void 0);
    PersonPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-person',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/person/person.html"*/'\n<ion-header>\n  <ion-navbar #header  color="primary">\n    <ion-title>个人资料</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content  (ionScroll)="scrollEvent($event)">\n  <ion-list class="ionlist" *ngIf="this.settingProvider.user">\n    <div ion-item class="personinfo" style="border-top:0px;">\n      <h2>手机号码：{{this.settingProvider.user.mobile}}</h2>\n      <p>行政区域：{{this.settingProvider.user.area.name}}</p>\n      <p *ngIf="this.settingProvider.user.area.level==5">权限角色：乡镇专管员</p>\n      <p *ngIf="this.settingProvider.user.area.level==4">权限角色：县市专管员</p>\n      <p *ngIf="this.settingProvider.user.area.level==3">权限角色：地市专管员</p>\n      <p *ngIf="this.settingProvider.user.area.level==2">权限角色：省份专管员</p>\n      <p *ngIf="this.settingProvider.user.area.level==1">权限角色：国家专管员</p>\n\n    </div>\n\n\n    <button ion-item (click)="doChgName()">\n      <text-avatar text="N" color="rgb(131, 17, 51)" item-left></text-avatar>\n      <h2>姓名</h2>\n      <p>{{this.settingProvider.user.name}}</p>\n    </button>\n\n    <button ion-item  (click)="doChgCertificate()" outline>\n      <text-avatar text="I" color="rgb(77, 186, 255)" item-left></text-avatar>\n      <h2>身份证</h2>\n      <p>{{this.settingProvider.user.cardId}}</p>\n    </button>\n\n    <!-- <button ion-item (click)="doChgEmail()">\n      <text-avatar text="E" color="rgb(255, 236, 77)" item-left></text-avatar>\n      <h2>邮箱地址</h2>\n      <p>{{this.settingProvider.user.email}}</p>\n    </button> -->\n\n    <button ion-item (click)="doChgPassword()">\n      <text-avatar text="R" color="rgb(140, 77, 255)" item-left></text-avatar>\n      <h2>修改密码</h2>\n    </button>\n\n    <button ion-item (click)="doAbout()">\n      <text-avatar text="A" color="rgb(255, 236, 77)" item-left></text-avatar>\n      <h2>关于我们</h2>\n      <p></p>\n    </button>\n\n    <button ion-item item-end (click)="doOut()">\n      <text-avatar text="Q" color="rgb(162, 255, 77)" item-left></text-avatar>\n      <h2> 注销</h2>\n    </button>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/person/person.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_9__providers_special_special__["a" /* SpecialProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], PersonPage);
    return PersonPage;
}());

//# sourceMappingURL=person.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(navCtrl, statusBar, platform, appCtrl, storage, settingProvider, backButtonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.statusBar = statusBar;
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.storage = storage;
        this.settingProvider = settingProvider;
        this.backButtonService = backButtonService;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(null);
        });
        this.statusBar.overlaysWebView(false);
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#333');
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // console.log(this.settingProvider);
        if (this.settingProvider != null) {
            if (this.settingProvider.user != null) {
                if (this.settingProvider.user.areaId > 0) {
                    this.settingProvider.getEpidemicPrevention(this.settingProvider.user.areaId).subscribe(function (res) {
                        if (res["code"] == 10000) {
                            _this.settingProvider.epidemicPrevention = res["data"];
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
            }
        }
    };
    /*搜索*/
    HomePage.prototype.doSearch = function (keyword) {
        if (keyword.value.length > 0) {
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */], { keyword: keyword.value, searchType: "homeSearch" });
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/home/home.html"*/'<ion-content padding>\n  <div class="blank" ></div>\n\n   <div class="search_logo"></div>\n\n  <ion-grid>\n  	<ion-row>\n  		<ion-col>\n  			<ion-searchbar  placeholder="按农户名称或者4位身份证尾数搜索" #keyword></ion-searchbar>\n  		</ion-col>\n  	</ion-row>\n	<ion-row>\n	    <ion-col col-6>\n	      <button class="balanced" ion-button block  (click)="doSearch(keyword)">\n	      	搜索\n	    	</button>\n	    </ion-col>\n	    <ion-col col-6>\n	    	\n	      <ion-item *ngIf="this.settingProvider.user!=null && this.settingProvider.user.area.level<5">\n			  <ion-label>区域</ion-label>\n			  <ion-multi-picker id="cities" [(ngModel)]="this.settingProvider.user.areaId" doneText="确定" cancelText="取消" item-content [multiPickerColumns]="this.settingProvider.cityColumns"></ion-multi-picker>\n			</ion-item>\n	    </ion-col>\n	</ion-row>\n\n	<ion-row style="display: none">\n		<ion-col>\n			那些你曾经搜索过的：\n		</ion-col>\n	</ion-row>\n\n\n	<ion-row style="display: none">\n		<ion-col>\n			休闲鞋\n		</ion-col>\n	</ion-row>\n\n\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_httpService__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the SettingProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SettingProvider = (function () {
    /*构造函数*/
    function SettingProvider(http, alertCtrl, loadingCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        /*******************************************
        * 全局对象定义
        ******************************************/
        /*扫描结果*/
        /*心跳间隔时间 秒*/
        this.heartbeat = 1000 * 10;
        /* 是否已经登录 */
        this.loginstate = false;
        this.keyword = "";
        /*扫描结果*/
        this.scanResult = [];
        /*是否插入牲畜*/
        this.ltockinsert = true;
        /*时间格式*/
        this.formatDate = function (time, date) {
            if (date === void 0) { date = true; }
            var Dates = new Date(time);
            var year = Dates.getFullYear();
            var month = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
            var day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
            var hours = Dates.getHours();
            var min = Dates.getMinutes();
            var seconds = Dates.getSeconds();
            var str = "";
            if (date == true) {
                str = year + '-' + month + '-' + day + " " + hours + ":" + min + ":" + seconds;
            }
            else {
                str = year + '-' + month + '-' + day;
            }
            return str;
        };
        /*农户名 临时用*/
        this.farmername = "";
        /*牲畜*/
        this.ltock = {
            code: "",
            farmId: "0",
            motherAddress: "",
            epidemicIds: "",
            slaughterAddress: "",
            slaughterRemark: "",
            saleFlow: "",
            epidemicType: "",
            epidemicProduct: "",
            epidemicBatch: "",
            healthy: 1,
            insureState: 2,
            type: "1",
            insureId: "1",
            accidentDead: "1",
            sex: "1",
            slaughterDate: this.formatDate(new Date().getTime())
        };
    }
    /******************************************
    * 公用方法
    ******************************************/
    /*显示http loading*/
    SettingProvider.prototype.presentLoading = function (title) {
        if (title === void 0) { title = "请求中，请等待..."; }
        console.log("loading  出来了");
        this.loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: title
        });
    };
    /* 隐藏http loading */
    SettingProvider.prototype.dismissLoading = function () {
        console.log("loading  消失了");
        this.loading.dismiss();
    };
    /* 弹出框 */
    SettingProvider.prototype.presentAlert = function (msg, title, buttons) {
        if (buttons === void 0) { buttons = [{ text: title == '' ? '确定' : title }]; }
        var alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            cssClass: 'alert-ios',
            buttons: buttons,
            enableBackdropDismiss: true
        });
        alert.present();
        return alert;
    };
    /* 获取行政区域 */
    SettingProvider.prototype.getEpidemicPrevention = function (areaid) {
        return this.http.get("app/specialManager/epidemicPrevention/queryByArea/" + areaid, {});
    };
    /* heartbeat */
    SettingProvider.prototype.getheartbeat = function () {
        return this.http.get("heartbeat/special_manager", {});
    };
    SettingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_httpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], SettingProvider);
    return SettingProvider;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/about/about.html"*/'<!--\n  Generated template for the AboutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n   <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n	  <button ion-button navPop>\n	        <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>关于</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-list class="ionlist">\n  	 <ion-item>\n      <h2>公司全称</h2>\n      <p>武汉食安溯源科技有限公司</p>\n    </ion-item>\n  \n  	 <ion-item>\n      <h2>电话</h2>\n      <p>027-83736399</p>\n    </ion-item>\n\n  	 <ion-item>\n      <h2>邮箱</h2>\n      <p>王老板@下周给.com</p>\n    </ion-item>\n  	 <ion-item>\n      <h2>软件版本</h2>\n      <p>v1.0.0 <span style="padding-left: 30px"> 2018-03-31 </span></p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalysisPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnalysisPage = (function () {
    function AnalysisPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AnalysisPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnalysisPage');
    };
    AnalysisPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-analysis',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/analysis/analysis.html"*/'<!--\n  Generated template for the AnalysisPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n  <ion-navbar   color="primary">\n    <ion-title>数据统计</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/analysis/analysis.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]])
    ], AnalysisPage);
    return AnalysisPage;
}());

//# sourceMappingURL=analysis.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CertificatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_special_special__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_backButton__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CertificatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CertificatePage = (function () {
    function CertificatePage(navCtrl, navParams, settingProvider, specialProvider, platform, backButtonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.specialProvider = specialProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        this.cardId = "";
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        this.cardId = this.settingProvider.user.cardId;
    }
    /*编辑身份证*/
    CertificatePage.prototype.editcardid = function () {
        var _this = this;
        if (this.cardId == "") {
            this.settingProvider.presentAlert("请输入正确的身份证号", '');
        }
        else {
            this.specialProvider.doChangeCertificate(this.cardId).subscribe(function (res) {
                if (res["code"] == 10000) {
                    _this.settingProvider.user.cardId = _this.cardId;
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
                else {
                    console.log("user", _this.settingProvider.user);
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], CertificatePage.prototype, "tabRef", void 0);
    CertificatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-certificate',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/certificate/certificate.html"*/'<!--\n  Generated template for the CertificatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n          <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>身份证</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n    <div class="blank"></div>\n    <ion-item class="item">\n      <ion-label fixed>身份证</ion-label>\n      <ion-input type="text" [(ngModel)]="cardId" placeholder="请输入二代身份证"></ion-input>\n    </ion-item>\n    <div class="blank"></div>\n  <div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n    <button class="balanced" (click)="editcardid()" ion-button block >\n      确定\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/certificate/certificate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_special_special__["a" /* SpecialProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_4__services_backButton__["a" /* BackButtonService */]])
    ], CertificatePage);
    return CertificatePage;
}());

//# sourceMappingURL=certificate.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChgpasswdPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_special_special__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChgpasswdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChgpasswdPage = (function () {
    function ChgpasswdPage(navCtrl, navParams, specialProvider, settingProvider, platform, backButtonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.specialProvider = specialProvider;
        this.settingProvider = settingProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
    }
    /*修改密码*/
    ChgpasswdPage.prototype.changepassword = function (oldPassword, password, confirmPassword) {
        var _this = this;
        if (oldPassword.value.length == 0) {
            this.settingProvider.presentAlert("请输入旧密码", '');
        }
        else if (password.value.length == 0 || confirmPassword.value.length == 0) {
            this.settingProvider.presentAlert("请输入新密码", '');
        }
        else if (password.value != confirmPassword.value) {
            this.settingProvider.presentAlert("密码不一致", '');
        }
        else {
            this.specialProvider.doChangePass(oldPassword.value, password.value, confirmPassword.value).subscribe(function (res) {
                if (res["code"] == 10000) {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
                else {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], ChgpasswdPage.prototype, "tabRef", void 0);
    ChgpasswdPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chgpasswd',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/chgpasswd/chgpasswd.html"*/'\n<ion-header no-border>\n\n   <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n          <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>修改密码</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n	<div class="blank"></div>\n    <ion-item class="item">\n      <ion-label fixed>旧密码</ion-label>\n      <ion-input type="password" required placeholder="请输入旧密码" #oldPassword></ion-input>\n    </ion-item>\n    <ion-item class="item">\n      <ion-label fixed>新密码</ion-label>\n      <ion-input type="password" required placeholder="请输入密码" #password></ion-input>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed>确认密码</ion-label>\n      <ion-input type="password" required placeholder="请输入确认密码" #confirmPassword></ion-input>\n    </ion-item>\n    <div class="blank"></div>\n  <div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n    <button class="balanced" ion-button block  (click)="changepassword(oldPassword, password,confirmPassword)">\n      确定\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/chgpasswd/chgpasswd.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__providers_special_special__["a" /* SpecialProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], ChgpasswdPage);
    return ChgpasswdPage;
}());

//# sourceMappingURL=chgpasswd.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__farmer_farmer__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapPage = (function () {
    function MapPage(navCtrl, navParams, settingProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.address = "";
        this.add = false;
        this.backButtonClick = function (e) {
            _this.navCtrl.pop();
        };
        if (navParams.data.action == "location") {
            this.add = true;
        }
        else {
            this.add = false;
        }
    }
    MapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.settingProvider.presentLoading("定位中，请稍侯...");
        this.settingProvider.loading.present();
        var map = new BMap.Map(this.mapElement.nativeElement, {
            enableMapClick: true
        }); //创建地图实例
        map.enableScrollWheelZoom(); //启动滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); //连续缩放效果，默认禁用
        var point = new BMap.Point(116.331398, 39.897445); //坐标可以通过百度地图坐标拾取器获取
        map.centerAndZoom(point, 16); //设置中心和地图显示级别
        var ac = new BMap.Autocomplete(//建立一个自动完成的对象
        { "input": "suggestId",
            "location": map
        });
        ac.addEventListener("onhighlight", function (e) {
            console.log(_this);
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            document.getElementById("searchResultPanel").innerHTML = str;
        });
        var myValue;
        ac.addEventListener("onconfirm", function (e) {
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            document.getElementById("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            _this.setPlace(map, myValue);
        });
        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: 0,
            // LARGE类型
            type: 0,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
        var geolocation = new BMap.Geolocation();
        var _geo = geolocation.getCurrentPosition(function (r) {
            //if(_geo.getStatus() == 0){
            var mk = new BMap.Marker(r.point);
            mk.setAnimation(2); //跳动的动画
            map.addOverlay(mk);
            map.panTo(r.point);
            _this.theLocation(map, r.point.lng, r.point.lat);
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(r.point, function (rs) {
                var addComp = rs.addressComponents;
                _this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                _this.settingProvider.dismissLoading();
            });
            //}
            //else {
            //    this.settingProvider.presentAlert("当前可能GPS定位信号弱，无法定位",'');
            //}        
        }, { enableHighAccuracy: true });
    };
    // 用经纬度设置地图中心点
    MapPage.prototype.theLocation = function (map, longitude, latitude) {
        if (longitude != "" && latitude != "") {
            map.clearOverlays();
            var new_point = new BMap.Point(longitude, latitude);
            var marker = new BMap.Marker(new_point); // 创建标注
            marker.setAnimation(2); //跳动的动画
            console.log(new_point);
            map.addOverlay(marker); // 将标注添加到地图中
            map.panTo(new_point);
            console.log(map);
        }
    };
    MapPage.prototype.setPlace = function (map, myValue) {
        map.clearOverlays(); //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            var mk = new BMap.Marker(pp);
            mk.setAnimation(2); //跳动的动画
            map.addOverlay(mk); //添加标注
        }
        var local = new BMap.LocalSearch(map, {
            onSearchComplete: myFun
        });
        this.address = myValue;
        local.search(myValue);
    };
    MapPage.prototype.addAddress = function (address) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__farmer_farmer__["a" /* FarmerPage */], { address: address, type: "baidu" });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('bdmap'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MapPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('suggestId'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MapPage.prototype, "sugElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/map/map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-toolbar color="primary">\n    <ion-buttons start>\n      <button ion-button (click)="backButtonClick()" icon-only style="padding-right:10px;">\n        关闭地图\n      </button>\n    </ion-buttons>\n\n    <ion-title>地图信息</ion-title>\n    <ion-buttons end>\n      <button ion-button *ngIf="add==false" icon-only color="secondary">\n        百度地图导航\n      </button>\n      <button ion-button *ngIf="add" icon-only (click)="addAddress(address)" color="secondary">\n        添加地址\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n      <div id="r-result">\n      	<input type="text" class="text-input text-input-md" #suggestId [(ngModel)]="address" id="suggestId" placeholder="请输入养殖场地址" />\n\n      </div>\n      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:100%;height:auto; display:none;"></div>\n      <div id="bdmap" style="width: 100%;height: 100%" #bdmap></div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__["a" /* SettingProvider */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_special_special__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EmailPage = (function () {
    function EmailPage(navCtrl, navParams, settingProvider, specialProvider, platform, backButtonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.specialProvider = specialProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        this.email = "";
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        this.email = this.settingProvider.user.email;
    }
    EmailPage.prototype.editemail = function () {
        var _this = this;
        if (this.email == "") {
            this.settingProvider.presentAlert("请输入正确的邮箱地址", '');
        }
        else {
            this.specialProvider.doChangeEmail(this.email).subscribe(function (res) {
                if (res["code"] == 10000) {
                    _this.settingProvider.user.email = _this.email;
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
                else {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], EmailPage.prototype, "tabRef", void 0);
    EmailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-email',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/email/email.html"*/'<!--\n  Generated template for the EmailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n \n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n          <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>邮箱</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n<div class="blank"></div>\n    <ion-item class="item">\n      <ion-label fixed>邮箱</ion-label>\n      <ion-input type="email" [(ngModel)]="email" placeholder="请输入邮箱"></ion-input>\n    </ion-item>\n    <div class="blank"></div>\n  <div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n    <button class="balanced" (click)="editemail()" ion-button block >\n      确定\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/email/email.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_special_special__["a" /* SpecialProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], EmailPage);
    return EmailPage;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TruenamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_special_special__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the TruenamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TruenamePage = (function () {
    function TruenamePage(navCtrl, navParams, settingProvider, specialProvider, platform, backButtonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.specialProvider = specialProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        this.name = "";
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        this.name = this.settingProvider.user.name;
    }
    TruenamePage.prototype.editname = function () {
        var _this = this;
        if (this.name == "") {
            this.settingProvider.presentAlert("请输入名称", '');
        }
        else {
            this.specialProvider.doChangeName(this.name).subscribe(function (res) {
                if (res["code"] == 10000) {
                    _this.settingProvider.user.name = _this.name;
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
                else {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], TruenamePage.prototype, "tabRef", void 0);
    TruenamePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-truename',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/truename/truename.html"*/'<!--\n  Generated template for the EmailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n          <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>名称</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n<div class="blank"></div>\n    <ion-item class="item">\n      <ion-label fixed>名称</ion-label>\n      <ion-input type="text" [(ngModel)]="name" placeholder="请输入名称"></ion-input>\n    </ion-item>\n    <div class="blank"></div>\n  <div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n    <button class="balanced" (click)="editname()" ion-button block >\n      确定\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/truename/truename.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_special_special__["a" /* SpecialProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], TruenamePage);
    return TruenamePage;
}());

//# sourceMappingURL=truename.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_farmer_farmer__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StatsPage = (function () {
    function StatsPage(navCtrl, navParams, platform, backButtonService, settingProvider, farmerProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.backButtonService = backButtonService;
        this.settingProvider = settingProvider;
        this.farmerProvider = farmerProvider;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
    }
    StatsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        new Promise(function (fulfill, reject) {
            _this.getFarmerAreaStats();
            _this.getFarmerStats();
            try {
                fulfill("success");
            }
            catch (error) {
                reject("fail");
            }
        });
    };
    StatsPage.prototype.getFarmerStats = function () {
        var _this = this;
        this.farmerProvider.getStatsFarmer("areaId=" + this.settingProvider.user.areaId).subscribe(function (res) {
            if (res["code"] == 10000) {
                _this.statser = res["data"]["details"];
            }
            else {
                _this.settingProvider.presentAlert(res["msg"], "");
            }
        }, function (err) {
            _this.settingProvider.dismissLoading();
            _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
        });
    };
    StatsPage.prototype.getFarmerAreaStats = function () {
        var _this = this;
        this.farmerProvider.getStatsAreaFarmer("areaId=" + this.settingProvider.user.areaId).subscribe(function (res) {
            if (res["code"] == 10000) {
                _this.area = res["data"];
                console.log(_this.area);
            }
        }, function (err) {
            _this.settingProvider.dismissLoading();
            _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
        });
    };
    /*自定义返回键*/
    StatsPage.prototype.goBack = function () {
        this.navCtrl.pop(); // remember to put this to add the back button behavior
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], StatsPage.prototype, "tabRef", void 0);
    StatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stats',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/stats/stats.html"*/'<!--\n  Generated template for the StatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n          <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>信息统计</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content padding>\n <ion-list>\n\n    <ion-list-header>\n      农户统计数据\n      <ion-icon item-end name="md-stats" color="primary"></ion-icon>\n    </ion-list-header>\n\n    <ion-item>\n      农户数\n      <ion-note item-end>\n        {{area}}\n      </ion-note>\n    </ion-item>\n\n\n\n    <div class="blank"></div>\n\n    <ion-list-header>\n      牲畜统计数据\n      <ion-icon item-end name="md-stats" color="primary"></ion-icon>\n    </ion-list-header>\n\n    <ion-item *ngFor="let nc of statser">\n      {{nc.typeStr}}\n      <ion-note style="padding-left: 41%;">\n       {{ nc.sexStr }}\n      </ion-note>\n      <ion-note item-end>\n       {{ nc.count }}\n      </ion-note>\n    </ion-item>\n\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/stats/stats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_farmer_farmer__["a" /* FarmerProvider */]])
    ], StatsPage);
    return StatsPage;
}());

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ 188:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 188;

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackButtonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackButtonService = (function () {
    //构造函数 依赖注入
    function BackButtonService(platform, appCtrl, toastCtrl) {
        this.platform = platform;
        this.appCtrl = appCtrl;
        this.toastCtrl = toastCtrl;
        //控制硬件返回按钮是否触发，默认false
        this.backButtonPressed = false;
    }
    //注册方法
    BackButtonService.prototype.registerBackButtonAction = function (tabRef) {
        var _this = this;
        //registerBackButtonAction是系统自带的方法
        this.platform.registerBackButtonAction(function () {
            //获取NavController
            var activeNav = _this.appCtrl.getActiveNav();
            //如果可以返回上一页，则执行pop
            if (activeNav.canGoBack()) {
                activeNav.pop();
            }
            else {
                if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
                    //执行退出
                    _this.showExit();
                }
                else {
                    //选择首页第一个的标签
                    tabRef.select(0);
                }
            }
        });
    };
    //退出应用方法
    BackButtonService.prototype.showExit = function () {
        var _this = this;
        //如果为true，退出
        if (this.backButtonPressed) {
            this.platform.exitApp();
        }
        else {
            //第一次按，弹出Toast
            this.toastCtrl.create({
                message: '再按一次退出应用',
                duration: 2000,
                position: 'top'
            }).present();
            //标记为true
            this.backButtonPressed = true;
            //两秒后标记为false，如果退出的话，就不会执行了
            setTimeout(function () { return _this.backButtonPressed = false; }, 2000);
        }
    };
    BackButtonService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
    ], BackButtonService);
    return BackButtonService;
}());

//# sourceMappingURL=backButton.js.map

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		710,
		12
	],
	"../pages/analysis/analysis.module": [
		711,
		11
	],
	"../pages/certificate/certificate.module": [
		712,
		10
	],
	"../pages/chgpasswd/chgpasswd.module": [
		713,
		9
	],
	"../pages/discovery/discovery.module": [
		714,
		8
	],
	"../pages/email/email.module": [
		715,
		7
	],
	"../pages/farmer/farmer.module": [
		716,
		6
	],
	"../pages/livestock/livestock.module": [
		717,
		5
	],
	"../pages/login/login.module": [
		718,
		4
	],
	"../pages/map/map.module": [
		719,
		3
	],
	"../pages/search/search.module": [
		720,
		2
	],
	"../pages/stats/stats.module": [
		722,
		1
	],
	"../pages/truename/truename.module": [
		721,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 234;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LivestockProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpService__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
 * 牲畜provider
*/
var LivestockProvider = (function () {
    /*构造*/
    function LivestockProvider(http, settingProvider) {
        this.http = http;
        this.settingProvider = settingProvider;
    }
    /*添加牲畜*/
    LivestockProvider.prototype.doAddLivestock = function (data) {
        return this.http.post("app/specialManager/livestock/add", data);
    };
    /*编辑牲畜*/
    LivestockProvider.prototype.doEditLivestock = function (data) {
        return this.http.post("app/specialManager/livestock/update", data);
    };
    /*搜索牲畜*/
    LivestockProvider.prototype.doSearchLivestock = function (keyword) {
        return this.http.get("app/specialManager/livestock/query?areaId=" + this.settingProvider.user.areaId + "&code=" + keyword, {});
    };
    LivestockProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_httpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__["a" /* SettingProvider */]])
    ], LivestockProvider);
    return LivestockProvider;
}());

//# sourceMappingURL=livestock.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MTabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__person_person__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stats_stats__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_setting_setting__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MTabsPage = (function () {
    function MTabsPage(navCtrl, events, backButtonService, platform, settingProvider, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.backButtonService = backButtonService;
        this.platform = platform;
        this.settingProvider = settingProvider;
        this.appCtrl = appCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__stats_stats__["a" /* StatsPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_2__person_person__["a" /* PersonPage */];
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        this.timer = setInterval(function () {
            if (_this.settingProvider.loginstate == true) {
                _this.settingProvider.getheartbeat().subscribe(function (res) {
                    if (res["code"] == 10005) {
                        _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                        console.log("go to login");
                    }
                }, function (err) {
                });
            }
            ;
        }, this.settingProvider.heartbeat);
    }
    MTabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.listenEvents();
        console.log(this.settingProvider.loginstate);
        this.timer = setInterval(function () {
            if (_this.settingProvider.loginstate == true) {
                _this.settingProvider.getheartbeat().subscribe(function (res) {
                    if (res["code"] == 10005 && _this.settingProvider.loginstate == true) {
                        _this.settingProvider.presentAlert("登录超时、或者可能出现异地登录", '');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                        console.log("go to login");
                    }
                }, function (err) {
                });
            }
            ;
        }, this.settingProvider.heartbeat);
        console.log('界面创建');
    };
    MTabsPage.prototype.ionViewWillUnload = function () {
        this.settingProvider.loginstate = false;
        this.events.unsubscribe('toLogin');
        clearTimeout(this.timer);
        console.log('界面销毁');
    };
    MTabsPage.prototype.listenEvents = function () {
        var _this = this;
        this.events.subscribe('toLogin', function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
            // this.nav.pop(); 使用这种方式也可以，但是会在登录框中默认填上值
            // console.log('返回登录');
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], MTabsPage.prototype, "tabRef", void 0);
    MTabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/tabs/mtabs.html"*/'<ion-tabs #myTabs>\n  <ion-tab [root]="tab1Root" tabTitle="搜索" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="统计" tabIcon="ios-podium-outline"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="我的" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/tabs/mtabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_6__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_7__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], MTabsPage);
    return MTabsPage;
}());

//# sourceMappingURL=mtabs.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(380);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_text_avatar_text_avatar__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_valid_valid__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_httpService__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__my_http_interceptor__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_scan_scan__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_person_person__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_home_home__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_discovery_discovery__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_tabs_mtabs__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_map_map__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_about_about__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_stats_stats__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_chgpasswd_chgpasswd__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_email_email__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_truename_truename__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_certificate_certificate__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_farmer_farmer__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_search_search__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_analysis_analysis__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ion_multi_picker__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ion_multi_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_31_ion_multi_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_livestock_livestock__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_camera__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_special_special__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_farmer_farmer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_livestock_livestock__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_scan_scan__["a" /* ScanPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_person_person__["a" /* PersonPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */], __WEBPACK_IMPORTED_MODULE_19__pages_tabs_mtabs__["a" /* MTabsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_chgpasswd_chgpasswd__["a" /* ChgpasswdPage */], __WEBPACK_IMPORTED_MODULE_26__pages_truename_truename__["a" /* TruenamePage */], __WEBPACK_IMPORTED_MODULE_20__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_certificate_certificate__["a" /* CertificatePage */], __WEBPACK_IMPORTED_MODULE_21__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_email_email__["a" /* EmailPage */], __WEBPACK_IMPORTED_MODULE_28__pages_farmer_farmer__["a" /* FarmerPage */], __WEBPACK_IMPORTED_MODULE_17__pages_discovery_discovery__["a" /* DiscoveryPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_search_search__["a" /* SearchPage */], __WEBPACK_IMPORTED_MODULE_32__pages_livestock_livestock__["a" /* LivestockPage */], __WEBPACK_IMPORTED_MODULE_22__pages_stats_stats__["a" /* StatsPage */],
                __WEBPACK_IMPORTED_MODULE_8__directives_text_avatar_text_avatar__["a" /* TextAvatarDirective */], __WEBPACK_IMPORTED_MODULE_9__directives_valid_valid__["a" /* ValidDirective */], __WEBPACK_IMPORTED_MODULE_30__pages_analysis_analysis__["a" /* AnalysisPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/analysis/analysis.module#AnalysisPageModule', name: 'AnalysisPage', segment: 'analysis', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/certificate/certificate.module#CertificatePageModule', name: 'CertificatePage', segment: 'certificate', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chgpasswd/chgpasswd.module#ChgpasswdPageModule', name: 'ChgpasswdPage', segment: 'chgpasswd', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/discovery/discovery.module#DiscoveryPageModule', name: 'DiscoveryPage', segment: 'discovery', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/email/email.module#EmailPageModule', name: 'EmailPage', segment: 'email', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/farmer/farmer.module#FarmerPageModule', name: 'FarmerPage', segment: 'farmer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/livestock/livestock.module#LivestockPageModule', name: 'LivestockPage', segment: 'livestock', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/truename/truename.module#TruenamePageModule', name: 'TruenamePage', segment: 'truename', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stats/stats.module#StatsPageModule', name: 'StatsPage', segment: 'stats', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__mytrace',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                }),
                __WEBPACK_IMPORTED_MODULE_31_ion_multi_picker__["MultiPickerModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_14__pages_scan_scan__["a" /* ScanPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_chgpasswd_chgpasswd__["a" /* ChgpasswdPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_certificate_certificate__["a" /* CertificatePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_email_email__["a" /* EmailPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_farmer_farmer__["a" /* FarmerPage */], __WEBPACK_IMPORTED_MODULE_30__pages_analysis_analysis__["a" /* AnalysisPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_livestock_livestock__["a" /* LivestockPage */], __WEBPACK_IMPORTED_MODULE_22__pages_stats_stats__["a" /* StatsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_person_person__["a" /* PersonPage */], __WEBPACK_IMPORTED_MODULE_26__pages_truename_truename__["a" /* TruenamePage */], __WEBPACK_IMPORTED_MODULE_20__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_21__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_tabs_tabs__["a" /* TabsPage */], __WEBPACK_IMPORTED_MODULE_19__pages_tabs_mtabs__["a" /* MTabsPage */], __WEBPACK_IMPORTED_MODULE_17__pages_discovery_discovery__["a" /* DiscoveryPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_12__my_http_interceptor__["a" /* MyHttpInterceptor */],
                    multi: true
                },
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_10__services_httpService__["a" /* HttpService */],
                __WEBPACK_IMPORTED_MODULE_34__providers_special_special__["a" /* SpecialProvider */],
                __WEBPACK_IMPORTED_MODULE_35__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_33__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_36__providers_farmer_farmer__["a" /* FarmerProvider */],
                __WEBPACK_IMPORTED_MODULE_37__providers_livestock_livestock__["a" /* LivestockProvider */], __WEBPACK_IMPORTED_MODULE_13__services_backButton__["a" /* BackButtonService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecialProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpService__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
 * 专管员provider
 * 包含个人中心资料修改，登录，退出
*/
var SpecialProvider = (function () {
    /*构造*/
    function SpecialProvider(http) {
        this.http = http;
    }
    /*登录*/
    SpecialProvider.prototype.doLogin = function (username, password) {
        var param = { "mobile": username, "password": password };
        return this.http.post("app/specialManager/login", param);
    };
    /*修改身份证*/
    SpecialProvider.prototype.doChangeCertificate = function (cardid) {
        var param = { "cardId": cardid };
        return this.http.post("app/specialManager/update", param);
    };
    /*修改密码*/
    SpecialProvider.prototype.doChangePass = function (oldPassword, password, confirmPassword) {
        var param = { "password": password, "oldPassword": oldPassword, "confirmPassword": confirmPassword };
        console.log(param);
        return this.http.post("app/specialManager/updatePassword", param);
    };
    /*Email*/
    SpecialProvider.prototype.doChangeEmail = function (email) {
        var param = { "email": email };
        return this.http.post("app/specialManager/update", param);
    };
    /*修改名称*/
    SpecialProvider.prototype.doChangeName = function (name) {
        var param = { "name": name };
        return this.http.post("app/specialManager/update", param);
    };
    /*注销*/
    SpecialProvider.prototype.logout = function () {
        return this.http.get("app/specialManager/logout", {});
    };
    SpecialProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_httpService__["a" /* HttpService */]])
    ], SpecialProvider);
    return SpecialProvider;
}());

//# sourceMappingURL=special.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_mtabs__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_special_special__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_backButton__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the LoginPage page.
 *
 *带逗号字符 转 数组
 *let b:string = "E20094C6A0B48148F33C3E05,E2000016880401580370EC8A";
 *let a:any = Array(b.split(','));
 *console.log(a[1]);
 *json转数组
 *let c:string= "{\"code\":1000,\"data\":[\"E20094C6A0B48148F33C3E05\",\" E2000016880401580370EC8A\"],\"msg\":\"success\"}";
 *let d:any = JSON.parse(c);
 *console.log(d.code);
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, loadingCtrl, specialProvider, storage, settingProvider, backButtonService, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.specialProvider = specialProvider;
        this.storage = storage;
        this.settingProvider = settingProvider;
        this.backButtonService = backButtonService;
        this.platform = platform;
        /* 是否记住密码 */
        this.remember = true;
        this.username = "";
        this.password = "";
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(null);
        });
        this.storage.get("remember").then(function (val) {
            if (val != null && val.mobile != "" && val.password != "") {
                _this.username = val.mobile;
                _this.password = val.password;
            }
        });
    }
    /*登录*/
    LoginPage.prototype.logIn = function () {
        var _this = this;
        if (this.username.length == 0) {
            this.settingProvider.presentAlert("请输入手机号", '');
        }
        else if (this.password.length == 0) {
            this.settingProvider.presentAlert("请输入密码", '');
        }
        else {
            this.specialProvider.doLogin(this.username, this.password).subscribe(function (res) {
                if (res["code"] == 10000) {
                    _this.storage.set("user", res["data"]);
                    _this.settingProvider.loginstate = true;
                    if (_this.remember) {
                        _this.storage.set("remember", { "mobile": _this.username, "password": _this.password });
                    }
                    else {
                        _this.storage.set("remember", { "mobile": "", "password": "" });
                    }
                    _this.settingProvider.user = res["data"];
                    _this.settingProvider.cityColumns = res["data"]["areaResult"];
                    _this.storage.set("cityColumns", _this.settingProvider.cityColumns);
                    if (_this.settingProvider.user.area.level < 5) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_mtabs__["a" /* MTabsPage */]);
                    }
                    else {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                    }
                }
                else {
                    _this.settingProvider.loginstate = false;
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>牲畜养殖溯源管理平台</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="blank"></div>\n    <ion-item class="item">\n      <ion-label fixed>手机</ion-label>\n      <ion-input type="text" ngModel valid pattern="1[0-9]{10}"  placeholder="请输入手机号" [(ngModel)]="username"></ion-input>\n    </ion-item>\n    <ion-item class="item">\n      <ion-label fixed>密码</ion-label>\n      <ion-input type="password" ngModel valid placeholder="请输入密码" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  <ion-item no-lines>\n    <label item-right>记住密码</label>\n    <ion-toggle [(ngModel)]="remember"></ion-toggle>\n  </ion-item>\n  <div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n    <button class="balanced" ion-button block  (click)="logIn()">\n      登录\n    </button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_5__providers_special_special__["a" /* SpecialProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_6__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_7__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
  httpClient 简单封装类
  * by ivan
  ,
  "proxies": [
    {
      "path": "/app",
      "proxyUrl": "http://47.96.48.160/app"
    },
    {
      "path": "/heartbeat",
      "proxyUrl": "http://47.96.48.160/heartbeat"
    }
  ]
  * 369191991@qq.com
**/
var HttpService = (function () {
    /*构造函数 依赖注入*/
    function HttpService(http) {
        this.http = http;
        this.access_token = "";
        /*服务器通讯地址*/
        this.apiUrl = "http://47.96.48.160";
        this.httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpHeaders */]({
                'Content-Type': 'application/json',
            })
        };
        console.log("Module Http Service");
    }
    /*get 请求*/
    HttpService.prototype.get = function (endpoint, params) {
        return this.http.get(this.apiUrl + '/' + endpoint, this.encodeHttpParams(params));
    };
    /*post请求*/
    HttpService.prototype.post = function (endpoint, params) {
        return this.http.post(this.apiUrl + '/' + endpoint, this.encodeHttpParams(params));
    };
    HttpService.prototype.encodeHttpParams = function (params) {
        if (!params)
            return null;
        return params;
    };
    HttpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]])
    ], HttpService);
    return HttpService;
}());

//# sourceMappingURL=httpService.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LivestockPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_livestock_livestock__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__discovery_discovery__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scan_scan__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the LivestockPage page.
 *import citise from '../../assets/cities.json';
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LivestockPage = (function () {
    function LivestockPage(appCtrl, navCtrl, navParams, settingProvider, livestockProvider, camera, backButtonService, platform) {
        var _this = this;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.livestockProvider = livestockProvider;
        this.camera = camera;
        this.backButtonService = backButtonService;
        this.platform = platform;
        this.isScan = false;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        //录入时选择的农户
        if (navParams.data.item != null && navParams.data.type == "farmerSearch") {
            console.log("选择了", navParams.data.item);
            this.settingProvider.ltock.farmId = navParams.data.item.id + "";
            this.settingProvider.farmername = navParams.data.item.name;
            console.log("当前的牲畜数据是", this.settingProvider.ltock);
        }
        //选择扫描结果
        if (navParams.data.type == "scan") {
            console.log("选择扫描结果", navParams.data.item);
            this.settingProvider.ltock.code = navParams.data.item;
            this.livestockProvider.doSearchLivestock(this.settingProvider.ltock.code).subscribe(function (res) {
                var stock = res["data"];
                console.log(stock);
                if (stock == null) {
                    console.log(1);
                    _this.settingProvider.farmername = "";
                    _this.clearLtock();
                    _this.settingProvider.ltockinsert = true;
                }
                else {
                    console.log(2);
                    console.log("牲畜查询", stock, _this.settingProvider.farmername);
                    stock.slaughterDate = _this.settingProvider.formatDate(new Date(_this.settingProvider.ltock.slaughterDate), false);
                    console.log("stock", stock);
                    _this.settingProvider.ltock = stock;
                    _this.settingProvider.ltockinsert = false;
                }
                console.log("扫描后的牲畜数据是", _this.settingProvider.ltock);
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    }
    //搜索农户
    LivestockPage.prototype.doSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */], { keyword: this.settingProvider.keyword, searchType: "farmerSearch" });
    };
    /*清空对象*/
    LivestockPage.prototype.clearLtock = function () {
        var code = this.settingProvider.ltock.code;
        this.settingProvider.ltock = {
            code: "",
            farmId: "0",
            motherAddress: "",
            epidemicIds: "",
            slaughterAddress: "",
            slaughterRemark: "",
            saleFlow: "",
            epidemicType: "",
            epidemicProduct: "",
            epidemicBatch: "",
            healthy: 1,
            insureState: 2,
            type: "1",
            insureId: "",
            accidentDead: "1", sex: "1",
            slaughterDate: this.settingProvider.formatDate(new Date().getTime())
        };
        this.settingProvider.ltock.code = code;
    };
    /*新增牲畜*/
    LivestockPage.prototype.doAdd = function () {
        var _this = this;
        if (this.settingProvider.ltock.code == "") {
            this.settingProvider.presentAlert("牲畜编号不能为空", '');
        }
        else if (this.settingProvider.farmername == "") {
            this.settingProvider.presentAlert("请输入农户", '');
        }
        else if (this.settingProvider.ltock.motherAddress == "") {
            this.settingProvider.presentAlert("请输入母体来源", '');
        }
        else if (this.settingProvider.ltock.slaughterDate == "") {
            this.settingProvider.presentAlert("请输入出生时间", '');
        }
        else if (this.settingProvider.ltock.sex == "") {
            this.settingProvider.presentAlert("请输入性别", '');
        }
        else if (this.settingProvider.ltock.healthy == "") {
            this.settingProvider.presentAlert("请输入健康状态", '');
        }
        else if (this.settingProvider.ltock.type == "") {
            this.settingProvider.presentAlert("请输入种类", '');
        }
        else {
            this.settingProvider.ltock.epidemicIds = this.settingProvider.ltock.epidemicIds.toString();
            this.settingProvider.ltock.slaughterDate = this.settingProvider.ltock.slaughterDate + ' 00:00:00';
            console.log(this.settingProvider.ltock);
            //delete this.settingProvider.ltock["farmer"];
            this.livestockProvider.doAddLivestock(this.settingProvider.ltock).subscribe(function (res) {
                if (res["code"] == 10000) {
                    console.log("更改扫描结果的记录信息");
                    _this.changeState(_this.settingProvider.ltock.code);
                    _this.settingProvider.presentAlert("新增成功", '');
                    if (_this.countState() > 0)
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__discovery_discovery__["a" /* DiscoveryPage */], { data: _this.settingProvider.scanResult });
                    else
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__scan_scan__["a" /* ScanPage */]);
                }
                else {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    /*修改牲畜*/
    LivestockPage.prototype.doEdit = function () {
        var _this = this;
        this.settingProvider.ltock.epidemicIds = this.settingProvider.ltock.epidemicIds.toString();
        this.settingProvider.ltock.slaughterDate = this.settingProvider.ltock.slaughterDate + ' 00:00:00';
        console.log(this.settingProvider.ltock);
        //delete this.settingProvider.ltock["farmer"];
        this.livestockProvider.doEditLivestock(this.settingProvider.ltock).subscribe(function (res) {
            if (res["code"] == 10000) {
                console.log("更改扫描结果的记录信息");
                _this.changeState(_this.settingProvider.ltock.code);
                _this.settingProvider.presentAlert("修改成功", '');
                if (_this.countState() > 0)
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__discovery_discovery__["a" /* DiscoveryPage */], { data: _this.settingProvider.scanResult });
                else
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__scan_scan__["a" /* ScanPage */]);
            }
            else {
                _this.settingProvider.presentAlert(res["msg"], '');
            }
        }, function (err) {
            _this.settingProvider.dismissLoading();
            _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
        });
    };
    LivestockPage.prototype.doScan = function () {
        var _this = this;
        var options = {
            quality: 99,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        alert("你按了保险标");
        this.camera.getPicture(options).then(function (res) {
            //json转数组
            var c = res;
            var d = JSON.parse(c);
            if (d.code == 10000) {
                _this.settingProvider.ltock.insureId = _this.format(d.data);
            }
            else if (d.code == 9998) {
                _this.settingProvider.presentAlert(d.msg, "");
            }
            else if (d.code == 9999) {
                _this.settingProvider.presentAlert(d.msg, "");
            }
        }, function (err) {
        });
    };
    LivestockPage.prototype.format = function (rows) {
        if (rows.length == 1) {
            return rows[0];
        }
        else {
            return "";
        }
    };
    LivestockPage.prototype.changeState = function (row) {
        for (var i = 0; i < this.settingProvider.scanResult.length; i++) {
            console.log(this.settingProvider.scanResult[i].code);
            console.log(row);
            if (this.settingProvider.scanResult[i].code.trim() == row.trim()) {
                console.log("已操作", row);
                this.settingProvider.scanResult[i].msg = "已操作";
            }
        }
    };
    LivestockPage.prototype.countState = function () {
        var count = this.settingProvider.scanResult.length;
        for (var i = 0; i < this.settingProvider.scanResult.length; i++) {
            if (this.settingProvider.scanResult[i].msg == "已操作") {
                count = count - 1;
            }
        }
        return count;
    };
    /*自定义返回键*/
    LivestockPage.prototype.goBack = function () {
        console.log(this.appCtrl.getRootNav().root);
        //t.select(2);
        //this.tabRef.select(2);
        // this.appCtrl.getRootNav().select(2);
        this.navCtrl.setRoot(this.appCtrl.getRootNav().root);
        //this.navCtrl.push(TabPage);  // remember to put this to add the back button behavior
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], LivestockPage.prototype, "tabRef", void 0);
    LivestockPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-livestock',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/livestock/livestock.html"*/'<!--\n  Generated template for the CertificatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border>\n\n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button (click)="goBack()">\n        <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>牲畜信息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n    <ion-list>\n\n    <ion-item class="item" style="border-top:0px;">\n      <ion-label fixed> * 牲畜编号</ion-label>\n      <ion-input type="text" required placeholder="请输入牲畜编号" [(ngModel)]="this.settingProvider.ltock.code" readonly="true"  ></ion-input>\n    </ion-item>\n    <ion-item class="item">\n      <ion-label fixed> * 农户</ion-label>\n      <ion-input type="text" (ionFocus)="doSearch()" readonly="true" required placeholder="按农户名称或者4位身份证尾数搜索" [(ngModel)]="this.settingProvider.farmername"></ion-input>\n    </ion-item>\n    <ion-item class="item">\n      <ion-label fixed> * 行政区域</ion-label>\n      <ion-multi-picker id="cities" [(ngModel)]="this.settingProvider.user.areaId" doneText="确定" cancelText="取消" item-content [multiPickerColumns]="this.settingProvider.cityColumns"></ion-multi-picker>\n    </ion-item>\n    <ion-item class="item">\n      <ion-label fixed> * 母体来源</ion-label>\n      <ion-input type="tel" required placeholder="请输入母体来源" [(ngModel)]="this.settingProvider.ltock.motherAddress" ></ion-input>\n    </ion-item>\n    <ion-item class="item">\n      <ion-label fixed>* 出生时间</ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DD" doneText="确定" cancelText="取消" [(ngModel)]="this.settingProvider.ltock.slaughterDate"></ion-datetime>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed> * 性别</ion-label>\n      <ion-select interface="action-sheet" [(ngModel)]="this.settingProvider.ltock.sex" okText="确定" cancelText="取消">\n      <ion-option value="1">公</ion-option>\n      <ion-option value="2">母</ion-option>\n    </ion-select>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;防疫状况</ion-label>\n      <ion-select  multiple="true"  [(ngModel)]="this.settingProvider.ltock.epidemicIds"  okText="确定" cancelText="取消">\n	    <ion-option *ngFor="let item of this.settingProvider.epidemicPrevention" value="{{item.id}}">{{item.name}}</ion-option>\n	    \n	  </ion-select>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed> * 健康状态</ion-label>\n      <ion-select interface="action-sheet" [(ngModel)]="this.settingProvider.ltock.healthy" okText="确定" cancelText="取消">\n	    <ion-option value="0">良好</ion-option>\n	    <ion-option value="1">合格</ion-option>\n	    <ion-option value="2">不合格</ion-option>\n	  </ion-select>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed> * 种类</ion-label>\n      <ion-select interface="action-sheet"  [(ngModel)]="this.settingProvider.ltock.type" okText="确定" cancelText="取消">\n	    <ion-option value="1">猪</ion-option>\n	    <ion-option value="2">牛</ion-option>\n	    <ion-option value="3">羊</ion-option>\n	  </ion-select>\n    </ion-item>\n\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;意外死亡</ion-label>\n      <ion-select interface="action-sheet"  name="accidentDead" [(ngModel)]="this.settingProvider.ltock.accidentDead" okText="确定" cancelText="取消">\n	    <ion-option value="1">是</ion-option>\n	    <ion-option value="">否</ion-option>\n	  </ion-select>\n    </ion-item>\n\n\n\n    <ion-item class="item" >\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;投保情况</ion-label>\n      <ion-select interface="action-sheet"  [(ngModel)]="this.settingProvider.ltock.insureState" okText="确定" cancelText="取消">\n      <ion-option value="1">投保</ion-option>\n      <ion-option value="2">未投保</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item class="item"   *ngIf="this.settingProvider.ltock.insureState==\'1\'">\n        <ion-label fixed item-start>&nbsp;&nbsp;&nbsp;投保编号</ion-label>\n        <ion-input type="tel" placeholder="请输入投保编号" readonly="true" [(ngModel)]="this.settingProvider.ltock.insureId" ></ion-input>\n        <ion-icon item-end (click)="doScan()" name="qr-scanner"></ion-icon>\n    </ion-item>\n\n\n\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;宰现地点</ion-label>\n          <ion-textarea name="slaughterAddress" placeholder="请输入宰现地点" [(ngModel)]="this.settingProvider.ltock.slaughterAddress"  placeholder=""></ion-textarea>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;宰现情况</ion-label>\n      <ion-select interface="action-sheet"  [(ngModel)]="this.settingProvider.ltock.slaughterRemark" okText="确定" cancelText="取消">\n      <ion-option value="是">是</ion-option>\n      <ion-option value="否">否</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;买卖流向</ion-label>\n          <ion-textarea name="saleFlow" placeholder="请输入买卖流向" [(ngModel)]="this.settingProvider.ltock.saleFlow" placeholder=""></ion-textarea>\n    </ion-item>\n\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;防疫类型</ion-label>\n          <ion-textarea style="height:10rem;" placeholder="请输入防疫类型" name="epidemicType" [(ngModel)]="this.settingProvider.ltock.epidemicType"  placeholder="请输入防疫类型,逗号隔开"></ion-textarea>\n    </ion-item>\n\n\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;防疫供应商</ion-label>\n          <ion-textarea style="height:10rem;"  name="epidemicProduct" [(ngModel)]="this.settingProvider.ltock.epidemicProduct"  placeholder="请输入防疫供应商，以逗号隔开"></ion-textarea>\n    </ion-item>\n\n\n    <ion-item class="item">\n      <ion-label fixed>&nbsp;&nbsp;&nbsp;生产批次</ion-label>\n          <ion-textarea style="height:10rem;" name="epidemicBatch" [(ngModel)]="this.settingProvider.ltock.epidemicBatch"  placeholder="请输入生产批次，以逗号隔开"></ion-textarea>\n    </ion-item>\n\n\n    <div class="blank"></div>\n  	<div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n    <button  *ngIf="this.settingProvider.ltockinsert" class="balanced" (click)="doAdd()" ion-button block >\n       保存\n    </button>\n    <button  *ngIf="!this.settingProvider.ltockinsert" class="balanced" (click)="doEdit()" ion-button block >\n       更新\n    </button>\n    <button class="balanced" (click)="clearLtock()" ion-button block>\n      重置\n    </button>\n  </div>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/livestock/livestock.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_livestock_livestock__["a" /* LivestockProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]])
    ], LivestockPage);
    return LivestockPage;
}());

//# sourceMappingURL=livestock.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FarmerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_farmer_farmer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_map__ = __webpack_require__(172);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the FarmerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FarmerPage = (function () {
    function FarmerPage(navCtrl, navParams, alertCtrl, settingProvider, farmerProvider, platform, backButtonService, appCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.settingProvider = settingProvider;
        this.farmerProvider = farmerProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        this.appCtrl = appCtrl;
        this.toPage = true;
        /*农户对象*/
        this.farmer = {
            name: '',
            mobile: "",
            cardId: "",
            farmAddress: ""
        };
        /*统计对象*/
        this.statser = [{
                "count": 0,
                "farmId": 0,
                "areaId": 0,
                "areaName": "",
                "farmerName": "",
                "sex": 1,
                "sexStr": "",
                "type": 1,
                "typeStr": ""
            }];
        this.count = 0;
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        //首页搜索后查看农户
        if (navParams.data.item != null && navParams.data.type == "farmerCat") {
            this.farmer = navParams.data.item;
            if (navParams.data.info == "livestock") {
                this.getStats(this.farmer.id);
            }
            this.toPage = false;
        }
        else {
            this.toPage = true;
        }
        /*百度地图*/
        if (navParams.data.address != null && navParams.data.type == "baidu") {
            this.farmer.farmAddress = navParams.data.address;
        }
    }
    FarmerPage.prototype.getStats = function (farmId) {
        var _this = this;
        this.farmerProvider.getStatsFarmer("areaId=" + this.settingProvider.user.areaId + "&farmId=" + farmId).subscribe(function (res) {
            if (res["code"] == 10000) {
                _this.statser = res["data"];
                _this.count = _this.statser["details"].length;
            }
            else {
                _this.settingProvider.presentAlert(res["msg"], "");
            }
        }, function (err) {
            _this.settingProvider.dismissLoading();
            _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
        });
    };
    /* 定位 */
    FarmerPage.prototype.location = function () {
        this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__map_map__["a" /* MapPage */], { "action": "location" });
    };
    /*新增*/
    FarmerPage.prototype.doAdd = function () {
        var _this = this;
        if (this.farmer.name == "") {
            this.settingProvider.presentAlert("请输入名字", '');
        }
        else if (this.farmer.mobile == "") {
            this.settingProvider.presentAlert("请输入手机号", '');
        }
        else if (this.settingProvider.user.areaId == "") {
            this.settingProvider.presentAlert("请输入行政区域", '');
        }
        else if (this.farmer.cardId == "") {
            this.settingProvider.presentAlert("请输入身份证号码", '');
        }
        else if (this.farmer.farmAddress == "") {
            this.settingProvider.presentAlert("请输入养殖地址", '');
        }
        else {
            this.farmerProvider.doAddFarmer(this.farmer).subscribe(function (res) {
                if (res["code"] == 10000) {
                    _this.settingProvider.presentAlert("新增成功", '');
                    _this.farmer = {
                        name: "",
                        mobile: "",
                        cardId: "",
                        farmAddress: ""
                    };
                }
                else {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], FarmerPage.prototype, "tabRef", void 0);
    FarmerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-farmer',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/farmer/farmer.html"*/'<!--\n  Generated template for the CertificatePage page.\n  建议使用定位功能，可以让他人更容易找到你\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-header no-border>\n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons  *ngIf="toPage==false" left>\n      <button ion-button navPop>\n          <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>农户信息</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n    <div  *ngIf="toPage">\n\n        <div class="blank"></div>\n        <ion-list>\n          <ion-item class="item" style="border-top:0px;">\n            <ion-label fixed> * 名字</ion-label>\n            <ion-input type="text" [(ngModel)]="farmer.name" ngModel valid  required placeholder="请输入名字"></ion-input>\n          </ion-item>\n          <ion-item class="item">\n            <ion-label fixed> * 手机号码</ion-label>\n            <ion-input type="tel" [(ngModel)]="farmer.mobile" ngModel valid  required placeholder="请输入手机号码"></ion-input>\n          </ion-item>\n          <ion-item class="item">\n            <ion-label fixed> * 行政区域</ion-label>\n            <ion-multi-picker id="cities" [(ngModel)]="this.settingProvider.user.areaId"  doneText="确定" cancelText="取消" item-content [multiPickerColumns]="this.settingProvider.cityColumns"></ion-multi-picker>\n          </ion-item>\n          <ion-item class="item">\n            <ion-label fixed> * 身份证号码</ion-label>\n            <ion-input type="text" required [(ngModel)]="farmer.cardId" ngModel valid  placeholder="请输入身份证号码"></ion-input>\n          </ion-item>\n          <ion-item class="item">\n            <ion-label fixed> * 养殖地址</ion-label>\n            <ion-textarea [(ngModel)]="farmer.farmAddress" required ngModel valid  placeholder="请输入养殖地址"></ion-textarea>\n            <button ion-button  item-end block style="width: 40px;display: none" (click)="location()">定位</button>\n          </ion-item>\n        </ion-list>\n        <div class="blank"></div>\n      	<div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n        <button class="balanced" ion-button block   (click)="doAdd()" >\n           新增\n        </button>\n      </div>\n    </div>\n\n    <div *ngIf="toPage==false">\n\n               <ion-grid padding>\n                  <ion-row class="ion-row">\n                    <ion-col col-4>名字 : </ion-col>\n                    <ion-col col-8>{{farmer.name}}</ion-col>\n                  </ion-row>\n\n                  <ion-row class="ion-row">\n                    <ion-col col-4>手机号码 : </ion-col>\n                    <ion-col col-8>{{farmer.mobile}}</ion-col>\n                  </ion-row>\n\n                  <ion-row class="ion-row">\n                    <ion-col col-4>身份证号码 : </ion-col>\n                    <ion-col col-8>{{farmer.cardId}}</ion-col>\n                  </ion-row>\n\n                  <ion-row class="ion-row">\n                    <ion-col col-4>养殖地址 : </ion-col>\n                    <ion-col col-8>{{farmer.farmAddress}}</ion-col>\n                  </ion-row>\n\n              </ion-grid>\n\n\n             \n              <ion-list style="border-top: 1px solid #dededec9;">\n                <div *ngIf="count>0">\n                <ion-item>\n                  <ion-grid *ngIf="statser.details.length>0"  padding>\n                   <table class="table">\n                      <thead>\n                      <tr>\n                      <th>种类</th>\n                      <th>性别</th>\n                      <th>数量</th>\n                      </tr>\n                      </thead>\n                      <tbody>\n                      <tr *ngFor="let nc of statser.details">\n                      <td>{{nc.typeStr}} </td>\n                      <td><code>{{ nc.sexStr }}</code></td>\n                      <td><code>{{ nc.count }}</code></td>\n                      </tr>\n                      </tbody>\n                    </table>\n                  </ion-grid>\n                </ion-item>\n                </div>\n                <ion-item *ngIf="count==0">\n                <div>没有牲畜信息</div>\n                </ion-item>\n              </ion-list>\n\n            <div class="blank"></div>\n\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/farmer/farmer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_farmer_farmer__["a" /* FarmerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], FarmerPage);
    return FarmerPage;
}());

//# sourceMappingURL=farmer.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_setting_setting__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(storage, settingProvider, platform, statusBar, splashScreen, network, loadingCtrl) {
        var _this = this;
        this.storage = storage;
        this.settingProvider = settingProvider;
        this.network = network;
        this.loadingCtrl = loadingCtrl;
        platform.ready().then(function () {
            /*从缓存里面读取登录信息*/
            _this.storage.get('user').then(function (val) {
                if (val != null)
                    _this.settingProvider.user = val;
            });
            /*从缓存里面读取区域信息*/
            _this.storage.get('cityColumns').then(function (val) {
                if (val != null)
                    _this.settingProvider.cityColumns = val;
            });
            /*选择跳转页面*/
            _this.settingProvider.getheartbeat().subscribe(function (res) {
                if (res["code"] === 10005) {
                    if (_this.settingProvider.loginstate == true) {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                    }
                }
                else {
                    _this.settingProvider.loginstate = true;
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */];
                }
            });
            statusBar.show();
            splashScreen.hide();
            _this.checkNetwork();
        });
    }
    /*检测网络，若未连接网络，给出提示*/
    MyApp.prototype.checkNetwork = function () {
        var _this = this;
        if (this.network.type === 'unknown') {
            console.log('This is a unknown network, please be careful!');
        }
        else if (this.network.type === 'none') {
            console.log('none network!');
            this.loader = this.loadingCtrl.create({
                content: "当前网络不可用，请检查网络设置！"
            });
            this.loader.present();
            setTimeout(function () {
                if (_this.loader)
                    _this.loader.dismiss();
            }, 5000);
        }
        else {
            console.log('we got a ' + this.network.type + ' connection, woohoo!');
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAvatarDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color_generator__ = __webpack_require__(704);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TextAvatarDirective = (function () {
    function TextAvatarDirective(element, colorGenerator) {
        this.element = element;
        this.colorGenerator = colorGenerator;
    }
    TextAvatarDirective.prototype.ngOnChanges = function (changes) {
        var text = changes['text'] ? changes['text'].currentValue : null;
        var color = changes['color'] ? changes['color'].currentValue : null;
        this.element.nativeElement.setAttribute("value", this.extractFirstCharacter(text));
        this.element.nativeElement.style.backgroundColor = this.backgroundColorHexString(color, text);
    };
    TextAvatarDirective.prototype.extractFirstCharacter = function (text) {
        return text.charAt(0) || '';
    };
    TextAvatarDirective.prototype.backgroundColorHexString = function (color, text) {
        return color || this.colorGenerator.getColor(this.extractFirstCharacter(text));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], TextAvatarDirective.prototype, "text", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], TextAvatarDirective.prototype, "color", void 0);
    TextAvatarDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'text-avatar',
            providers: [__WEBPACK_IMPORTED_MODULE_1__color_generator__["a" /* ColorGenerator */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__color_generator__["a" /* ColorGenerator */]])
    ], TextAvatarDirective);
    return TextAvatarDirective;
}());

//# sourceMappingURL=text-avatar.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorGenerator; });
var ColorGenerator = (function () {
    function ColorGenerator() {
        this.COLORS = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb', '#64b5f6',
            '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784', '#aed581', '#ff8a65', '#d4e157', '#673ab7',
            '#ffb74d', '#a1887f', '#90a4ae'];
    }
    ColorGenerator.prototype.getColor = function (str) {
        return this.COLORS[Math.abs(this.toNumber(str)) % this.COLORS.length];
    };
    ColorGenerator.prototype.toNumber = function (str) {
        var h = 0;
        for (var i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);
            h |= 0; // Convert to 32bit integer
        }
        return h;
    };
    ;
    return ColorGenerator;
}());

//# sourceMappingURL=color-generator.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ValidDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var ValidDirective = (function () {
    function ValidDirective() {
    }
    ValidDirective_1 = ValidDirective;
    ValidDirective.prototype.validate = function (c) {
        return { "custom": true };
    };
    ValidDirective = ValidDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[valid]',
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALIDATORS"], useExisting: ValidDirective_1, multi: true }]
        }),
        __metadata("design:paramtypes", [])
    ], ValidDirective);
    return ValidDirective;
    var ValidDirective_1;
}());

//# sourceMappingURL=valid.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyHttpInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyHttpInterceptor = (function () {
    function MyHttpInterceptor(settingProvider, appCtrl) {
        this.settingProvider = settingProvider;
        this.appCtrl = appCtrl;
    }
    /*
    *拦截器方法重构
    */
    MyHttpInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var started = Date.now();
        console.log("request time : ", started);
        var ok;
        var pattern = new RegExp('specialManager/epidemicPrevention/queryByArea/[0-9]+$', 'ig');
        var patternheartbeat = new RegExp('heartbeat/special_manager', 'ig');
        var patterncount = new RegExp('specialManager/farmer/count(.*)', 'ig');
        if (req instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["e" /* HttpRequest */]) {
            if (pattern.test(req.url) == false && patternheartbeat.test(req.url) == false && patterncount.test(req.url) == false) {
                console.log("弹出，请求中，请等待...");
                this.settingProvider.presentLoading();
                this.settingProvider.loading.present();
            }
        }
        return next.handle(req).do(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["f" /* HttpResponse */]) {
                if (event.body.code == 10005) {
                    _this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
                    console.log("go to login");
                }
                if (event.url, pattern.test(event.url) == false && patternheartbeat.test(req.url) == false && _this.settingProvider.loading != null && patterncount.test(req.url) == false) {
                    _this.settingProvider.dismissLoading();
                    _this.settingProvider.loading = null;
                    console.log("消失，请求中，请等待...");
                }
                ;
                var end = Date.now();
                console.log("response time : ", end, "all time : ", end - started);
            }
        });
    };
    MyHttpInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"]])
    ], MyHttpInterceptor);
    return MyHttpInterceptor;
}());

//# sourceMappingURL=my-http-interceptor.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FarmerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_httpService__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  农户provider
*/
var FarmerProvider = (function () {
    function FarmerProvider(http) {
        this.http = http;
        this.type = "'farmerinfo'";
    }
    /*农户搜索*/
    FarmerProvider.prototype.farmerSearch = function (keyword, page) {
        if (page === void 0) { page = 1; }
        //limit=20&size=1&areaId=22&search=测试
        return this.http.get("app/specialManager/farmer/list?limit=6&search=" + keyword + "&page=" + page, {});
    };
    /*添加农户*/
    FarmerProvider.prototype.doAddFarmer = function (data) {
        return this.http.post("app/specialManager/farmer/add", data);
    };
    /* 农户中的牲畜统计*/
    FarmerProvider.prototype.getStatsFarmer = function (param) {
        return this.http.get("app/specialManager/livestock/group?" + param, {});
    };
    /* 区域中农户的统计*/
    FarmerProvider.prototype.getStatsAreaFarmer = function (param) {
        return this.http.get("app/specialManager/farmer/count?" + param, {});
    };
    FarmerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_httpService__["a" /* HttpService */]])
    ], FarmerProvider);
    return FarmerProvider;
}());

//# sourceMappingURL=farmer.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscoveryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__livestock_livestock__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DiscoveryPage = (function () {
    function DiscoveryPage(appCtrl, navCtrl, navParams, settingProvider, platform, backButtonService) {
        var _this = this;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        /*选中对象*/
        this.sel = null;
        this.operate = "operate2";
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        if (this.settingProvider.scanResult.length == 0) {
            this.msg = "扫描不到任何信息";
        }
        else {
            this.msg = "";
        }
        /*刷新页面内容*/
        if (navParams.data.data != null) {
            console.log("刷新扫描内容");
            this.settingProvider.scanResult = navParams.data.data;
        }
    }
    /*选择*/
    DiscoveryPage.prototype.selectItem = function (item) {
        console.log("你选择了", item);
        this.sel = item;
    };
    /*选择跳转*/
    DiscoveryPage.prototype.goto = function () {
        if (this.sel !== null) {
            this.appCtrl.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__livestock_livestock__["a" /* LivestockPage */], { item: this.sel, type: "scan" });
        }
        else {
            this.settingProvider.presentAlert("请选择", "");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], DiscoveryPage.prototype, "tabRef", void 0);
    DiscoveryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-discovery',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/discovery/discovery.html"*/'<!--\n  Generated template for the DiscoveryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n	        <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>扫描结果</ion-title>\n  </ion-navbar>\n	<ion-toolbar>\n	  <!-- Segment buttons with text -->\n	  <ion-segment [(ngModel)]="operate" color="primary" icon-off="bar-home-off" icon-on="bar-home-on">\n\n	    <ion-segment-button value="operate2">\n	      未操作\n	    </ion-segment-button>\n	    <ion-segment-button value="operate1" >\n	      已操作\n	    </ion-segment-button>\n	  </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n\n\n<div [ngSwitch]="operate">\n\n\n  <div class="blank">{{msg}}</div>\n	<ion-list class="ionlist"  *ngSwitchCase="\'operate1\'">\n		<ion-list radio-group [(ngModel)]="sel">\n		   <div *ngFor="let item of this.settingProvider.scanResult">\n		  <ion-item  *ngIf="item.msg==\'已操作\'" class="item item-block item-ios item-radio">\n		    <ion-label>{{item.code}}  <span style="color: red">{{item.msg}}</span></ion-label>\n		    <ion-radio value="{{item.code}}"></ion-radio>\n		  </ion-item>\n			</div>\n		</ion-list>\n\n		<ion-list>\n			<div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n		    <button class="balanced" ion-button block  (click)="goto()">\n		      选择\n		    </button>\n		  </div>\n	    </ion-list>\n   </ion-list>\n\n\n	<ion-list class="ionlist"  *ngSwitchCase="\'operate2\'">\n		<ion-list radio-group [(ngModel)]="sel">\n		  <div *ngFor="let item of this.settingProvider.scanResult">\n		  <ion-item  *ngIf="item.msg==\'未操作\'" class="item item-block item-ios item-radio">\n		    <ion-label>{{item.code}}  <span style="color: red">{{item.msg}}</span></ion-label>\n		    <ion-radio value="{{item.code}}"></ion-radio>\n		  </ion-item>\n			</div>\n		</ion-list>\n\n		<ion-list>\n			<div style="text-align: center; margin-left: 30px; margin-right: 30px;">\n		    <button class="balanced" ion-button block  (click)="goto()">\n		      选择\n		    </button>\n		  </div>\n	    </ion-list>\n   </ion-list>\n \n</div>\n	\n</ion-content>\n'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/discovery/discovery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["App"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], DiscoveryPage);
    return DiscoveryPage;
}());

//# sourceMappingURL=discovery.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_backButton__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__livestock_livestock__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__farmer_farmer__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_farmer_farmer__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, settingProvider, farmerProvider, platform, backButtonService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingProvider = settingProvider;
        this.farmerProvider = farmerProvider;
        this.platform = platform;
        this.backButtonService = backButtonService;
        this.searchQuery = '';
        this.homeSearch = false;
        this.page = 1; //当前页码
        this.total = 0; //总页码
        platform.ready().then(function () {
            _this.backButtonService.registerBackButtonAction(_this.tabRef);
        });
        if (navParams.data.keyword != "") {
            console.log("搜索类型", navParams.data.searchType);
            if (navParams.data.searchType == "homeSearch") {
                this.homeSearch = true;
            }
            else {
                this.homeSearch = false;
            }
            this.settingProvider.keyword = navParams.data.keyword;
            this.farmerProvider.farmerSearch(this.settingProvider.keyword).subscribe(function (res) {
                console.log("farmer", res["data"]["list"]);
                _this.result = res["data"]["list"];
                console.log("result", _this.result);
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    }
    SearchPage.prototype.selectItem = function (item) {
        if (this.navParams.data.searchType == "farmerSearch") {
            console.log("搜索类型", this.navParams.data.searchType);
            this.settingProvider.keyword = item.name;
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__livestock_livestock__["a" /* LivestockPage */], { item: item, type: "farmerSearch" });
        }
        else if (this.navParams.data.searchType == "homeSearch") {
            this.showLivestock(item);
        }
    };
    SearchPage.prototype.ionViewDidLoad = function () {
    };
    SearchPage.prototype.ionViewDidLeave = function () {
        if (this.navParams.data.searchType == "farmerSearch") {
            console.log("你离开了页面");
        }
    };
    SearchPage.prototype.doSearch = function () {
        var _this = this;
        if (this.settingProvider.keyword != "") {
            this.farmerProvider.farmerSearch(this.settingProvider.keyword).subscribe(function (res) {
                console.log("farmer", res["data"]["list"]);
                _this.result = res["data"]["list"];
                console.log("result", _this.result);
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
    };
    SearchPage.prototype.getItems = function (ev) {
        var _this = this;
        if (ev.inputType == "insertText" || ev.inputType == "deleteContentBackward" || ev.inputType == "deleteByCut" || ev.inputType == "insertFromPaste")
            if (ev.target.value != "") {
                console.log("ev", "用户加入文本" + ev.target.value);
                this.settingProvider.keyword = ev.target.value;
                this.farmerProvider.farmerSearch(this.settingProvider.keyword).subscribe(function (res) {
                    console.log("farmer", res["data"]["list"]);
                    _this.result = res["data"]["list"];
                    console.log("result", _this.result);
                }, function (err) {
                    _this.settingProvider.dismissLoading();
                    _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
                });
            }
    };
    SearchPage.prototype.showLivestock = function (ev) {
        console.log("首页过来的");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__farmer_farmer__["a" /* FarmerPage */], { item: ev, type: "farmerCat", info: "livestock" });
    };
    SearchPage.prototype.showFarmer = function (ev) {
        console.log("首页过来的");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__farmer_farmer__["a" /* FarmerPage */], { item: ev, type: "farmerCat", info: "farmer" });
    };
    SearchPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log(this.total, this.page);
        if (this.total > this.page || this.total == 0) {
            this.page = this.page + 1;
            this.farmerProvider.farmerSearch(this.settingProvider.keyword, this.page).subscribe(function (res) {
                if (res["code"] == 10000) {
                    var row = res["data"]["list"];
                    console.log("farmer", row.length);
                    for (var i = row.length - 1; i >= 0; i--) {
                        console.log(row[i]);
                        _this.result.push(row[i]);
                    }
                    _this.total = res["data"]["total"];
                    console.log("total", _this.total);
                    infiniteScroll.complete();
                }
                else {
                    _this.settingProvider.presentAlert(res["msg"], '');
                }
            }, function (err) {
                _this.settingProvider.dismissLoading();
                _this.settingProvider.presentAlert("貌似网络出了点小差～", '');
            });
        }
        else {
            infiniteScroll.complete();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Tabs"])
    ], SearchPage.prototype, "tabRef", void 0);
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/search/search.html"*/'\n<ion-header no-border>\n\n  <ion-navbar hideBackButton color="primary">\n    <ion-buttons left>\n      <button ion-button navPop>\n	        <ion-icon class="customIcon" name="ios-arrow-back-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>搜索</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="content content-md">\n	<ion-grid>\n		<ion-row>\n			<ion-col col-10>\n		 	<ion-searchbar [(ngModel)]="this.settingProvider.keyword" placeholder="农户名称、4位身份证尾数"></ion-searchbar>\n		 	</ion-col>\n		 	<ion-col col-2>\n		 	<button class="balanced" style="height: 4.1rem;" ion-button block  (click)="doSearch()">\n			      	搜索\n			</button>\n			</ion-col>\n		</ion-row>\n 	</ion-grid>\n 	<!--  <ion-refresher (refresh)="doRefresh($event)">\n	    <ion-refresher-content\n	            pullingIcon="arrow-dropdown"\n	            pullingText="下拉刷新"\n	            refreshingSpinner="circles"\n	            refreshingText="刷新中...">\n	    </ion-refresher-content>\n	 </ion-refresher>\n -->\n  	  <ion-list class="ionlist">\n	    <ion-item class="ion-item" *ngFor="let item of result" (click)="selectItem(item)">\n		    <h2>{{ item.name }} </h2>\n	  	      <p>{{ item.mobile }}</p>\n		      <p>{{ item.cardId }}</p>\n	  	      <p>{{ item.farmAddress }}</p>\n		</ion-item>\n	  </ion-list>\n\n\n	  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n	    <ion-infinite-scroll-content\n	      loadingSpinner="bubbles"\n	      loadingText="正在努力加载中">\n	    </ion-infinite-scroll-content>\n	  </ion-infinite-scroll>\n\n	  \n</ion-content>'/*ion-inline-end:"/Users/zhengchenxiao/Downloads/ionic/trace/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__providers_setting_setting__["a" /* SettingProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_farmer_farmer__["a" /* FarmerProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__services_backButton__["a" /* BackButtonService */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ })

},[375]);
//# sourceMappingURL=main.js.map