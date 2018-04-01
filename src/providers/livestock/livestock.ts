import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../services/httpService';
import { SettingProvider } from "../../providers/setting/setting";

/*
 * 牲畜provider
*/
@Injectable()
export class LivestockProvider {
  /*构造*/
  constructor(public http: HttpService,public settingProvider:SettingProvider) {
  }

  /*添加牲畜*/
  doAddLivestock(data:any){
     return this.http.post("app/specialManager/livestock/add",data);
  }
  /*编辑牲畜*/
  doEditLivestock(data:any){
     return this.http.post("app/specialManager/livestock/update",data);
  }
  /*搜索牲畜*/
   doSearchLivestock(keyword:string){
   		return this.http.get("app/specialManager/livestock/query?areaId="+ (this.settingProvider.user as any).areaId+"&code="+keyword,{});
   }
}
