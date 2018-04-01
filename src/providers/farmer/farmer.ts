import { HttpClient ,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../services/httpService';

/*
  农户provider
*/
@Injectable()
export class FarmerProvider {

  farmerSearchResult : any[];
  type:string = "'farmerinfo'";

  constructor(public http:HttpService) {
  }
  
  /*农户搜索*/
  farmerSearch(keyword:string,page:number=1){
     //limit=20&size=1&areaId=22&search=测试
     return this.http.get("app/specialManager/farmer/list?limit=6&search="+keyword+"&page="+page,{});
   }
  
  /*添加农户*/
   doAddFarmer(data:any){
   	return this.http.post("app/specialManager/farmer/add",data);
   }

   /* 农户中的牲畜统计*/
   getStatsFarmer(param:string){
    return this.http.get("app/specialManager/livestock/group?"+param,{});
   }

   /* 区域中农户的统计*/
   getStatsAreaFarmer(param:string){
    return this.http.get("app/specialManager/farmer/count?"+param,{});
   }
}
