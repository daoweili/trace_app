import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingProvider } from "../../providers/setting/setting";

/*
 * 牲畜provider
*/
@Injectable()
export class LivestockProvider {
  /*构造*/
  constructor(public http: HttpClient,public settingProvider:SettingProvider) {
  }

  /*添加牲畜*/
  doAddLivestock(data:any){
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/livestock/add",data,this.settingProvider.httpOptions);
  }
  /*编辑牲畜*/
  doEditLivestock(data:any){
     return this.http.post(this.settingProvider.apiUrl+"/specialManager/livestock/update",data,this.settingProvider.httpOptions);
  }
  /*搜索牲畜*/
   doSearchLivestock(keyword:string){
   		return this.http.get(this.settingProvider.apiUrl+"/specialManager/livestock/query?areaId="+ (this.settingProvider.user as any).areaId+"&code="+keyword,this.settingProvider.httpOptions);
   }
}
