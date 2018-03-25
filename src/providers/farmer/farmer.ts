import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingProvider } from "../setting/setting";

/*
  农户provider
*/
@Injectable()
export class FarmerProvider {

  farmerSearchResult : any[];
  type:string = "'farmerinfo'";

  constructor(public http: HttpClient,public settingProvider:SettingProvider) {
  }
  
  /*农户搜索*/
  farmerSearch(keyword:string,page:number=1){
     //limit=20&size=1&areaId=22&search=测试
     return this.http.get(this.settingProvider.apiUrl+"/specialManager/farmer/list?limit=6&search="+keyword+"&page="+page,this.settingProvider.httpOptions);
   }
  
  /*添加农户*/
   doAddFarmer(data:any){
   	return this.http.post(this.settingProvider.apiUrl+"/specialManager/farmer/add",data,this.settingProvider.httpOptions);
   }

   /* 农户中的牲畜统计*/
   getStatsFarmer(param:string){
    return this.http.get(this.settingProvider.apiUrl+"/specialManager/livestock/group?"+param,this.settingProvider.httpOptions);
   }

}
